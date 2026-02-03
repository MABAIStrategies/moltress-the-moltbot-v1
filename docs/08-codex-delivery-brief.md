# Codex Delivery Brief — MoltBot Ops (First-Shot Success)

Use this brief as the authoritative instruction packet for an implementation model (Codex or equivalent).
The implementation MUST prioritize **determinism, testability, and security** over speed.

## Non-negotiables
1) **OpenAPI is the contract.**  
   - Implement endpoints exactly as specified in `api/openapi.yaml`
   - Add contract tests; CI must fail on schema drift

2) **No side effects without explicit approval.**  
   - For destructive/ops actions: require short-lived confirmation token
   - Log every action in an audit store (no secrets, no PII)

3) **Deterministic dev + CI environment.**  
   - Provide mock runtime and golden fixtures
   - E2E tests for wizard + monitoring golden paths
   - Failure artifacts exported automatically

4) **Security by default.**
   - Redaction pipeline enabled for logs/support bundles
   - Rate limits for pairing endpoints
   - Secrets stored via OS secret store adapter when possible
   - Secret scanning and dependency audits enforced in PRs

## Implementation sequence (do not reorder)
### Step 0 — Scaffolding
- Repo layout matches `docs/01-repo-structure.md`
- CI jobs operational (`.github/workflows/*`)
- OpenAPI lint and test harness in place

### Step 1 — Minimal vertical slice
- `/health` + `/pair/*` + auth middleware
- `/system/info` + `/moltbot/status`
- Web pairing UI + simple dashboard (read-only)

### Step 2 — Wizard vertical slice
- job system + progress events
- deterministic install path (docker first)
- schema-driven config builder + validate/apply

### Step 3 — Monitoring vertical slice
- redaction pipeline
- logs tail + SSE stream with reconnect/backpressure
- metrics current + alerts rules CRUD
- support bundle generator

### Step 4 — Operations vertical slice
- service manager adapters
- restart/start/stop with verification
- backups + upgrade + rollback with confirmation token
- audit trail + export

### Step 5+ — AI help, fleet, hardening
- grounded assistance: runbook retrieval + citations
- propose actions (never auto-exec)
- mTLS, RBAC, packaging, SBOM

## Review checkpoints (embedded)
At the end of every phase:
- ✅ contract tests green
- ✅ e2e golden paths green
- ✅ threat model updated (if security surface changed)
- ✅ perf/accessibility checks pass (web)
- ✅ docs updated

## Output expectations
The implementation output must include:
- working build/run scripts
- tests passing in CI
- stable local dev experience
- strict security posture aligned to docs/02-security.md
- “hyper-magnificent” UI interactions with reduced-motion fallback
