# GitHub Issues (Seed Set)
> This is a curated seed list. Expand by cloning patterns per feature area.
## 1. Agent: scaffold service with config + structured logging
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Medium

Create the Ops Agent service skeleton.
- Choose language (Go preferred) and define internal module boundaries.
- Add structured logging (JSON) + log levels.
- Provide config loading with safe defaults.

Acceptance:
- `agent` starts locally and serves /health.
- Logs are structured and do not leak secrets.

---
## 2. API: implement /health and system info endpoint
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Low

Implement:
- GET /health (public)
- GET /system/info (auth required)

Acceptance:
- /system/info includes OS, arch, cpu, mem, disk, hostname.

---
## 3. Auth: pairing flow endpoints /pair/start and /pair/confirm
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:security,component:agent,phase:1,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** High

Implement pairing:
- POST /pair/start returns short-lived code
- POST /pair/confirm exchanges code + device name for access token

Acceptance:
- Codes expire.
- Tokens are short-lived.
- Pairing is rate-limited.

---
## 4. Web: pairing screen + store session token securely
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium

Build minimal web UI:
- Pairing code entry
- Persist token securely (httpOnly cookies if server-backed; otherwise encrypted local storage)

Acceptance:
- Can call /system/info and display result.

---
## 5. Mobile: pairing + status screen (minimal)
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:mobile,phase:1,priority:P1
- **Priority:** P1 | **Component:** Mobile | **Phase:** Phase 1 | **Risk:** Medium

Build minimal mobile UI:
- Pairing code entry
- Show status tiles (gateway, running, uptime placeholder)

Acceptance:
- Token stored in secure storage.

---
## 6. OpenAPI: add contract tests and lint
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:docs,phase:1,priority:P1
- **Priority:** P1 | **Component:** Docs | **Phase:** Phase 1 | **Risk:** Low

Add:
- openapi lint step
- contract tests that ensure server responses conform to openapi.yaml

Acceptance:
- CI fails on spec drift.

---
## 7. Wizard: implement setup flow state machine (shared spec)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:shared,phase:2,priority:P0
- **Priority:** P0 | **Component:** Docs | **Phase:** Phase 2 | **Risk:** Medium

Create a shared wizard state machine used by web and mobile.
Steps: choose setup, prerequisites, install, configure, validate, run, report.

Acceptance:
- Deterministic step transitions.
- Persist/restore wizard state.

---
## 8. Agent: local install endpoints /install/local (brew, npm, docker)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Implement installer engine.
- Idempotent installs
- Captures install logs
- Returns job_id

Acceptance:
- Fresh machine path works (documented).

---
## 9. Config: schema + /config/validate + /config/apply with backups
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:security,component:agent,phase:2,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Define config schema and validation rules.
- /config/apply creates backup by default
- returns backup_id

Acceptance:
- Invalid configs never apply
- Backup created for every apply

---
## 10. Web: setup wizard UI with progress and inline validation
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium

Implement wizard screens and progress UI.
- Preflight checks
- Install progress
- Config builder

Acceptance:
- Can complete local install flow end-to-end.

---
## 11. Logs: implement /logs/tail and /logs/stream (SSE) with redaction
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:security,component:agent,phase:3,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** High

Implement log tail and streaming.
- Redaction pipeline on by default
- Filters and line limits

Acceptance:
- No tokens/keys appear in responses.

---
## 12. Metrics: implement /metrics/current and dashboard tiles
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium

Expose host metrics and moltbot metrics where possible.
Acceptance:
- CPU/mem/disk/uptime populated.

---
## 13. Support: generate diagnostics bundle /support/bundle
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium

Create redacted support bundle zip.
Includes:
- system info
- last 500 logs
- config redacted
- install history
- manifest.json

Acceptance:
- Bundle generated < 10s on typical machine.

---
## 14. Ops: implement /ops/action for start/stop/restart
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Implement safe controls.
- Audit log entry per action
- Verify result after action

Acceptance:
- Restart returns success only if process is healthy.

---
## 15. Ops: backup/restore/rollback flows with encrypted backups
- **Milestone:** Phase 4 — Operations
- **Labels:** type:security,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Backups encrypted at rest.
Rollback supports:
- config rollback
- version rollback (where possible)

Acceptance:
- One-click revert to last known-good.

---
## 16. AI: implement context packet builder and evidence-cited responses
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:security,component:agent,phase:5,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 5 | **Risk:** High

Create a curated context packet:
- status
- recent logs (redacted)
- config validation results
- install history
AI must cite which fields/log ranges informed conclusions.

Acceptance:
- No raw secrets in AI context.
- Responses include evidence section.

---
## 17. Web/Mobile: AI chat UI + Proposed Actions confirmation UX
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:feature,component:web,phase:5,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 5 | **Risk:** Medium

Add AI chat and proposed action cards.
Actions require explicit confirmation and show preflight/impact.

Acceptance:
- No action executes without explicit user approval.

---
## 18. Remote: support TLS + reverse proxy guidance and verification
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:security,component:agent,phase:6,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 6 | **Risk:** High

Provide remote mode behind TLS.
Agent verifies:
- TLS enabled
- strong auth
- warns on public exposure

Acceptance:
- Remote mode blocked without TLS.

---
## 19. Fleet: multi-node registry and node switcher UI
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:feature,component:web,phase:6,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 6 | **Risk:** Medium

Support multiple nodes.
- Add node registry
- Node selector UI
- Per-node alerts

Acceptance:
- Switching nodes updates dashboards reliably.

---
## 20. Packaging: signed installers and auto-update strategy
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:feature,component:infra,phase:7,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 7 | **Risk:** High

Create signed packages and safe update mechanism for agent.
Acceptance:
- Upgrade can roll back on failure.

---
## 21. Compliance: security posture docs + incident response runbook
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:docs,component:docs,phase:7,priority:P1
- **Priority:** P1 | **Component:** Docs | **Phase:** Phase 7 | **Risk:** Medium

Document:
- threat model
- security controls
- incident response
- logging/privacy policy

Acceptance:
- Docs are complete and shippable.

---
