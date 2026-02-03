# Phased Development Plan (with embedded checkpoint reviews)

**Cadence**: 1-week sprints, each ending with:
- ✅ Code review checkpoint (PR reviews + security checklist)
- ✅ Demo checkpoint (recorded or live)
- ✅ Quality gate (tests, lint, OpenAPI contract tests)
- ✅ Decision gate (scope adjust, backlog reprioritize)

## Global quality gates (every sprint)
- OpenAPI lint + server/client contract tests pass
- Dependency + secret scanning pass
- Unit test coverage target: start 40%, raise to 70% by Phase 5
- All endpoints require auth unless explicitly public
- Audit log entries for any action endpoint

---

## Phase 1 — Foundations (Sprint 1–2)
**Goal**: Ops Agent runs locally with secure pairing + status read.

### Deliverables
- Agent skeleton (Go or Node) with structured logging
- Pairing flow: `pair/start`, `pair/confirm`, short-lived tokens
- Read-only endpoints: system info + MoltBot status
- Web console minimal: connect + show status
- Mobile minimal: connect + show status

### Checkpoint reviews
- **Sprint 1 review**: pairing threat model, token storage, local-only enforcement
- **Sprint 2 review**: API contract stability + DX (docs, examples)

---

## Phase 2 — Setup Wizard (Sprint 3–5)
**Goal**: First-time setup from the UI; local install path is deterministic.

### Deliverables
- Wizard steps + progress tracking
- Install methods: brew/npm + Docker (recommended)
- Config schema + validation
- Apply config with preflight checks
- “Setup report” artifact (redacted)

### Checkpoint reviews
- End of Sprint 3: installer scripts + idempotency review
- End of Sprint 4: config schema + validation edge-case review
- End of Sprint 5: user testing checklist (fresh machine)

---

## Phase 3 — Monitoring (Sprint 6–8)
**Goal**: Logs/metrics/connection status become operator-grade.

### Deliverables
- Logs tail + stream (SSE or WS)
- Metrics snapshot endpoint + dashboard
- Alert rules engine + local notifications (web)
- Support bundle export (zip)

### Checkpoint reviews
- End of Sprint 6: log redaction + PII handling review
- End of Sprint 7: alert noise control review
- End of Sprint 8: support bundle completeness review

---

## Phase 4 — Operations (Sprint 9–11)
**Goal**: Safe controls, upgrades, backups, rollback.

### Deliverables
- Start/stop/restart
- Upgrade flow with pre-action backup
- Backup/restore config + keys (encrypted)
- Rollback plan + verification steps
- Audit log viewer

### Checkpoint reviews
- End of Sprint 9: destructive action safety review
- End of Sprint 10: backup encryption review
- End of Sprint 11: rollback chaos test review

---

## Phase 5 — AI Help (Sprint 12–13)
**Goal**: AI assistant grounded in logs/state and proposes actions safely.

### Deliverables
- AI chat UI
- “Context packet” builder (status/logs/config validation)
- Runbook-first retrieval
- “Propose actions” with user-approved execution
- Evidence citations in responses

### Checkpoint reviews
- End of Sprint 12: hallucination controls review
- End of Sprint 13: prompt injection + data leakage review

---

## Phase 6 — Remote Access + Fleet (Sprint 14–17)
**Goal**: multi-node ops with secure remote access.

### Deliverables
- Remote access option A: user-hosted reverse proxy with TLS
- Option B: relay service (optional) with E2EE design
- Fleet dashboard: multiple nodes
- RBAC (Owner/Admin/Viewer)
- MFA (optional)

### Checkpoint reviews
- End of Sprint 14: remote auth review
- End of Sprint 15: RBAC + audit review
- End of Sprint 16–17: penetration test checklist + remediation

---

## Phase 7 — Production hardening (Sprint 18+)
**Goal**: packaging, reliability, compliance posture.

### Deliverables
- Signed installers / packages
- Auto-update strategy (agent + clients)
- Observability (OpenTelemetry)
- Documentation + runbooks + IR plan

### Checkpoint reviews
- Release readiness review each sprint
