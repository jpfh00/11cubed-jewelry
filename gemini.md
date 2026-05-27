# gemini.md — Data Law & Maintenance Log

> **This file is law.** Planning lives in `task_plan.md`, `findings.md`, and `progress.md`.
> Update this file only when schemas change, rules are added, or architecture is modified.

**Status:** `PAUSED` — planificación de marca activa; esquemas técnicos en borrador hasta que el fundador autorice fase de construcción/digital.

---

## 1. Input Schema (Raw)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "11cubed/input",
  "title": "TBD",
  "type": "object",
  "description": "Define after Discovery: what triggers the system and what raw data enters.",
  "properties": {},
  "required": []
}
```

---

## 2. Processed / Intermediate Schema (Optional)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "11cubed/processed",
  "title": "TBD",
  "type": "object",
  "description": "Internal shape between tools, if needed.",
  "properties": {},
  "required": []
}
```

---

## 3. Output Schema (Delivery Payload)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "11cubed/output",
  "title": "TBD",
  "type": "object",
  "description": "Define after Discovery: final artifact delivered to cloud destination.",
  "properties": {},
  "required": []
}
```

---

## 4. Error & Audit Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "11cubed/audit",
  "title": "RunAudit",
  "type": "object",
  "properties": {
    "run_id": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "status": { "enum": ["success", "partial", "failed"] },
    "errors": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["run_id", "timestamp", "status"]
}
```

---

## 5. Business Rules (Deterministic)

| ID | Rule | Source |
|----|------|--------|
| — | *Pending Discovery* | — |

---

## 6. Maintenance Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-05-27 | Initialized placeholder schemas | Protocol 0 |
