# 30 Cent EDH

A searchable card database and deck builder for **30 Cent EDH** — a community-curated Commander format where every card in the 99 costs **$0.30 or less** on TCGPlayer.

The card pool, ban list, and watchlist are mirrored nightly from the curator's [official Google Sheet](https://docs.google.com/spreadsheets/d/1KgAk0CGUoB5UgdVLdYjP2W4PF0x6n2lhRxvfjlXT97Y/edit?gid=625089475#gid=625089475). Format primer lives [here](https://docs.google.com/document/d/1Co1hoEDwg5HQynrgu5jSN1UPo-CGkzedi_T7p5oPo2c/edit).

## Pipeline

```
Google Sheet (cardpool + ban list)
        │
        ▼  pipeline/pull_sheet.py
   data/cardpool.json
        │
        ▼  pipeline/enrich.py  ← joins with Scryfall bulk data
   data/cards.json     ← word-counted, tagged, ready for the site
        │
        ▼  web/  (Next.js + Tailwind, static export)
   GitHub Pages
```

Nightly GitHub Action re-pulls the Sheet, re-fetches Scryfall's bulk data, recomputes eligibility, and redeploys the site. Prices drift, so a card that's $0.28 today may drop out of the 99-eligible list tomorrow.

## Word count

Each card's rules-text word count is computed and exposed as an optional filter for players who like to keep their decks readable. It is **not** part of format legality. The counter:

- Excludes reminder text in `( ... )`
- Treats each mana / loyalty symbol as one word — `{T}: Add {G}.` = 3 words
- Tokenizes keywords literally — "Flying" = 1, "First strike" = 2

See `pipeline/word_count.py`.

## Local dev

```bash
# Pipeline
python3 -m venv .venv
.venv/bin/pip install -r pipeline/requirements.txt
.venv/bin/python pipeline/pull_sheet.py
.venv/bin/python pipeline/fetch_scryfall.py
.venv/bin/python pipeline/enrich.py

# Web
cd web && npm install && npm run dev
```
