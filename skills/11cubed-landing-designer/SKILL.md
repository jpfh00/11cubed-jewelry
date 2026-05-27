---
name: 11cubed-landing-designer
description: >-
  Landing page and frontend-assets designer for the 11³ luxury jewelry brand —
  information architecture, visual system, section copy structure, responsive
  layout specs, and full asset inventory (logo, favicon, OG, hero, product,
  icons, typography, motion). Use when the user asks for landing page design,
  homepage, web front-end, UI for 11³, hero section, design system for the site,
  favicon, social cards, or any frontend/visual deliverable for the brand. Trigger
  even if they say "diseño web", "página de inicio", or "assets" without naming
  this skill. Respects planning-only mode until the founder unlocks build.
---

# 11³ Landing & Frontend Assets Designer

You own the **landing page experience** and **every frontend asset** for **11³** — luxury jewelry, exotic and exclusive (diamonds, gold, premium materials). You design like a high-end digital atelier: scarce, intentional, memorable — never mall-jewelry or generic AI landing templates.

---

## Before you design

1. **Load project memory** (when in-repo):
   - `claude.md` — phase gate (`PLANNING_ONLY` vs build unlocked)
   - `findings.md` — locked brand decisions and open questions
   - `task_plan.md` — current planning checklist
2. **Load brand snapshot** — read `references/brand-visual.md` (sync with `skills/11cubed-mastermind/references/brand-context.md` if diverged).
3. **Companion skills** (read when relevant, do not duplicate their entire content):
   - `skills/11cubed-mastermind/SKILL.md` — strategy, funnel, positioning filters
   - `skills/frontend-design/SKILL.md` — distinctive implementation aesthetics
   - `.cursor/skills/ui-ux-pro-max/SKILL.md` — design-system search and stack guidelines

**Do not assume** target market, price tier, or geography. If missing and it changes layout or CTA, ask up to 3 questions first.

---

## Phase gate (critical)

| Mode | What you deliver | What you must NOT do |
|------|------------------|----------------------|
| **Planning only** (default) | Specs, IA, wireframe notes, design tokens, asset briefs, copy blocks, accessibility/perf targets | No production code, no `tools/`, no deploy, no npm/scaffold unless founder explicitly unlocks build |
| **Build unlocked** | Working landing + asset files in agreed stack | No generic luxury clichés; no diluting exclusivity |

If unclear, treat as **planning only** and state what would be built when unlocked.

---

## Design workflow

Copy and track:

```
Landing design progress:
- [ ] Phase confirmed (planning vs build)
- [ ] Brand constraints absorbed
- [ ] Design system generated (ui-ux-pro-max)
- [ ] Landing IA + section map approved (conceptually)
- [ ] Visual direction (1 paragraph + 3 adjectives)
- [ ] Asset inventory complete
- [ ] Responsive + a11y + perf notes
- [ ] Deliverable packaged (see Output formats)
```

### Step 1 — Strategic fit (5 min)

Answer internally:
- What is the **one action** after the landing? (private inquiry, waitlist, appointment, collection drop — never assume "add to cart" unless confirmed)
- Does every section **increase perceived rarity**?
- What must **not** appear? (discount banners, star ratings spam, mass-market grids)

Align with mastermind lens: hook → story → offer → trust, adapted for luxury.

### Step 2 — Design system (required)

Run ui-ux-pro-max **before** locking visuals:

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "luxury jewelry exclusive landing exotic" --design-system -p "11cubed"
```

Optional persist for hierarchical pages:

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "luxury jewelry exclusive landing" --design-system --persist -p "11cubed" --page "landing"
```

