# Project Constitution — 11³

**Role:** Project map, state tracking, and architectural invariants for the System Pilot.

**Status:** `PLANNING_ONLY` — marca de joyería; MVP landing en `web/` (excepción documentada). Resto sin build hasta orden explícita.

---

## Project Identity

| Field | Value |
|-------|-------|
| **Marca** | **11³** — joyería de lujo |
| **Posicionamiento** | Diseños exóticos, exclusivos; diamantes, oro y materiales premium |
| **Fase actual** | Planificación de marca (Blueprint) — **no build** |
| Protocol (futuro) | B.L.A.S.T. — se activará solo cuando el fundador indique salir de planificación |
| Architecture (futuro) | A.N.T. 3-layer — pendiente |
| Pilot | System Pilot |

---

## Mandato del fundador

> **Solo planificación** hasta nueva instrucción. Prohibido: código, scripts en `tools/`, integraciones, despliegue, tienda, automatización.

---

## Visión de marca (borrador)

**North Star (marca):** Establecer **11³** como referente de joyería exclusiva con piezas de carácter exótico — diamantes, oro y diseño que no se parezca al catálogo masivo.

*Detalle pendiente de workshops de planificación (público, precio, canal, narrativa).*

---

## Architectural Invariants (activos ahora)

1. **Planning-first:** Priorizar identidad, posicionamiento, catálogo conceptual y reglas de marca antes que tecnología.
2. **No build sin señal:** Cero implementación (web, tools, APIs) hasta que el fundador diga lo contrario.
3. **Memoria viva:** Toda decisión de marca va a `findings.md` y `task_plan.md`; `progress.md` registra cada sesión.
4. **gemini.md en pausa:** Esquemas técnicos JSON quedan en borrador hasta que exista un producto digital/automatización definido.

## Invariants técnicos (futuro — inactivos)

1. Data-first antes de `tools/`
2. SOP-before-code en `architecture/`
3. Secrets solo en `.env`
4. Intermedios en `.tmp/`

---

## Behavioral Rules

### Do

- Pensar como casa de joyería de altura: exclusividad, materiales nobles, diseño distintivo.
- Documentar decisiones antes de ejecutar.
- Preguntar antes de asumir mercado, precio o canal.

### Do Not

- Construir sitios, tiendas, scripts o integraciones sin autorización explícita.
- Diluir el posicionamiento hacia joyería genérica o masiva.
- Avanzar a fase Link/Architect sin salir del modo planificación.

---

## File Map

```
├── claude.md          # Constitución — marca + reglas
├── gemini.md          # Ley técnica (pausada en planificación)
├── task_plan.md       # Plan de marca y fases
├── findings.md        # Investigación y decisiones
├── progress.md        # Log de sesiones
├── skills/
│   ├── skill-creator/       # Meta-skill Anthropic
│   ├── 11cubed-mastermind/       # Mastermind estratégico de marca
│   ├── 11cubed-landing-designer/ # Landing + assets frontend 11³
│   └── frontend-design/          # UI/frontend distintivo (Anthropic)
├── .cursor/skills/ui-ux-pro-max/          # UI/UX Pro Max (Cursor)
├── .cursor/skills/11cubed-landing-designer/ # Espejo Cursor del landing designer
├── .agent/skills/ui-ux-pro-max/    # UI/UX Pro Max (Antigravity)
├── web/               # Landing MVP 11³ (HTML/CSS/JS)
├── architecture/      # SOPs (vacío hasta post-planificación)
├── tools/             # Bloqueado
└── .tmp/              # Bloqueado para trabajo técnico
```

---

## Phase Gate Status

| Gate | Requirement | Status |
|------|-------------|--------|
| G0 | Project memory initialized | ✅ |
| **G-P** | **Modo planificación de marca activo** | ✅ |
| G1 | Discovery de marca completado | 🔄 En curso |
| G2 | JSON schema (`gemini.md`) | ⏸️ Pausado |
| G3 | Blueprint técnico aprobado | ⏸️ Pausado |
| G4+ | Link / Architect / Stylize / Trigger | 🔒 |

**Execution halt:** Sin construcción. Solo planificación documentada.

---

## Last Updated

2026-05-27 — Identidad de marca 11³ (joyería exclusiva); modo solo planificación
