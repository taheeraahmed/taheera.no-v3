function HintActionButton({ className, onClick, suffix, prefix = 'Press' }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {prefix} <span className="hint-pill hint-pill-key">Escape</span> {suffix}
    </button>
  )
}

export default HintActionButton