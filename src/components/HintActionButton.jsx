function HintActionButton({ className, onClick, suffix }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      Press <span className="hint-pill hint-pill-key">Escape</span> {suffix}
    </button>
  )
}

export default HintActionButton