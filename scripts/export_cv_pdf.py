#!/usr/bin/env python3
"""Render the CV HTML file to PDF using Playwright (Chromium)."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert the CV HTML template into a PDF file."
    )
    parser.add_argument(
        "--input",
        default="public/cv/CV_taheera_ahmed.html",
        help="Path to source HTML file (default: public/cv/CV_taheera_ahmed.html)",
    )
    parser.add_argument(
        "--output",
        default="public/cv/CV_taheera_ahmed.pdf",
        help="Path to output PDF file (default: public/cv/CV_taheera_ahmed.pdf)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    root = Path(__file__).resolve().parents[1]
    input_path = (root / args.input).resolve()
    output_path = (root / args.output).resolve()

    if not input_path.exists():
        print(f"Input file not found: {input_path}", file=sys.stderr)
        return 1

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(
            "Missing dependency: playwright\n"
            "Run with uv:\n"
            "  uv run --with playwright python scripts/export_cv_pdf.py\n"
            "If Chromium is not installed yet, run:\n"
            "  uv run --with playwright playwright install chromium",
            file=sys.stderr,
        )
        return 1

    output_path.parent.mkdir(parents=True, exist_ok=True)

    html_uri = input_path.as_uri()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(html_uri, wait_until="networkidle")
        page.pdf(
            path=str(output_path),
            print_background=True,
            prefer_css_page_size=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        )
        browser.close()

    print(f"PDF written to: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
