import { useEffect, useState } from "react";
import { loadDeck } from "../solid/pod.js";
import { cloneDeck } from "../solid/clone.js";
import { Loading, Empty, ErrorBox, FlipCard } from "../components.jsx";

// Read-only view of any deck URL, with a Clone button. Tap a card to flip it.
export default function DeckPreview({ deckUrl, container, loggedIn, onBack, onOpen, onStudy, notify }) {
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState("");
  const [flipped, setFlipped] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDeck(null);
    setError("");
    loadDeck(deckUrl).then(setDeck).catch((e) => setError(e.message));
  }, [deckUrl]);

  async function clone() {
    setBusy(true);
    try {
      const url = await cloneDeck(deckUrl, container);
      notify("Cloned into your pod!");
      onOpen(url);
    } catch (e) { notify("Couldn't clone: " + e.message); }
    setBusy(false);
  }

  return (
    <>
      <button className="btn btn-ghost btn-small" onClick={onBack}>← Back</button>
      {error && <div style={{ marginTop: 16 }}><ErrorBox>{error}</ErrorBox></div>}
      {!error && !deck && <Loading text="Fetching deck…" />}
      {deck && (
        <>
          <div className="spread" style={{ marginTop: 16 }}>
            <div>
              <h1>{deck.name}</h1>
              <p className="muted">{deck.description}</p>
              <p className="muted">Read-only preview · {deck.cards.length} cards</p>
            </div>
            <div className="row">
              <button className="btn btn-ghost" onClick={() => onStudy(deckUrl)}>▶ Study</button>
              <button className="btn btn-amber" disabled={busy || !loggedIn} onClick={clone}>
                {loggedIn ? "Clone" : "Log in to clone"}
              </button>
            </div>
          </div>
          {deck.cards.length === 0 && <Empty title="No cards">This deck is empty.</Empty>}
          {deck.cards.map((c, i) => (
            <FlipCard key={i} front={c.front} back={c.back} flipped={!!flipped[i]} onFlip={() => setFlipped({ ...flipped, [i]: !flipped[i] })} />
          ))}
        </>
      )}
    </>
  );
}