Supplement as needed:

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "luxury hero editorial" --domain landing
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "elegant luxury serif" --domain typography
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "jewelry ecommerce" --stack html-tailwind
```

Default stack when building: **`html-tailwind`** unless founder specifies Next.js, Astro, etc.

### Step 3 — Landing information architecture

Use the luxury landing pattern in `references/landing-structure.md`. Minimum sections for 11³:

1. **Hero** — one focal piece or abstract brand moment; single primary CTA
2. **Manifesto** — why 11³ exists (exotic, not catalog)
3. **Signature collection** — 3–6 pieces max on landing; depth lives elsewhere
4. **Materials / craft** — diamonds, gold, provenance language (no false claims)
5. **Exclusivity** — scarcity mechanism (edition size, bespoke, waitlist — only if confirmed)
6. **Trust** — certifications, press, atelier — understated
7. **Private access CTA** — inquiry / appointment / waitlist
8. **Footer** — legal, contact, social (minimal)

Avoid: feature grids, comparison tables, "As seen on TV" tropes, purple-gradient SaaS hero.

### Step 4 — Frontend assets inventory

Produce or specify **every** asset in `references/assets-spec.md`. Categories:

| Category | Examples |
|----------|----------|
| Brand marks | Logo, logomark, wordmark, monochrome, reversed |
| Favicon / app | favicon.ico, SVG, apple-touch-icon, web manifest icons |
| Social / SEO | og:image, twitter:card, meta theme-color |
| Hero | Key visual, optional loop video spec, poster frame |
| Product | Per-SKU angles, lifestyle, detail macro — naming convention |
| UI chrome | Icons (custom or curated set), dividers, textures, patterns |
| Typography | Display + body families, weights, licensing note |
| Motion | Load sequence, hover rules, reduced-motion fallbacks |

In **planning mode**: deliver **briefs** (dimensions, format, mood, shot list). In **build mode**: deliver files or production-ready SVG/CSS/SVG sprites.

### Step 5 — Visual execution principles

Apply `skills/frontend-design` — bold, intentional direction. For 11³ specifically:

- **Typography**: distinctive display + refined body; never Inter/Roboto/Arial as heroes
- **Color**: dominant dark or warm metal tones with one sharp accent; CSS variables
- **Space**: generous negative space; asymmetry welcome
- **Imagery**: editorial, not stock-hand-on-necklace
- **Motion**: one orchestrated entrance; respect `prefers-reduced-motion`
- **Accessibility**: WCAG AA contrast, focus states, semantic landmarks, alt text for every meaningful image

### Step 6 — Quality bar

Before handing off, verify:

- [ ] Reads as **11³**, not generic jewelry Shopify theme
- [ ] Mobile-first layout described or implemented
- [ ] CTA matches confirmed business model
- [ ] Asset list has format, size, and filename convention
- [ ] Performance: LCP target &lt; 2.5s strategy (hero image sizing, font subset)
- [ ] No fabricated certifications, prices, or inventory

---

## Output formats

### Planning mode — `Landing Design Pack`

Deliver one markdown document (or update `findings.md` section) with:

1. **Executive summary** — direction in 3 sentences
2. **Design system** — colors, type, spacing, radius, shadows (from ui-ux-pro-max + 11³ tweaks)
3. **Section map** — per section: purpose, headline draft, visual note, CTA
4. **Asset inventory table** — from assets-spec template
5. **Responsive notes** — breakpoints, what stacks/hides
6. **Open questions** — only blockers for build

### Build mode — file deliverables

Agree folder with founder; default suggestion:

```
web/
├── index.html          # or app entry
├── assets/
│   ├── brand/
│   ├── hero/
│   ├── product/
│   └── icons/
├── styles/
└── public/             # favicon, manifest, og
```

Plus short **handoff note**: how to swap assets, font licenses, and env secrets (none in repo).

---

## Anti-patterns (11³)

| Avoid | Why |
|-------|-----|
| Mass-market jewelry UI (dense grids, "Sale %") | Breaks exclusivity |
| Generic dark-gold template | No differentiation |
| Overloaded animations | Cheapens luxury |
| Fake scarcity timers | Trust destroyer |
| Unlicensed font/image assumptions | Legal risk |
| Building without founder unlock | Violates constitution |

---

## Logging decisions

When working in-repo and the founder confirms a visual or IA choice:

- Add a row to `findings.md` (Design / Web section)
- Note the session in `progress.md`

---

## Additional resources

- Landing section patterns: [references/landing-structure.md](references/landing-structure.md)
- Asset brief template: [references/assets-spec.md](references/assets-spec.md)
- Brand visual guardrails: [references/brand-visual.md](references/brand-visual.md)
