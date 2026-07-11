# BCAQI Labs — Production AI systems for the Japanese market

A B2B website for an India-based AI engineering firm targeting Japanese
enterprises, consulting firms, and system integrators. Static, fast, and
bilingual (EN / JA). No build step — plain HTML, CSS, and vanilla JS served
directly from the repository root by GitHub Pages.

## Structure

```
/                     Home (EN)               index.html
/services/            Services & offers       services/index.html
/work/                Portfolio + live demo   work/index.html
/process/             Process / communication / security   process/index.html
/about/               Company overview (会社概要) + team   about/index.html
/jp/                  Japanese landing page   jp/index.html
/privacy/             Privacy & data handling privacy/index.html
assets/css/main.css   Design system (design tokens, components, responsive)
assets/js/main.js     Nav, scroll reveal, contact form (mailto compose)
assets/js/demo.js     Japanese document-intelligence demo (client-side)
assets/img/og-default.png   Open Graph share image
favicon.svg           Brand mark
sitemap.xml, robots.txt, CNAME
```

## The live demo

`/work/#demo` runs a Japanese Document Intelligence Pipeline entirely in the
browser (`assets/js/demo.js`). It ships with three preloaded samples
(invoice / quotation / delivery note) containing no real personal data. The
pipeline shows field extraction, 和暦→ISO date normalization, business-rule
validation (e.g. 10% consumption tax), structured JSON/CSV output, an audit
log, and a human-review queue for low-confidence or rule-failed fields. Output
for the samples is representative; a paid pilot runs a client's own documents
through the production pipeline.

## Before launch — owner inputs required

Search the source for `[ ... ]` placeholders and `BEFORE LAUNCH` / `INPUT
REQUIRED` comments and replace with verified facts. Do not invent any of these:

- **About / 会社概要** (`about/`, `jp/`): representative name, team size, and
  (optionally) legal registration status.
- **Lead architect + team** (`about/`): real names, years, and photos where
  possible; initials avatars are the approved fallback.
- **Domain email**: `contact@bcaqi.com` is used throughout — set up the mailbox.
- **Japanese copy** (`jp/`): must be reviewed and signed off by a native /
  JLPT-N1 checker before launch.
- **Pricing** (`services/`, `jp/`): shown as "Contact for pricing" until floors
  are provided.
- **Analytics** (`privacy/`): name the actual tool once a privacy-respecting
  analytics provider is chosen.
- **Certifications** (`process/`): do NOT claim ISO 27001 or similar unless
  actually held.

## Design

Restrained, engineered aesthetic — near-white ground, ink text, one deep indigo
(藍/紺) accent, neutral gray rules, and status colors for the demo. Inter for
Latin text, Noto Sans JP for Japanese (line-height 1.7–1.9, `keep-all` handling).
Motion is minimal and respects `prefers-reduced-motion`.

## Deploy

GitHub Pages deploys the repository root on push to `main`
(`.github/workflows/static.yml`). Custom domain via `CNAME` (bcaqi.com).

## Local preview

```bash
npx http-server -p 8099 -c-1
# open http://localhost:8099/
```

## License

© BCAQI Labs. All rights reserved.
