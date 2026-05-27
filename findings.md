# findings.md — Investigación y decisiones

**Proyecto:** 11³ — joyería de lujo  
**Última actualización:** 2026-05-27 (benchmark landing joyería)

---

## Decisión del fundador

| Fecha | Decisión |
|-------|----------|
| 2026-05-27 | **11³** es el nombre de la **marca de joyería** (diseños exóticos, exclusivos, diamantes, oro, etc.) |
| 2026-05-27 | **Solo planificación** — no construir nada hasta indicación contraria |
| 2026-05-27 | Skill **`11cubed-mastermind`** — asesor estratégico (joyería lujo + funnel hacker + branding) |
| 2026-05-27 | Skill **`11cubed-landing-designer`** — landing page, design system e inventario de assets frontend (respeta modo planificación) |
| 2026-05-27 | **Landing MVP** en `web/` — accesorios (relojes, cadenas, diamantes, aretes); plan en `web/LANDING-PLAN.md` |

---

## Identidad de marca (confirmado)

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Nombre | ✅ 11³ | Marca registrada en proyecto |
| Categoría | ✅ Joyería de lujo | — |
| Estética / oferta | ✅ Exótico, exclusivo | Diseños distintivos |
| Materiales clave | ✅ Diamantes, oro | Ampliar: platino, gemas, etc. |
| Posicionamiento detallado | ⏳ Pendiente | Público, precio, geografía |
| Historia del nombre 11³ | ⏳ Pendiente | Narrativa de marca |

---

## Discovery — planificación de marca

*Preguntas abiertas para ir llenando en sesiones (no técnicas).*

| Tema | Pregunta guía | Respuesta |
|------|---------------|-----------|
| Público | ¿A quién vendemos primero? | — |
| Geografía | ¿Mercado inicial (país/ciudad)? | — |
| Precio | ¿Ultra-luxury, lujo accesible, o mixto? | — |
| Exclusividad | ¿Piezas únicas, ediciones de N, o ambos? | — |
| Inspiración | Referencias visuales / marcas admiradas (no copiar) | Ver **Research — landing joyería** (2026-05-27) |
| Nombre 11³ | ¿Qué debe evocar el cubo / el número? | — |
| No hacer | ¿Qué rechaza la marca explícitamente? | — |

---

## Discovery técnico (B.L.A.S.T.) — pausado

Integraciones, source of truth y payload digital: **no aplica** hasta salir de planificación.

---

## Research (mercado / referencia)

### Benchmark — landing pages joyería (2026-05-27)

*Modelar **principios y mecanismos**, no copiar estética. Fuentes: Gartner L2 Digital IQ (joyería/relojes), Awwwards, estudios de caso (NOT Studio, Immersive Garden, Lovelace).*

#### Tier A — Grandes casas (referencia omnicanal + confianza)

