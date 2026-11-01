// STUB: in-memory decks with the same function names as the real pod.js.
// Deck shape: { name, description, dateCreated, isBasedOn?, cards: [{ front, back }] }
const MY_CONTAINER = "https://anders.example/solidcard/decks/";
const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const decks = new Map([
  [MY_CONTAINER + "platform_deck.ttl", {
    name: "Platform-Based Software",
    description: "Key terms from the course.",
    dateCreated: "2026-10-20",
    cards: [
      { front: "What is a Solid Pod?", back: "Personal data store the user owns." },
      { front: "What is a WebID?", back: "A URL that identifies a person." },
    ],
  }],
  // Someone else's public deck, so the paste-a-link flow has something to open.
  ["https://dhimas.example/solidcard/decks/solid_basics.ttl", {
    name: "Solid Basics",
    description: "Shared by Dhimas.",
    dateCreated: "2026-10-25",
    cards: [
      { front: "Who controls the data in a Pod?", back: "The pod owner." },
      { front: "What format do decks use?", back: "Turtle (.ttl) with schema.org terms." },
    ],
  }],
]);

export async function ensureDecksContainer(webId) {
  await wait(100);
  return MY_CONTAINER;
}

export async function listDecks(containerUrl) {
  await wait();
  return [...decks]
    .filter(([url]) => url.startsWith(containerUrl))
    .map(([url, d]) => ({ url, name: d.name, cardCount: d.cards.length, isBasedOn: d.isBasedOn }));
}

export async function loadDeck(deckUrl) {
  await wait();
  if (deckUrl.includes("private")) throw new Error("This deck is private.");
  const deck = decks.get(deckUrl);
  if (!deck) throw new Error("Deck not found.");
  return structuredClone(deck);
}

export async function saveDeck(deckUrl, deck) {
  await wait();
  decks.set(deckUrl, structuredClone(deck));
}

export async function deleteDeck(deckUrl) {
  await wait();
  decks.delete(deckUrl);
}

// Extra helper (not in the contract): pick a readable filename for a new deck.
export function newDeckUrl(containerUrl, name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "deck";
  const taken = (u) => decks.has(u);
  let url = `${containerUrl}${slug}.ttl`;
  if (taken(url)) url = `${containerUrl}${slug}_${Math.random().toString(36).slice(2, 6)}.ttl`;
  return url;
}
