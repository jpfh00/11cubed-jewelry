# UI Design Prompt Template — 5 Core Dimensions

> Framework for briefing AI on modern UIs.  
> **Skills:** `.cursor/skills/ui-ux-pro-max`, `.agent/skills/ui-ux-pro-max`, `skills/frontend-design`

---

## 1. Pattern & Layout

| Product | Pattern |
|---------|---------|
| E-commerce Luxury | Feature showcase + immersive gallery |
| SaaS | Hero + Features + Social Proof + CTA |

**11³:** Immersive gallery, hero, private appointment CTA.

---

## 2. Style

Minimalist Luxury, Art Deco, or Liquid Glass — avoid generic AI aesthetics.

---

## 3. Color

```css
--primary: #1C1917;
--cta: #CA8A04;
--background: #FAFAF9;
--text: #292524;
```

Generate tailored system:

```bash
python .cursor/skills/ui-ux-pro-max/scripts/search.py "luxury jewelry exclusive" --design-system -p "11cubed"
```

---

## 4. Typography

Distinctive display + refined body (see skill output).

---

## 5. Motion

150–300ms interactions; staggered scroll reveal; `prefers-reduced-motion`.

---

## Vercel MCP

File: `C:\Users\jeanp\.gemini\antigravity\mcp_config.json` — replace `INSERT_VERCEL_API_KEY` with your token from https://vercel.com/account/tokens
