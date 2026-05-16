"use client";
import type { Card } from "@/lib/types";

export function CardTile({
  card,
  onAdd,
  onSetCommander,
  inDeck,
}: {
  card: Card;
  onAdd?: (card: Card) => void;
  onSetCommander?: (card: Card) => void;
  inDeck?: number;
}) {
  const hasActions = !!(onAdd || onSetCommander);

  const body = (
    <div className="group relative aspect-[5/7] overflow-hidden rounded-xl bg-black/40 shadow-md ring-1 ring-white/10 transition hover:ring-emerald-400/60">
      {card.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.image}
          alt={card.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center text-xs text-white/70">
          <span className="font-semibold">{card.name}</span>
          <span className="text-white/40">{card.type_line}</span>
        </div>
      )}

      {card.banned && (
        <span className="absolute inset-x-2 bottom-2 rounded bg-red-600/90 px-2 py-0.5 text-center text-[10px] font-bold uppercase tracking-wide text-white">
          Banned
        </span>
      )}

      {inDeck != null && inDeck > 0 && (
        <span className="absolute bottom-1.5 right-1.5 rounded-full bg-sky-500 px-2 py-0.5 text-xs font-bold text-white shadow">
          ×{inDeck}
        </span>
      )}

      {hasActions && (
        <div className="absolute inset-x-1.5 bottom-1.5 flex gap-1 opacity-0 transition group-hover:opacity-100">
          {onSetCommander && card.commander_eligible && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onSetCommander(card);
              }}
              className="flex-1 rounded bg-emerald-500/95 px-2 py-1 text-[11px] font-semibold text-white shadow hover:bg-emerald-400"
            >
              Commander
            </button>
          )}
          {onAdd && card.ninety_nine_eligible && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onAdd(card);
              }}
              className="flex-1 rounded bg-sky-500/95 px-2 py-1 text-[11px] font-semibold text-white shadow hover:bg-sky-400"
            >
              +1
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Browse mode: clicking the tile opens Scryfall. Deck builder mode: the
  // hover actions handle clicks, so we render the tile as a non-link element.
  if (!hasActions) {
    return (
      <a href={card.scryfall_uri} target="_blank" rel="noreferrer" className="block" title={card.name}>
        {body}
      </a>
    );
  }
  return <div title={card.name}>{body}</div>;
}
