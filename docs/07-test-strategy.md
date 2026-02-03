# Test Strategy — “No Debugging Mire” (Deterministic by Default)

This system must be **boringly reliable** to build and to operate. The goal of this strategy is to prevent common failure modes that create long debug loops:
- environment-dependent failures
- flaky streams/polling
- silent schema drift
- hidden side effects (ops actions without explicit user confirmation)
- log/secret leakage that breaks trust

## Test layers
### 1) Contract tests (API-first)
**Source of truth:** `api/openapi.yaml`  
For every endpoint:
- request/response schema validation
- error envelope consistency
- auth requirements enforced (public allowlist only)

**Gate:** CI blocks merges if contract tests fail.

### 2) Deterministic mock runtime
Provide a **mock MoltBot runtime** used in CI and local dev.
Scenarios:
- healthy
- crash loop
- gateway disconnected
- high-log-volume
- disk pressure
- invalid config

**Design rules**
- deterministic timestamps (or normalized)
- stable fixtures
- scenario toggles via env var / query param

### 3) Unit tests (business logic)
- config validation rules
- redaction pipeline
- job system state transitions
- service manager adapters
- confirmation-token flow

### 4) E2E “golden paths”
E2E tests focus on **only the highest-value paths**, but must be stable:
- Setup Wizard (docker path) → install → validate → apply → verify
- Monitoring → stream logs → reconnect → alert triggers once

**Artifacts on failure**
- agent logs (redacted)
- web console logs
- support bundle output
- optional screenshots for wizard step failures

### 5) Security regression tests
- secret exfil/prompt-injection attempts (Phase 5)
- unauthorized ops action attempts (Phase 4)
- token replay/expiry tests (Phase 1)

## Definition of Done (DoD)
An issue is “Done” only when:
- OpenAPI contract tests pass
- Unit tests added/updated
- E2E coverage updated (if endpoint impacts golden paths)
- Docs updated (if operator-facing)
- No secrets in logs; redaction patterns included if new fields introduced
- Review checklist completed (see PR template)

## Anti-mire defaults
- One-command bootstrap (devcontainer or `make dev`)
- Standardized error envelope across services
- Golden fixtures checked into repo
- Strict lint/format + secret scanning in pre-commit and CI
