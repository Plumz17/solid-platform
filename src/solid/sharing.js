// STUB: visibility is the file's permission in the pod, so decks start "private".
const visibility = new Map();

export async function getVisibility(deckUrl) {
  return visibility.get(deckUrl) ?? "private";
}

export async function setVisibility(deckUrl, mode) {
  await new Promise((r) => setTimeout(r, 200));
  visibility.set(deckUrl, mode);
}

// App link = this site + ?deck=<encoded deck file URL>
export function buildLink(deckUrl) {
  return window.location.origin + import.meta.env.BASE_URL + "?deck=" + encodeURIComponent(deckUrl);
}

// Accepts an app link or a raw deck URL; returns the deck file URL, or null.
export function parseLink(text) {
  try {
    const url = new URL(text.trim());
    return url.searchParams.get("deck") ?? url.href;
  } catch {
    return null;
  }
}
