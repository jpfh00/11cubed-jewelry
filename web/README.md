# 11³ — Landing MVP

Landing inmersiva de **alta joyería**: diamantes certificados, esmeraldas de museo, relojería de complicación, cadenas de gala y diseño a medida.

## Ver en local

```bash
cd web
python -m http.server 3456
```

Abre [http://localhost:3456](http://localhost:3456)

## Archivos

| Archivo | Rol |
|---------|-----|
| `LANDING-PLAN.md` | Planificación (IA, design system, assets) |
| `index.html` | Estructura semántica |
| `css/main.css` | Estilos y tokens |
| `js/main.js` | Lenis, GSAP, canvas, carrito, modal |

## Stack

HTML + CSS + JS vanilla · Lenis · GSAP ScrollTrigger · CDN

## Notas MVP

- Imágenes vía `js/images.js` — solo IDs verificados (muchos enlaces antiguos de Unsplash devolvían **404**)
- Sustituir por fotografía propia de piezas reales cuando esté lista
- Catálogo MVP: 12 piezas haute (USD 48k–580k + bajo consulta)
- Carrito y formulario son demo (sin backend)
