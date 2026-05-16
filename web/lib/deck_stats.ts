import type { Card, Deck } from "./types";
import { isBasic } from "./deck";

export type DeckStats = {
  total: number;
  unique: number;
  lands: number;
  nonlandCount: number;
  avgCmcNonland: number | null;
  curve: number[];          // index 0..6 = exact CMC; index 7 = 7+
  types: { label: string; count: number }[];
};

const TYPE_BUCKETS: { label: string; predicate: (t: string) => boolean }[] = [
  { label: "Creature",     predicate: (t) => t.includes("Creature") },
  { label: "Land",         predicate: (t) => t.includes("Land") },
  { label: "Instant",      predicate: (t) => t.includes("Instant") },
  { label: "Sorcery",      predicate: (t) => t.includes("Sorcery") },
  { label: "Artifact",     predicate: (t) => t.includes("Artifact") && !t.includes("Creature") },
  { label: "Enchantment",  predicate: (t) => t.includes("Enchantment") && !t.includes("Creature") },
  { label: "Planeswalker", predicate: (t) => t.includes("Planeswalker") },
  { label: "Battle",       predicate: (t) => t.includes("Battle") },
];

export function computeStats(deck: Deck, byName: Map<string, Card>): DeckStats {
  const stats: DeckStats = {
    total: 0,
    unique: 0,
    lands: 0,
    nonlandCount: 0,
    avgCmcNonland: null,
    curve: [0, 0, 0, 0, 0, 0, 0, 0],
    types: TYPE_BUCKETS.map((b) => ({ label: b.label, count: 0 })),
  };

  let cmcSum = 0;
  const entries: { card: Card | undefined; count: number; name: string; isCmdr: boolean }[] = [];
  for (const s of deck.ninety_nine) {
    entries.push({ card: byName.get(s.name), count: s.count, name: s.name, isCmdr: false });
  }
  if (deck.commander) {
    entries.push({
      card: byName.get(deck.commander),
      count: 1,
      name: deck.commander,
      isCmdr: true,
    });
  }

  for (const { card, count } of entries) {
    if (!card) {
      stats.total += count;
      continue;
    }
    stats.total += count;
    stats.unique += isBasic(card.name) ? 1 : count;
    const t = card.type_line;
    const isLand = t.includes("Land");

    if (isLand) {
      stats.lands += count;
    } else {
      stats.nonlandCount += count;
      const cmc = Math.round(card.cmc ?? 0);
      const bucket = Math.min(cmc, 7);
      stats.curve[bucket] += count;
      cmcSum += (card.cmc ?? 0) * count;
    }

    for (let i = 0; i < TYPE_BUCKETS.length; i++) {
      if (TYPE_BUCKETS[i].predicate(t)) {
        stats.types[i].count += count;
        break;  // first matching bucket wins so a card counts once
      }
    }
  }

  if (stats.nonlandCount > 0) stats.avgCmcNonland = cmcSum / stats.nonlandCount;
  return stats;
}
