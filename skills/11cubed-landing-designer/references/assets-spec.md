# Frontend assets specification — 11³

Use this table as the **master inventory** for every landing-related asset. In planning mode, fill the **Brief** column; in build mode, fill **Filename** and deliver files.

---

## Naming convention

```
{category}-{descriptor}-{variant}-{width}w.{ext}
```

Examples: `hero-obsidian-ring-01-1920w.webp`, `logo-mark-gold.svg`, `og-default-1200x630.jpg`

---

## Inventory template

| ID | Asset | Spec | Brief / notes | Filename |
|----|-------|------|---------------|----------|
| L01 | Logo — primary | SVG + PNG @2x | Exotic geometry; works on dark | |
| L02 | Logo — reversed | SVG | For light backgrounds | |
| L03 | Logomark only | SVG | Favicon source, social avatar | |
| F01 | favicon.ico | 32×32 | From logomark | |
| F02 | favicon.svg | vector | Modern browsers | |
| F03 | apple-touch-icon | 180×180 | | |
| F04 | web manifest icons | 192, 512 | PWA optional | |
| S01 | og:image | 1200×630 | Hero piece or brand moment | |
| S02 | twitter:card | same or 2:1 variant | | |
| H01 | Hero key visual | 1920×1080 min, WebP/AVIF | Editorial; subject isolation | |
| H02 | Hero video (optional) | 10–15s loop, muted | Spec: codec, poster frame | |
| P01–Pn | Product — hero angle | per SKU | Consistent lighting set | |
| P01–Pn | Product — detail macro | per SKU | Material proof | |
| U01 | Icon set | SVG sprite | Line weight consistent | |
| U02 | Texture / grain | tileable PNG/SVG | Subtle; 5–15% opacity | |
| T01 | Display font | WOFF2 | License documented | |
| T02 | Body font | WOFF2 | License documented | |
| M01 | Motion — page load | CSS or Lottie spec | &lt;1.2s total | |

---

## Image production brief (planning)

For each photographic asset, specify:

1. **Subject** — piece name or abstract
2. **Lighting** — soft key, rim, dark field, etc.
3. **Background** — seamless, stone, fabric, void
4. **Grade** — warm gold / cool silver / high contrast
5. **Crop safe zones** — text overlay areas for hero
6. **Delivery** — WebP + fallback JPEG; max weight targets (hero &lt; 200KB optimized)

---

## Legal & licensing checklist

- [ ] Font license allows web embedding
- [ ] Photography rights confirmed (commission vs stock)
- [ ] No trademark infringement in patterns or marks
- [ ] Model releases if hands/neck shown

---

## Performance budgets (targets)

| Metric | Target |
|--------|--------|
| LCP | &lt; 2.5s on 4G |
| Hero image | Responsive `srcset`; priority load only for LCP |
| Fonts | `font-display: swap`; subset weights used on page |
| Total JS (landing) | Minimal; prefer CSS motion |
| CLS | Reserve space for images and fonts |
