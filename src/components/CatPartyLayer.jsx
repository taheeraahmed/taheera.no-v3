function CatPartyLayer({ isActive, sprites }) {
  return (
    <div className={`cat-easter-egg ${isActive ? 'is-active' : ''}`} aria-hidden="true">
      {isActive
        ? sprites.map((cat) => (
            <img
              key={cat.id}
              className="cat-easter-egg-sprite"
              src={cat.src}
              alt=""
              style={cat.style}
              loading="lazy"
              decoding="async"
            />
          ))
        : null}
    </div>
  )
}

export default CatPartyLayer
