// Small shared pieces: loading / empty / error messages and the visibility badge.
export function Loading({ text = "Loading…" }) {
  return (
    <div className="tile message">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export function Empty({ icon = "🃏", title, children }) {
  return (
    <div className="tile message">
      <span className="message-icon">{icon}</span>
      <h3>{title}</h3>
      <p className="muted">{children}</p>
    </div>
  );
}

export function ErrorBox({ children, onRetry }) {
  return (
    <div className="tile message message-error">
      <span className="message-icon">⚠️</span>
      <p>{children}</p>
      {onRetry && <button className="btn btn-ghost btn-small" onClick={onRetry}>Try again</button>}
    </div>
  );
}

export function VisibilityBadge({ mode }) {
  return <span className={`badge badge-${mode}`}>{mode === "public" ? "🌍 Public" : "🔒 Private"}</span>;
}

// Card that flips in 3D between front and back. `tall` = big study-mode size, `deal` = slide-in on mount.
export function FlipCard({ front, back, flipped, onFlip, tall, deal }) {
  return (
    <button className={`flip ${flipped ? "is-flipped" : ""} ${deal ? "deal" : ""}`} onClick={onFlip}>
      <span className="flip-inner">
        <span className={`tile flip-face ${tall ? "tall" : ""}`}>
          <span className="flash-side">Front</span>
          <span className="flash-text">{front}</span>
          {tall && <span className="muted">Tap to reveal</span>}
        </span>
        <span className={`tile flip-face flip-back ${tall ? "tall" : ""}`}>
          <span className="flash-side">Back</span>
          <span className="flash-text">{back}</span>
        </span>
      </span>
    </button>
  );
}
