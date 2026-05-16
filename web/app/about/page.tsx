export default function AboutPage() {
  return (
    <article className="prose prose-invert mx-auto max-w-2xl text-white/80">
      <h1 className="mb-2 text-3xl font-semibold text-white">About 30 Cent EDH</h1>
      <p className="text-sm text-white/60">
        A community-curated Commander variant where the deckbuilding pool is everything
        that costs <strong>$0.30 or less</strong> on TCGPlayer.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">The format</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Standard 100-card singleton EDH/Commander rules.</li>
        <li>Every card in the 99 must be $0.30 or less per Scryfall / TCGPlayer pricing.</li>
        <li>Commander must also be $0.30 or less but follows standard EDH commander eligibility (legendary creatures, "can be your commander", partners, backgrounds).</li>
        <li>The curator-maintained ban list overrides pricing — a handful of cards are excluded due to inaccurate pricing or no legal printing under the cap.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-white">Sources</h2>
      <p>
        The card pool, ban list, and watchlist are mirrored nightly from the official{" "}
        <a
          className="text-emerald-400 underline"
          href="https://docs.google.com/spreadsheets/d/1KgAk0CGUoB5UgdVLdYjP2W4PF0x6n2lhRxvfjlXT97Y/edit?gid=625089475#gid=625089475"
          target="_blank"
          rel="noreferrer"
        >
          30 Cent EDH Google Sheet
        </a>
        . Oracle text, prices, and images come from{" "}
        <a className="text-emerald-400 underline" href="https://scryfall.com" target="_blank" rel="noreferrer">
          Scryfall
        </a>
        . The full format primer lives in{" "}
        <a
          className="text-emerald-400 underline"
          href="https://docs.google.com/document/d/1Co1hoEDwg5HQynrgu5jSN1UPo-CGkzedi_T7p5oPo2c/edit"
          target="_blank"
          rel="noreferrer"
        >
          this Google Doc
        </a>
        .
      </p>
      <p>
        Prices drift. Each night a GitHub Action re-pulls the Sheet, re-fetches Scryfall's bulk data, recomputes
        eligibility, and redeploys this site — so a card that's $0.28 today may quietly drop out of the 99-eligible list
        tomorrow.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Word count</h2>
      <p>
        Each card's rules-text word count is computed and exposed as an optional filter for players who like to
        keep their decks readable. It is <em>not</em> part of format legality. The counter excludes reminder text in
        parentheses, treats each mana / loyalty symbol as one word, and tokenizes keywords literally (so "First strike"
        is 2 words and "Flying" is 1).
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Source</h2>
      <p>
        Open source on{" "}
        <a
          className="text-emerald-400 underline"
          href="https://github.com/RossFW/20-word-30-cent-edh"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        . Issues, PRs, and disagreements with the ban list — file them upstream on the Sheet, not here.
      </p>
    </article>
  );
}
