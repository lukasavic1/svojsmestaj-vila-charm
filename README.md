# Villa Charm — Barajevo

Premium accommodation website for **Villa Charm**, built on the SvojSmeštaj `primersajta` stack (Next.js App Router, TypeScript, CSS).

## Stack

- Next.js 16 + React 19 + TypeScript
- Custom bilingual UI (`sr` / `en`)
- Premium immersive experience (locked — no Basic/Premium demo toggle)
- Booking wizard + range calendar
- Local photography & video in `public/`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Property copy, amenities, rules, map facts, and media paths live in:

- `data/property.ts`
- `data/heroSlides.ts`

Brand favicon: `images/favicon.png` → `app/icon.png` and `public/favicon.png`.

Media source originals: `images/` (linked into `public/images` and `public/videos`).
