# Green Beauty Farms — Landing Page

Built with Next.js (App Router) + Tailwind CSS, structured the same way as the
Expressway Residency landing page: a `layout.js` for SEO metadata/fonts, a
single `page.js` with all sections, and a shared `LeadModal.js` popup.

## Before going live, replace these placeholders

| What | Where | Search for |
|---|---|---|
| All images | `src/app/page.js`, `layout.js` | `placehold.co` URLs — each one's `text=` label tells you which real photo/graphic goes there |
| Web3Forms access key | `page.js` + `LeadModal.js` | `YOUR_WEB3FORMS_ACCESS_KEY` |
| Google Ads tag ID + conversion label | `layout.js`, `LeadModal.js` | `AW-XXXXXXXXXX` |
| Starting price | `page.js` | `STARTING_PRICE` |
| Phone / WhatsApp numbers | `page.js`, `LeadModal.js` (footer, FAB, nav) | `PHONE_DISPLAY`, `PHONE_TEL`, `WHATSAPP_NUMBER` |
| Google Maps embed | `page.js` | the `iframe src` in the Map section |
| Live domain | `layout.js` | `SITE_URL` |

## SEO notes

- `layout.js` sets a full meta title/description, Open Graph + Twitter cards,
  a canonical URL, and JSON-LD `RealEstateListing` structured data — fill in
  `SITE_URL` and swap the OG image once you have real photography.
- Copy throughout `page.js` is original (not lifted from any brochure or
  competitor site) and written around the actual facts of the project
  (location, plot sizes, amenities) so it reads as unique content to search
  engines rather than templated filler.
- Headings follow a single H1 → H2 → H3 hierarchy per section for crawlability.

## Install & run

```bash
npm install
npm run dev
```
