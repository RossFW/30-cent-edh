"use client";
import type { DeckStats } from "@/lib/deck_stats";

export function DeckStatsPanel({ stats }: { stats: DeckStats }) {
  const maxBar = Math.max(1, ...stats.curve);
  const hasAny = stats.total > 0;
  return (
    <div className="space-y-3 rounded border border-white/10 p-2.5 text-xs">
      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat label="Cards" value={stats.total} />
        <Stat label="Unique" value={stats.unique} />
        <Stat label="Avg CMC" value={stats.avgCmcNonland != null ? stats.avgCmcNonland.toFixed(2) : "—"} />
      </div>

      <div>
        <div className="mb-1 text-[10px] uppercase tracking-wide text-white/40">Mana curve · nonland</div>
        <div className="flex h-14 items-end gap-1">
          {stats.curve.map((n, i) => (
            <div key={i} className="flex flex-1 flex-col items-center justify-end">
              <span className="mb-0.5 text-[9px] text-white/50">{n || ""}</span>
              <div
                className="w-full rounded-t bg-emerald-500/70"
                style={{ height: `${hasAny ? (n / maxBar) * 100 : 0}%`, minHeight: n ? 2 : 0 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-0.5 flex gap-1 text-[9px] text-white/40">
          {["0", "1", "2", "3", "4", "5", "6", "7+"].map((l) => (
            <span key={l} className="flex-1 text-center">{l}</span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1 text-[10px] uppercase tracking-wide text-white/40">Types</div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {stats.types
            .filter((t) => t.count > 0)
            .map((t) => (
              <li key={t.label} className="flex justify-between text-white/70">
                <span>{t.label}</span>
                <span className="font-mono text-white/50">{t.count}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-lg font-semibold leading-none">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-white/40">{label}</div>
    </div>
  );
}