| Marca | URL | Fortalezas UX/UI | Interactividad |
|-------|-----|------------------|----------------|
| **Cartier** | [cartier.com](https://www.cartier.com) | Digital IQ #1 histórico; omnicanal | Campañas **WebGL/scroll** (Watches & Wonders, fin de año) — [Awwwards](https://www.awwwards.com/watches-wonders-immersive-experience-for-cartier.html), [Immersive Garden](https://immersive-g.com/projects/cartier-watches-and-wonders-24/) |
| **Tiffany & Co.** | [tiffany.com](https://www.tiffany.com) | Citas virtuales/presenciales, personalización, servicio | Vistas **360°** y video en producto; bloque “Tiffany Experience” |
| **Bulgari** | [bulgari.com](https://www.bulgari.com) | Live chat checkout, storytelling | **Bulgari Eclettica** — scroll horizontal, parallax, narrativa HM [Awwwards](https://www.awwwards.com/sites/bulgari-eclettica) |
| **Van Cleef & Arpels** | [vancleefarpels.com](https://www.vancleefarpels.com) | Cita en boutique, asesores, e-boutique pulido | **Gift Promenade** — recorrido poético por cartas/temas (mobile portrait) |
| **David Yurman** | [davidyurman.com](https://www.davidyurman.com) | Cita, checkout 1 página, envío express | UX de conversión DTC dentro de lujo |
| **Graff** | [graff.com](https://www.graff.com) | Hero diamante, high jewelry, cita boutique | Visual confidence; narrativa “Graff Difference” |
| **Harry Winston** | [harrywinston.com](https://www.harrywinston.com) | Storytelling floral/bridal, “Find My Salon” | Editorial estacional; CTA consultivo |
| **Chopard** | [chopard.com](https://www.chopard.com) | E-commerce global, servicios online | Imagen premium; menos “experimento” que Cartier |
| **Buccellati** | [buccellati.com](https://www.buccellati.com) | Relanzamiento web 2022: rápido, multi-idioma, móvil | Historia de maison + e-commerce integrado (Richemont) |

#### Tier B — Avant-garde / DTC (más cercano a 11³ exótico-exclusivo)

| Marca | URL | Por qué importa | Patrón clave |
|-------|-----|-----------------|--------------|
| **Fernando Jorge** | [fernandojorge.co.uk](https://www.fernandojorge.co.uk) | Caso NOT Studio: joyería como **escultura** en pantalla | Espacio negativo, animación suave, **Enquire** (no checkout agresivo), continuidad editorial campaña → producto |
| **Repossi** | [repossi.com](https://repossi.com) | Place Vendôme, minimal radical, “art à porter” | Blancos amplios, high jewellery storytelling, **Book appointment** |
| **Messika** | [messika.com](https://www.messika.com) | Lujo contemporáneo, Move icon | Editorial fashion + e-boutique claro; beneficios y asesor por email |
| **OCCUPY** (bespoke) | [occupy.jewelry](https://occupy.jewelry) | **SOTD Awwwards** ene 2026 | Ritual, símbolo, loading/mouse/tear-strip — entrada “invitación”, no catálogo |

#### Tier C — Proyectos web premiados (laboratorio de interacción)

| Proyecto | Reconocimiento | Aprendizaje |
|----------|----------------|-------------|
| [Cartier — Lovelace retrospective](https://lovelace.paris/projects/cartier) | SOTD, FWA, WebGL | Scroll infinito + audio atmosférico + capítulos |
| [Unique Jewelry](https://www.awwwards.com/sites/unique-jewelry) | HM Awwwards | Landing + **configurador 3D** (WEBGi/Three.js) |
| [Juri jewelry brand](https://www.awwwards.com/sites/juri-jewelry-brand) | HM mar 2026 | Pieza como “obra de arte”; shop/about cohesionado |
| [Cartier W&W 2026](https://www.awwwards.com/websites/luxury/) | SOTD (lista luxury Awwwards) | 6 escenas 3D, gestos ocultos, “alcoves” digitales |

#### Patrones UX/UI que ganan (2026)

1. **Confianza visual** — macro + lifestyle + contexto de uso; fondo blanco solo no basta para piezas de alto ticket.
2. **Narrativa > catálogo** — colecciones como capítulos; scroll pausado; parallax/horizontal con propósito (Bulgari Eclettica).
3. **Concierge digital** — enquire, cita, chat, asesor; menos “Add to cart” en ultra-luxury (Fernando Jorge, Graff, VCA).
4. **Inmersión selectiva** — WebGL/3D en campañas y high jewelry, no en toda la tienda (rendimiento + mantenimiento).
5. **Mobile-first real** — >60% tráfico joyería; sticky CTA discreto, forms cortos, portrait para experiencias (Gift Promenade).
6. **Micro-interacciones con restricción** — load cinematográfico, hover reveal; `prefers-reduced-motion` obligatorio en build futuro.
7. **Transparencia** — materiales, plazos, certificaciones, devoluciones (sin inventar en 11³).

#### Anti-patrones observados en el segmento mass/lujo diluido

- Grids densos, badges “Sale”, timers falsos, tipografía Inter/system, gradientes morados tipo SaaS.
- AR try-on como gimmick sin integrar narrativa (más proveedor B2B: Trillion, Banuba que casas heritage).

#### Implicación para 11³ (planificación)

| Modelar | Evitar |
|---------|--------|
| Fernando Jorge + Repossi: objeto-hero, enquire, espacio | Plantilla Shopify joyería genérica |
| Cartier/Bulgari: 1 momento inmersivo en lanzamiento | WebGL en toda la home sin contenido |
| VCA/Tiffany: cita y regalo como ritual | Checkout masivo en primera visita |
| OCCUPY/Juri: identidad radical memorable | Copiar paleta dorado-negro de mall luxury |

| Recurso | Relevancia | Notas |
|---------|------------|-------|
| Gartner L2 Digital IQ (joyería) | Benchmark corporativo | Cartier, Tiffany, Bulgari top 3 — [National Jeweler](https://nationaljeweler.com/majors/ecommerce/7473-what-the-brands-with-the-highest-digital-iq-do-right) |
| NOT — Fernando Jorge | Caso DTC lujo | [Objects of Desire](https://www.not.studio/monitor/objects-of-desire) |
| Awwwards — Luxury | Inspiración interactiva | [awwwards.com/websites/luxury](https://www.awwwards.com/websites/luxury/) |

---

## Constraints

| Restricción | Impacto |
|-------------|---------|
| Modo solo planificación | Cero código, cero tools, cero despliegue |
| Exclusividad como pilar | Evitar propuestas genéricas o masivas |
| No asumir mercado | Validar país, canal y precio con el fundador |
