# Off-site SEO & AI-visibility checklist

The on-page work is done and live. Search visibility now depends on **indexing**
and **off-site trust signals** — the two things only you can create. Work top to
bottom; Phase 1 is the fire.

## Phase 1 — Get indexed (this week)

### 1. Google Search Console
1. Go to https://search.google.com/search-console → add property → **URL prefix** → `https://bcaqi.com/`.
2. Choose the **HTML tag** method. Copy the `content` value.
3. In `index.html`, uncomment the line and paste the code:
   `<meta name="google-site-verification" content="PASTE_GOOGLE_CODE_HERE">`
   Commit + push to `main`, wait for the Pages deploy, then click **Verify**.
4. Submit the sitemap: Sitemaps → enter `sitemap.xml` → Submit.
5. Use **URL Inspection → Request Indexing** for each page (home, services, work,
   process, about, jp, the 3 solutions, the 2 insights).

### 2. Bing Webmaster Tools (important — many Japanese enterprises use Edge/Bing)
1. https://www.bing.com/webmasters → add `https://bcaqi.com/`.
   (You can import from Google Search Console to skip re-verification.)
2. If verifying by meta tag, uncomment and paste into `index.html`:
   `<meta name="msvalidate.01" content="PASTE_BING_CODE_HERE">`
3. Submit `https://bcaqi.com/sitemap.xml`.

### 3. Confirm the basics are reachable
- https://bcaqi.com/robots.txt (allows all + AI bots, references llms.txt)
- https://bcaqi.com/sitemap.xml (all 13 URLs)
- https://bcaqi.com/llms.txt (structured overview for AI crawlers)

## Phase 2 — Entity footprint & first backlinks (weeks 1–3)

Create these profiles with an **identical** name / description / location so
Google and AI models can confirm BCAQI Labs is one real entity. Use the block
below verbatim. Each profile links back to bcaqi.com — your first backlinks.

Then send me the **LinkedIn company page URL** (and any others) and I'll add them
to the `sameAs` list in the Organization schema (`index.html`, `about/index.html`).

- [ ] LinkedIn company page → link bcaqi.com
- [ ] GitHub — already in schema (github.com/haider1998); pin AutoML-Agent and add bcaqi.com to the org/profile
- [ ] Crunchbase organization profile
- [ ] Clutch.co and GoodFirms (B2B service directories buyers trust)
- [ ] Japanese directories where offshore/IT vendors are listed
- [ ] Google Business Profile (if you want map/brand presence)

### Canonical NAP + description (paste identically everywhere)

```
Name:        BCAQI Labs (Bharat Centre for AI & Quantum Innovation)
Founded:     2023
Location:    Lucknow, Uttar Pradesh, India
Founder:     Syed Mohd Haider Rizvi
Email:       contact@bcaqi.com
Website:     https://bcaqi.com
Languages:   English, Japanese

Description (EN):
BCAQI Labs is an India-based AI engineering firm that builds production AI
systems — LLM applications, agentic workflows, and Japanese document
intelligence — for Japanese enterprises and their consulting partners.
Offshore AI development with weekly written reporting, NDA standard, and
bilingual (English/Japanese) delivery.

Description (JA):
BCAQI Labsは、日本企業とそのコンサルティングパートナーのために、本番運用レベルの
AIシステム（LLMアプリケーション、エージェント型ワークフロー、日本語文書インテリジェンス）
を構築するインド拠点のAIエンジニアリング企業です。週次の書面報告、NDA標準、日英対応。
```

## Phase 3 — Earned media & AI citations (30–90 days)

AI engines (ChatGPT, Perplexity, Google AI) cite brands whose claims are
verified by *other* sites. Your ICML 2025 AutoML-Agent work is the strongest
asset here.

- [ ] Ensure AutoML-Agent has a public GitHub README and, if applicable, an
      arXiv link — both linking to bcaqi.com.
- [ ] Publish a LinkedIn post about the ICML 2025 feature linking to the case
      study (bcaqi.com/work/#automl-agent).
- [ ] Keep publishing Insights articles (2–4/month). Perplexity retrieves in
      real time, so a well-structured post can be cited within days. Topic ideas
      nobody writes in English: 軽減税率 handling, 適格請求書 (qualified invoice /
      インボイス制度) data capture, JP address parsing, 印鑑/seal detection.
- [ ] Answer relevant questions on Reddit/Quora/Stack Overflow where natural,
      linking the Insights articles (no spam — genuine answers only).

## Realistic timeline

- #1 for "BCAQI Labs" (your own name): ~2–4 weeks after indexing.
- First AI-engine citations: 30–90 days.
- Long-tail Japanese/English queries: 3–6 months of consistent publishing + links.

## Notes on what's already done on-site (no action needed)

- JSON-LD: Organization/ProfessionalService (with alternateName + sameAs),
  WebSite, Service, FAQPage on home; BreadcrumbList + Service/OfferCatalog/
  CreativeWork/AboutPage/TechArticle across pages.
- Verification meta slots are pre-placed in `index.html` (commented) — just
  paste codes and uncomment.
- robots.txt allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended, CCBot, etc.
