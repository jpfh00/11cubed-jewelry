# Landing MVP — 11³ Accesorios de lujo

**Fecha:** 2026-05-27  
**Estado:** Plan aprobado → implementación MVP  
**Alcance:** Venta de accesorios — relojes, cadenas, diamantes, aretes y piezas afines.

---

## 1. Resumen ejecutivo

Landing **inmersiva tipo editorial** para **11³**: joyería y accesorios de alto valor con estética exótica y oscura. Una sola página con scroll narrativo (vertical + tramo horizontal de categorías), micro-interacciones y CTA de consulta/compra. Inspiración de referentes: Fernando Jorge (objeto-hero), Bulgari Eclettica (scroll horizontal), OCCUPY (ritual de entrada), sin copiar estética.

**Dirección en 3 adjetivos:** *Volcánica · Precisa · Hipnótica*

---

## 2. Objetivo de conversión

| Primario | Secundario |
|----------|------------|
| **Explorar colección** → scroll a categorías | **Consulta privada** (modal / mailto) para piezas +$5k |
| Añadir al carrito en MVP (UI) en piezas seleccionadas | WhatsApp / formulario fase 2 |

MVP: carrito visual + CTA “Solicitar pieza” (no backend de pago).

---

## 3. Design system (11³ — dark luxury)

| Token | Valor | Uso |
|-------|-------|-----|
| `--void` | `#070605` | Fondo base |
| `--obsidian` | `#12100e` | Superficies |
| `--gold` | `#c9a962` | Acento, CTAs |
| `--gold-bright` | `#e8d5a3` | Highlights |
| `--champagne` | `#f5f0e6` | Texto principal |
| `--muted` | `#8a8278` | Texto secundario |
| `--ruby` | `#6b1c2a` | Acento secundario (diamantes) |

**Tipografía:** Cormorant Garamond (display) + Outfit (UI/cuerpo) — lujo legible, no Inter.

**Motion:** Lenis smooth scroll + GSAP ScrollTrigger; `prefers-reduced-motion` desactiva animaciones.

---

## 4. Mapa de secciones

| # | Sección | Propósito | CTA |
|---|---------|-----------|-----|
| 0 | **Preloader** | Ritual de entrada (logo 11³) | — |
| 1 | **Hero** | Deseo + rareza; pieza abstracta/canvas | “Entrar al archivo” |
| 2 | **Manifiesto** | Por qué 11³ no es catálogo masivo | Scroll hint |
| 3 | **Categorías** (scroll horizontal) | Relojes · Cadenas · Diamantes · Aretes | Por categoría |
| 4 | **Piezas destacadas** | 4–6 productos hero con precio “desde” | Añadir / Consultar |
| 5 | **Materiales** | Oro, diamantes, certificación | — |
| 6 | **Exclusividad** | Ediciones limitadas / hecho a pedido | — |
| 7 | **CTA final** | Consulta privada | Formulario simple |
| 8 | **Footer** | Legal, redes, contacto | — |

---

## 5. Inventario de assets (MVP)

| ID | Asset | MVP |
|----|-------|-----|
| H01 | Hero visual | Canvas partículas + gradient mesh CSS |
| P01–04 | Categorías | Imágenes Unsplash editorial (joyería/relojes) |
| P05–08 | Productos | Placeholders con nombre y precio |
| L01 | Logotipo | Tipográfico `11³` en SVG/CSS |
| M01 | Grain overlay | CSS noise SVG |
| F01 | Favicon | `11` en SVG inline |

Fase 2: fotografía propia, OG 1200×630, video loop hero.

---

## 6. Responsive y a11y

- Breakpoints: 375 / 768 / 1024 / 1440  
- Nav fija con blur; menú móvil full-screen  
- Contraste AA en texto champagne sobre void  
- `aria-label` en controles, focus visible, skip link  
- Imágenes con `alt` descriptivo  

---

## 7. Stack técnico MVP

- HTML semántico + CSS custom properties  
- JS vanilla + CDN: Lenis, GSAP + ScrollTrigger  
- Sin build step; carpeta `web/` servible con `npx serve web`  
- Sin secrets; sin backend  

---

## 8. Criterios “Awwwards-ready” (MVP)

- [x] Identidad visual no genérica (tipografía + paleta propia)  
- [x] Entrada ritual (preloader)  
- [x] Scroll horizontal de categorías  
- [x] Animaciones orquestadas al scroll  
- [x] Hover craft en tarjetas producto  
- [x] Canvas / atmósfera en hero  
- [ ] WebGL 3D producto (fase 2)  
- [ ] Audio ambiente opcional (fase 2)  

---

## 9. Copy clave (ES)

- **Hero:** “Lo exótico no se repite.”  
- **Manifiesto:** “Relojes, cadenas, diamantes y aretes concebidos fuera del catálogo.”  
- **CTA:** “Solicitar pieza” / “Consulta privada”

---

## 10. Preguntas abiertas (fundador)

1. ¿Precios reales o solo “Consultar” en MVP?  
2. ¿Mercado MX / US / global? (afecta moneda)  
3. ¿Checkout en fase 2: Shopify, Stripe, o solo lead gen?
