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
