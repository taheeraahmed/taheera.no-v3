# taheera.no-vol-3

Interactive portfolio website built with React and Vite.

The UI mimics a terminal while still using browser-native interactions like draggable windows, keyboard navigation, localized content, and rich media output.

## Features

- Terminal-like command interface (`help`, `ls`, `cd`, `cat`, `open`, `lang`, `clear`)
- Localized content and shell messaging (`en`, `no`)
- Draggable terminal and CV window
- Flip-to-card interaction and mobile contact-card layout
- Cat easter egg mode with animated sprites

## Project Structure

- `src/App.jsx`: Main app composition and interaction flow
- `src/components`: UI building blocks (terminal window, CV dialog, contact card)
- `src/hooks`: Window drag, window state, and cat party behavior
- `src/terminal`: Terminal command execution, formatting, virtual filesystem, i18n, autocomplete
- `src/content.js`: Portfolio data and localized text

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```