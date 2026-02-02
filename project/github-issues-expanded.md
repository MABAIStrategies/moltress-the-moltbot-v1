# GitHub Issues (Expanded Catalog — 150)
> Use `project/github-issues-expanded.csv` for bulk import.

## Import guidance
- Create milestones first (Phase 1..7)
- Apply labels
- Bulk import issues
- Add all issues to the GitHub Project v2 and set fields (Phase/Component/Priority)

---

## 1. Agent: initialize scaffolding + /health
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Low

Create agent skeleton, config loader, and /health endpoint (public).

Acceptance Criteria:
- Agent starts locally
- /health returns ok + timestamp
- Structured JSON logs

---
## 2. Auth: /pair/start short-lived codes + rate limits
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:security,component:agent,phase:1,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** High
- **Depends on:** Agent: initialize scaffolding + /health

Implement POST /pair/start; issues short-lived pairing code.

Acceptance Criteria:
- Codes expire <= 3 minutes
- Rate limited
- No secrets in responses

Depends on: Agent: initialize scaffolding + /health

---
## 3. Auth: /pair/confirm token minting + rotation policy
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:security,component:agent,phase:1,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** High
- **Depends on:** Auth: /pair/start short-lived codes + rate limits

Implement POST /pair/confirm; exchanges code for access token.

Acceptance Criteria:
- Short-lived access tokens
- Optional refresh token
- Failed attempts logged (redacted)

Depends on: Auth: /pair/start short-lived codes + rate limits

---
## 4. Auth: middleware + public-route allowlist
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:security,component:agent,phase:1,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** High
- **Depends on:** Auth: /pair/confirm token minting + rotation policy

Enforce auth across endpoints; only /health and /pair/* public.

Acceptance Criteria:
- 401/403 consistent with OpenAPI
- Deny-by-default

Depends on: Auth: /pair/confirm token minting + rotation policy

---
## 5. System: /system/info (normalized)
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Medium
- **Depends on:** Auth: middleware + public-route allowlist

Implement GET /system/info with OS/arch/cpu/mem/disk/hostname.

Acceptance Criteria:
- Works on macOS + Linux
- Safe defaults if unknown

Depends on: Auth: middleware + public-route allowlist

---
## 6. MoltBot: detect installed/version/config path
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Medium
- **Depends on:** System: /system/info (normalized)

Implement MoltBot detection and /moltbot/status response.

Acceptance Criteria:
- Returns installed/running/version/config_path
- Handles unknowns safely

Depends on: System: /system/info (normalized)

---
## 7. OpenAPI: lint + contract tests wired into CI
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:docs,phase:1,priority:P1
- **Priority:** P1 | **Component:** Docs | **Phase:** Phase 1 | **Risk:** Low

Add OpenAPI lint and contract tests to CI to prevent drift.

Acceptance Criteria:
- CI fails on spec drift
- Contract tests run against agent

---
## 8. SDK: generate TS types/client from OpenAPI
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:sdk,phase:1,priority:P2
- **Priority:** P2 | **Component:** SDK | **Phase:** Phase 1 | **Risk:** Low
- **Depends on:** OpenAPI: lint + contract tests wired into CI

Generate TS client/types in packages/sdk.

Acceptance Criteria:
- Used by web + mobile
- Published internally

Depends on: OpenAPI: lint + contract tests wired into CI

---
## 9. Web: pairing screen + secure token storage
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium
- **Depends on:** Auth: /pair/confirm token minting + rotation policy

Implement web pairing UI and secure token persistence.

Acceptance Criteria:
- Can call /system/info
- Token not exposed to JS (preferred)

Depends on: Auth: /pair/confirm token minting + rotation policy

---
## 10. Web: overview dashboard v0
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Low
- **Depends on:** MoltBot: detect installed/version/config path

Overview tiles: installed/running/gateway + last event snippet.

Acceptance Criteria:
- Updates fast
- Clear empty/error states

Depends on: MoltBot: detect installed/version/config path

---
## 11. Mobile: pairing + status v0
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:mobile,phase:1,priority:P2
- **Priority:** P2 | **Component:** Mobile | **Phase:** Phase 1 | **Risk:** Medium
- **Depends on:** Auth: /pair/confirm token minting + rotation policy

Mobile pairing and basic status tiles.

Acceptance Criteria:
- Secure storage
- Pull-to-refresh
- Handles offline

Depends on: Auth: /pair/confirm token minting + rotation policy

---
## 12. Docs: dev quickstart + local dev bootstrap
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:docs,component:docs,phase:1,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 1 | **Risk:** Low

Write quickstart and provide scripts/dev-bootstrap.sh template.

Acceptance Criteria:
- Fresh dev runs web+agent in <10 min

---
## 13. Design: component + motion baseline
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:docs,phase:1,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 1 | **Risk:** Medium

Establish component library baseline and motion guidelines.

Acceptance Criteria:
- Dark mode
- Reduced motion
- Performance budget

---
## 14. Wizard: shared state machine spec
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:docs,phase:2,priority:P0
- **Priority:** P0 | **Component:** Docs | **Phase:** Phase 2 | **Risk:** Medium

Define wizard steps and persistence/resume behavior.

Acceptance Criteria:
- Deterministic transitions
- Resume after restart

---
## 15. Agent: job system for long-running tasks
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Implement job queue with progress events and cancellation.

Acceptance Criteria:
- Jobs persisted
- job_id returned
- Cancel supported

---
## 16. Install: /install/local brew (idempotent)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High
- **Depends on:** Agent: job system for long-running tasks

Implement brew install with version checks and idempotency.

Acceptance Criteria:
- Safe re-run
- Install logs captured
- Returns job_id

Depends on: Agent: job system for long-running tasks

---
## 17. Install: /install/local npm (idempotent)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High
- **Depends on:** Agent: job system for long-running tasks

Implement npm install with version checks and idempotency.

Acceptance Criteria:
- Safe re-run
- Install logs captured
- Returns job_id

Depends on: Agent: job system for long-running tasks

---
## 18. Install: /install/local docker (recommended)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High
- **Depends on:** Agent: job system for long-running tasks

Implement docker install path and compose generator.

Acceptance Criteria:
- Deterministic runtime
- Env-based config
- Returns job_id

Depends on: Agent: job system for long-running tasks

---
## 19. Install: /install/ssh for VPS (key auth + host verification)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:security,component:agent,phase:2,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Implement VPS install via SSH with safe host-key handling.

Acceptance Criteria:
- Key auth supported
- Host key verification
- Secrets never logged

---
## 20. Config: schema + validation engine
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Define config schema and validation rules (versioned).

Acceptance Criteria:
- Clear error paths
- Warnings separated

---
## 21. Config: /config/validate contract tests
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:chore,component:agent,phase:2,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** Medium
- **Depends on:** Config: schema + validation engine

Add contract and edge-case tests for /config/validate.

Acceptance Criteria:
- Invalid configs rejected
- Clear errors

Depends on: Config: schema + validation engine

---
## 22. Config: /config/apply with pre-backup snapshot
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:security,component:agent,phase:2,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High
- **Depends on:** Config: schema + validation engine

Implement apply with automatic backup (stub encryption here; full in Phase 4).

Acceptance Criteria:
- Backup per apply
- Audit event recorded

Depends on: Config: schema + validation engine

---
## 23. Web: wizard screens (choose setup + prerequisites)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium
- **Depends on:** Wizard: shared state machine spec

Implement first wizard screens and stepper UI.

Acceptance Criteria:
- Crisp state transitions
- Reduced motion supported

Depends on: Wizard: shared state machine spec

---
## 24. Web: install step UI w/ job progress + logs
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium
- **Depends on:** Agent: job system for long-running tasks

Install UI with progress updates and log snippets.

Acceptance Criteria:
- Retry on recoverable errors
- Shows actionable errors

Depends on: Agent: job system for long-running tasks

---
## 25. Web: schema-driven config builder
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium
- **Depends on:** Config: schema + validation engine

Generate config form from schema with inline validation.

Acceptance Criteria:
- Shows error paths
- Provides sensible defaults

Depends on: Config: schema + validation engine

---
## 26. Mobile: wizard minimal path (local-only)
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:mobile,phase:2,priority:P2
- **Priority:** P2 | **Component:** Mobile | **Phase:** Phase 2 | **Risk:** Medium

Implement mobile wizard for local path.

Acceptance Criteria:
- Can install + config + validate

---
## 27. Testing: fresh-machine smoke scripts
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:chore,component:infra,phase:2,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 2 | **Risk:** Medium

Provide repeatable smoke tests for Mac/Linux to validate wizard flow.

Acceptance Criteria:
- Repeatable
- Produces pass/fail summary

---
## 28. Docs: setup report artifact format
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:docs,component:docs,phase:2,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 2 | **Risk:** Low

Define redacted setup report format + examples.

Acceptance Criteria:
- Includes versions + steps
- Omits secrets

---
## 29. Logs: redaction pipeline + tests
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:security,component:agent,phase:3,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** High

Implement redaction of tokens/keys/emails/phones with unit tests.

Acceptance Criteria:
- Enabled by default
- Configurable patterns

---
## 30. Logs: /logs/tail (paging + caps)
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium
- **Depends on:** Logs: redaction pipeline + tests

Return last N lines with caps and paging token.

Acceptance Criteria:
- Prevent memory blowups
- Redaction honored

Depends on: Logs: redaction pipeline + tests

---
## 31. Logs: /logs/stream SSE (backpressure + reconnect)
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** High
- **Depends on:** Logs: redaction pipeline + tests

SSE streaming with reconnect and backpressure controls.

Acceptance Criteria:
- Stable under reconnect
- Caps buffer

Depends on: Logs: redaction pipeline + tests

---
## 32. Metrics: collector (cpu/mem/disk/uptime)
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium

Collect host metrics cross-platform with low overhead.

Acceptance Criteria:
- Accurate snapshots
- Low CPU overhead

---
## 33. Metrics: /metrics/current endpoint + contract tests
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Low
- **Depends on:** Metrics: collector (cpu/mem/disk/uptime)

Expose metrics via API and validate against OpenAPI.

Acceptance Criteria:
- Contract tests
- Handles missing fields

Depends on: Metrics: collector (cpu/mem/disk/uptime)

---
## 34. Alerts: rules engine + evaluation loop
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** High

Implement rule evaluation and CRUD for common incidents.

Acceptance Criteria:
- Debounced
- Rule history stored

---
## 35. Alerts: notifier channels (in-app + webhook)
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium
- **Depends on:** Alerts: rules engine + evaluation loop

Add notifier for in-app and webhook; retries and signing option.

Acceptance Criteria:
- Retries with backoff
- Optional HMAC signature

Depends on: Alerts: rules engine + evaluation loop

---
## 36. Support: /support/bundle zip + manifest
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium

Generate redacted support bundle with manifest and checksums.

Acceptance Criteria:
- Completes <10s typical
- Manifest indicates redaction

---
## 37. Web: logs viewer (tail + live) with filters
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium
- **Depends on:** Logs: /logs/stream SSE (backpressure + reconnect)

Implement logs viewer with search, filters, and smooth scrolling.

Acceptance Criteria:
- Copy blocks
- No UI jank

Depends on: Logs: /logs/stream SSE (backpressure + reconnect)

---
## 38. Web: metrics dashboard (single charts, perf budget)
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Low

Add CPU/mem/disk charts; enforce perf budget and accessibility.

Acceptance Criteria:
- No heavy animation loops
- Accessible tooltips

---
## 39. Web: alerts UI (rules + history)
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium

CRUD alert rules and show alert history.

Acceptance Criteria:
- Clear severity
- De-noised presentation

---
## 40. Mobile: compact log tail + alerts list
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:mobile,phase:3,priority:P3
- **Priority:** P3 | **Component:** Mobile | **Phase:** Phase 3 | **Risk:** Low

Mobile log tail with pagination and alerts list.

Acceptance Criteria:
- Pull-to-refresh
- Offline-friendly

---
## 41. QA: synthetic incident simulations
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:chore,component:infra,phase:3,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 3 | **Risk:** Medium

Create scripts to simulate gateway disconnect and crash loop.

Acceptance Criteria:
- Repeatable
- Produces report

---
## 42. Docs: support template + triage guide
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:docs,component:docs,phase:3,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 3 | **Risk:** Low

Document triage steps aligned to bundle contents; provide copy template.

Acceptance Criteria:
- One-page template
- Links to runbooks

---
## 43. Ops: service manager abstraction (systemd/launchd/docker)
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Implement platform adapters for start/stop/restart across managers.

Acceptance Criteria:
- Deterministic results
- Clear errors

---
## 44. Ops: /ops/action start/stop/restart w/ verification
- **Milestone:** Phase 4 — Operations
- **Labels:** type:security,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High
- **Depends on:** Ops: service manager abstraction (systemd/launchd/docker)

Wire /ops/action to service manager and verify health after action.

Acceptance Criteria:
- Returns ok only if verified
- Audit event emitted

Depends on: Ops: service manager abstraction (systemd/launchd/docker)

---
## 45. Audit: append-only action log (tamper-evident option)
- **Milestone:** Phase 4 — Operations
- **Labels:** type:security,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Implement audit log store; optional hash-chain integrity.

Acceptance Criteria:
- Queryable
- Exportable
- No PII leakage

---
## 46. Backups: encrypted snapshot format (AES-GCM) + key handling
- **Milestone:** Phase 4 — Operations
- **Labels:** type:security,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Define encrypted backup format and key management strategy.

Acceptance Criteria:
- Keys in OS keychain when possible
- Backups unusable without key

---
## 47. Backups: create/restore actions w/ preflight
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:agent,phase:4,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High
- **Depends on:** Backups: encrypted snapshot format (AES-GCM) + key handling

Implement backup create/restore actions and preflight checks.

Acceptance Criteria:
- Restore validates config
- Restore audited

Depends on: Backups: encrypted snapshot format (AES-GCM) + key handling

---
## 48. Security: confirmation token flow for destructive ops
- **Milestone:** Phase 4 — Operations
- **Labels:** type:security,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Require short-lived confirmation token for upgrade/restore/rollback.

Acceptance Criteria:
- Token expires quickly
- Refuse without token

---
## 49. Upgrade: staged upgrade (preflight->backup->upgrade->verify)
- **Milestone:** Phase 4 — Operations
- **Labels:** type:security,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High
- **Depends on:** Backups: create/restore actions w/ preflight

Implement upgrade action with automatic rollback on verify failure.

Acceptance Criteria:
- Automatic rollback
- Full audit trail

Depends on: Backups: create/restore actions w/ preflight

---
## 50. Rollback: one-click revert to last-known-good
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High
- **Depends on:** Upgrade: staged upgrade (preflight->backup->upgrade->verify)

Rollback config/version where possible and verify after revert.

Acceptance Criteria:
- Verification required
- Audited

Depends on: Upgrade: staged upgrade (preflight->backup->upgrade->verify)

---
## 51. Web: operations center UI (controls + confirmations)
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:web,phase:4,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 4 | **Risk:** Medium

Operate section with action confirmations and impact preview.

Acceptance Criteria:
- Explicit confirmations
- Shows last backup id

---
## 52. Web: audit log viewer with filters + export
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:web,phase:4,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 4 | **Risk:** Low
- **Depends on:** Audit: append-only action log (tamper-evident option)

Build audit viewer with filters by action/time/actor; export CSV.

Acceptance Criteria:
- Fast
- No sensitive data

Depends on: Audit: append-only action log (tamper-evident option)

---
## 53. Mobile: quick actions (restart/export bundle) w/ confirmations
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:mobile,phase:4,priority:P3
- **Priority:** P3 | **Component:** Mobile | **Phase:** Phase 4 | **Risk:** Low

Add mobile quick actions with confirm flows.

Acceptance Criteria:
- Consistent with web
- Confirmation tokens honored

---
## 54. Infra: chaos tests for upgrade/rollback
- **Milestone:** Phase 4 — Operations
- **Labels:** type:chore,component:infra,phase:4,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 4 | **Risk:** High

Automate failure injection and verify rollback restores LKG.

Acceptance Criteria:
- Repeatable
- Produces report

---
## 55. Docs: operator runbooks for ops actions
- **Milestone:** Phase 4 — Operations
- **Labels:** type:docs,component:docs,phase:4,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 4 | **Risk:** Low

Document backup/restore/upgrade/rollback procedures with verify steps.

Acceptance Criteria:
- Clear success criteria
- Escalation criteria

---
## 56. Agent: secure storage abstraction (keychain/secretservice/DPAPI)
- **Milestone:** Phase 4 — Operations
- **Labels:** type:security,component:agent,phase:4,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Implement secure storage adapter for secrets and keys.

Acceptance Criteria:
- Uses OS primitives
- Clear fallback behavior

---
## 57. AI: context packet builder (strict redaction + size caps)
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:security,component:agent,phase:5,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 5 | **Risk:** High

Build context packet assembler with deterministic schema and redaction.

Acceptance Criteria:
- Secret-safe
- Size-limited
- Deterministic schema

---
## 58. AI: runbook retrieval (offline) + citations
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:feature,component:agent,phase:5,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 5 | **Risk:** Medium

Index and retrieve runbooks before AI answers; include citations.

Acceptance Criteria:
- Works offline
- Produces citations

---
## 59. AI: response schema w/ evidence + confidence
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:security,component:agent,phase:5,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 5 | **Risk:** High

Define strict response schema including evidence and confidence.

Acceptance Criteria:
- Must cite evidence
- Refuse secret requests

---
## 60. AI: prompt injection defenses
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:security,component:agent,phase:5,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 5 | **Risk:** High

Separate instructions vs data; escape logs/config; add injection tests.

Acceptance Criteria:
- Injection tests pass
- No tool execution without approval

---
## 61. Web: AI chat UI + proposed actions cards
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:feature,component:web,phase:5,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 5 | **Risk:** Medium

Add AI chat and action cards requiring explicit approval.

Acceptance Criteria:
- Impact preview
- Confirmation required
- Audited

---
## 62. Web: runbook search/viewer integrated with AI
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:feature,component:web,phase:5,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 5 | **Risk:** Low

Add runbook UI and link-outs from AI responses.

Acceptance Criteria:
- Search works
- Versioned runbooks

---
## 63. Mobile: AI chat (compact) + proposed actions flow
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:feature,component:mobile,phase:5,priority:P2
- **Priority:** P2 | **Component:** Mobile | **Phase:** Phase 5 | **Risk:** Low

Implement mobile AI chat with simplified action cards.

Acceptance Criteria:
- Secure storage
- Consistent approval model

---
## 64. Ops: execute approved proposed actions with audit linkage
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:security,component:agent,phase:5,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 5 | **Risk:** High
- **Depends on:** Security: confirmation token flow for destructive ops

Execute AI-proposed actions only after explicit user approval; link to proposal id.

Acceptance Criteria:
- Proposal hashed
- Action audited

Depends on: Security: confirmation token flow for destructive ops

---
## 65. Infra: adversarial prompt + secret exfil tests
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:security,component:infra,phase:5,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 5 | **Risk:** High

Create tests attempting secret exfiltration and unauthorized actions.

Acceptance Criteria:
- All denied
- Logged appropriately

---
## 66. Docs: AI safety policy + operator guidance
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:docs,component:docs,phase:5,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 5 | **Risk:** Low

Document AI limits, consent model, and data handling.

Acceptance Criteria:
- Enterprise acceptable
- Clear operator expectations

---
## 67. UX: micro-interaction pack for incidents + wizard
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:feature,component:web,phase:5,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 5 | **Risk:** Medium

Implement motion pack with reduced-motion fallback and perf budget.

Acceptance Criteria:
- Accessible
- No jank

---
## 68. Fallback: AI-unavailable mode (runbooks + diagnostics diff)
- **Milestone:** Phase 5 — AI Help
- **Labels:** type:feature,component:web,phase:5,priority:P3
- **Priority:** P3 | **Component:** Web | **Phase:** Phase 5 | **Risk:** Low

When AI not available, show deterministic troubleshooting and diffs.

Acceptance Criteria:
- No dead ends
- Clear next steps

---
## 69. Remote: TLS enforcement + cert validation
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:security,component:agent,phase:6,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 6 | **Risk:** High

Block remote mode without TLS; validate cert and warn on weak config.

Acceptance Criteria:
- Remote mode cannot start without TLS
- Cert rotation supported

---
## 70. Remote: optional mTLS
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:security,component:agent,phase:6,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 6 | **Risk:** High

Implement optional mTLS for enterprise deployments.

Acceptance Criteria:
- Client cert enrollment
- Revocation plan

---
## 71. Fleet: node registry model + persistence
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:feature,component:agent,phase:6,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 6 | **Risk:** Medium

Implement node registry supporting tags/environments.

Acceptance Criteria:
- Stable node IDs
- Persisted registry

---
## 72. Web: fleet selector + global dashboard
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:feature,component:web,phase:6,priority:P1
- **Priority:** P1 | **Component:** Web | **Phase:** Phase 6 | **Risk:** Medium
- **Depends on:** Fleet: node registry model + persistence

Add node selector and global health view.

Acceptance Criteria:
- Fast switching
- Last-used node persisted

Depends on: Fleet: node registry model + persistence

---
## 73. RBAC: Owner/Admin/Viewer roles + enforcement
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:security,component:agent,phase:6,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 6 | **Risk:** High

Implement RBAC and gate operations endpoints.

Acceptance Criteria:
- Viewer read-only
- Audit records actor

---
## 74. Web: RBAC user management UI
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:feature,component:web,phase:6,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 6 | **Risk:** Medium
- **Depends on:** RBAC: Owner/Admin/Viewer roles + enforcement

Admin UI to manage users and roles.

Acceptance Criteria:
- Invites/disable
- Role changes audited

Depends on: RBAC: Owner/Admin/Viewer roles + enforcement

---
## 75. Relay: E2EE design doc + prototype (optional)
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:security,component:infra,phase:6,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 6 | **Risk:** High

Design and prototype relay that cannot read payloads.

Acceptance Criteria:
- Key exchange defined
- Threat model updated

---
## 76. Mobile: fleet node list + optional push for alerts
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:feature,component:mobile,phase:6,priority:P3
- **Priority:** P3 | **Component:** Mobile | **Phase:** Phase 6 | **Risk:** Medium

Add fleet list and opt-in push channel for alerts.

Acceptance Criteria:
- Rate limited
- Opt-in

---
## 77. Audit: cross-node aggregation + export
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:feature,component:web,phase:6,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 6 | **Risk:** Low

Aggregate audit logs across nodes and export reports.

Acceptance Criteria:
- Filterable by node
- CSV export

---
## 78. Security: pen-test checklist + remediation workflow
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:docs,component:docs,phase:6,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 6 | **Risk:** Medium

Create pen-test checklist and remediation tracking procedure.

Acceptance Criteria:
- Stored in docs
- Findings become issues

---
## 79. Web: optional MFA (TOTP) for console sign-in
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:security,component:web,phase:6,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 6 | **Risk:** High

Add optional MFA if auth backend exists.

Acceptance Criteria:
- Enrollment + recovery codes
- Documented

---
## 80. Packaging: macOS signed pkg + notarization
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:security,component:infra,phase:7,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 7 | **Risk:** High

Create macOS installer and signing/notarization workflow.

Acceptance Criteria:
- Reproducible build
- Verified signature

---
## 81. Packaging: Linux deb/rpm packages
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:feature,component:infra,phase:7,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 7 | **Risk:** High

Create deb/rpm packaging and publishing workflows.

Acceptance Criteria:
- Clean install/uninstall
- Service management

---
## 82. Auto-update: safe update channel + rollback
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:security,component:agent,phase:7,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 7 | **Risk:** High

Implement agent auto-update with staged rollout and rollback.

Acceptance Criteria:
- Can disable
- Rollback on failure

---
## 83. Observability: OpenTelemetry (optional exporters)
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:feature,component:agent,phase:7,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 7 | **Risk:** Medium

Instrument agent with OTel traces/metrics; default off.

Acceptance Criteria:
- Low overhead
- Documented

---
## 84. Docs: enterprise security posture baseline (SOC2-ready checklist)
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:docs,component:docs,phase:7,priority:P1
- **Priority:** P1 | **Component:** Docs | **Phase:** Phase 7 | **Risk:** Medium

Document baseline controls for compliance readiness.

Acceptance Criteria:
- Access controls
- Logging
- IR
- Change mgmt

---
## 85. IR: incident response plan + severity matrix + templates
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:docs,component:docs,phase:7,priority:P1
- **Priority:** P1 | **Component:** Docs | **Phase:** Phase 7 | **Risk:** Low

Create IR plan and templates (comms + postmortem).

Acceptance Criteria:
- Clear roles
- Clear steps

---
## 86. Infra: load tests (logs stream + metrics) and leak checks
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:chore,component:infra,phase:7,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 7 | **Risk:** High

Load test streaming endpoints; verify no leaks and meets latency targets.

Acceptance Criteria:
- Concurrency stable
- Leak-free

---
## 87. UX: accessibility audit + reduced-motion validation
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:chore,component:web,phase:7,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 7 | **Risk:** Medium

Audit web/mobile accessibility and remediate issues.

Acceptance Criteria:
- WCAG-aligned
- Reduced motion honored

---
## 88. Release: SBOM generation + signed artifacts
- **Milestone:** Phase 7 — Hardening
- **Labels:** type:security,component:infra,phase:7,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 7 | **Risk:** High

Generate SBOM and sign release artifacts.

Acceptance Criteria:
- SBOM published
- Signatures verifiable

---
## 89. Docs: ADR template + decision log
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:docs,phase:1,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 1 | **Risk:** Medium

Create ADR template and start decision log.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 90. Infra: pre-commit hooks (format/lint/secret scan)
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Add pre-commit hooks to prevent drift and secret commits.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 91. SDK: typed error parsing helpers
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:sdk,phase:2,priority:P2
- **Priority:** P2 | **Component:** SDK | **Phase:** Phase 2 | **Risk:** Medium

Add helpers for consistent API error parsing across clients.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 92. Web: skeleton loading states + optimistic updates
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium

Implement consistent skeletons and optimistic UI patterns.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 93. Mobile: offline caching for status
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:mobile,phase:3,priority:P2
- **Priority:** P2 | **Component:** Mobile | **Phase:** Phase 3 | **Risk:** Medium

Cache last-known status/metrics for offline view.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 94. Agent: config diff endpoint for apply preview
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** Medium

Add endpoint that returns config diff before apply.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 95. Security: runtime secret-leak detector for logs
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium

Detect likely secrets in logs and warn user.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 96. Web: theming system + brand tokens
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium

Implement theme tokens for enterprise brandability.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 97. Mobile: biometric lock option
- **Milestone:** Phase 6 — Remote + Fleet
- **Labels:** type:feature,component:mobile,phase:6,priority:P2
- **Priority:** P2 | **Component:** Mobile | **Phase:** Phase 6 | **Risk:** Medium

Add optional biometric lock for the app.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 98. Infra: containerized dev environment (docker-compose)
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Provide docker-compose for local dev of web+agent.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 99. Docs: API usage examples + troubleshooting
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:docs,phase:1,priority:P2
- **Priority:** P2 | **Component:** Docs | **Phase:** Phase 1 | **Risk:** Medium

Add API examples and troubleshooting guide.

Acceptance Criteria:
- Implemented
- Documented/tests added where relevant

---
## 100. API /health: agent handler + validation
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Low

Implement the API handler for `/health` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 101. API /health: contract tests + fixtures
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/health`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 102. UI integrate /health: web + mobile wiring + UX states
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium

Integrate `/health` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 103. API /pair/start: agent handler + validation
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** High

Implement the API handler for `/pair/start` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 104. API /pair/start: contract tests + fixtures
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/pair/start`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 105. UI integrate /pair/start: web + mobile wiring + UX states
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium

Integrate `/pair/start` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 106. API /pair/confirm: agent handler + validation
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** High

Implement the API handler for `/pair/confirm` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 107. API /pair/confirm: contract tests + fixtures
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/pair/confirm`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 108. UI integrate /pair/confirm: web + mobile wiring + UX states
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium

Integrate `/pair/confirm` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 109. API /system/info: agent handler + validation
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Low

Implement the API handler for `/system/info` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 110. API /system/info: contract tests + fixtures
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/system/info`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 111. UI integrate /system/info: web + mobile wiring + UX states
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium

Integrate `/system/info` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 112. API /moltbot/status: agent handler + validation
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:agent,phase:1,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 1 | **Risk:** Medium

Implement the API handler for `/moltbot/status` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 113. API /moltbot/status: contract tests + fixtures
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/moltbot/status`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 114. UI integrate /moltbot/status: web + mobile wiring + UX states
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:web,phase:1,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 1 | **Risk:** Medium

Integrate `/moltbot/status` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 115. API /install/local: agent handler + validation
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Implement the API handler for `/install/local` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 116. API /install/local: contract tests + fixtures
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:chore,component:infra,phase:2,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 2 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/install/local`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 117. UI integrate /install/local: web + mobile wiring + UX states
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium

Integrate `/install/local` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 118. API /install/ssh: agent handler + validation
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Implement the API handler for `/install/ssh` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 119. API /install/ssh: contract tests + fixtures
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:chore,component:infra,phase:2,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 2 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/install/ssh`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 120. UI integrate /install/ssh: web + mobile wiring + UX states
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium

Integrate `/install/ssh` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 121. API /config/validate: agent handler + validation
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** Medium

Implement the API handler for `/config/validate` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 122. API /config/validate: contract tests + fixtures
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:chore,component:infra,phase:2,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 2 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/config/validate`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 123. UI integrate /config/validate: web + mobile wiring + UX states
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium

Integrate `/config/validate` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 124. API /config/apply: agent handler + validation
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:agent,phase:2,priority:P1
- **Priority:** P1 | **Component:** Agent | **Phase:** Phase 2 | **Risk:** High

Implement the API handler for `/config/apply` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 125. API /config/apply: contract tests + fixtures
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:chore,component:infra,phase:2,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 2 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/config/apply`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 126. UI integrate /config/apply: web + mobile wiring + UX states
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:feature,component:web,phase:2,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 2 | **Risk:** Medium

Integrate `/config/apply` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 127. API /logs/tail: agent handler + validation
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium

Implement the API handler for `/logs/tail` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 128. API /logs/tail: contract tests + fixtures
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:chore,component:infra,phase:3,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 3 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/logs/tail`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 129. UI integrate /logs/tail: web + mobile wiring + UX states
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium

Integrate `/logs/tail` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 130. API /logs/stream: agent handler + validation
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** High

Implement the API handler for `/logs/stream` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 131. API /logs/stream: contract tests + fixtures
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:chore,component:infra,phase:3,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 3 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/logs/stream`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 132. UI integrate /logs/stream: web + mobile wiring + UX states
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium

Integrate `/logs/stream` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 133. API /metrics/current: agent handler + validation
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P3
- **Priority:** P3 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Low

Implement the API handler for `/metrics/current` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 134. API /metrics/current: contract tests + fixtures
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:chore,component:infra,phase:3,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 3 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/metrics/current`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 135. UI integrate /metrics/current: web + mobile wiring + UX states
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium

Integrate `/metrics/current` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 136. API /alerts/rules: agent handler + validation
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** High

Implement the API handler for `/alerts/rules` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 137. API /alerts/rules: contract tests + fixtures
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:chore,component:infra,phase:3,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 3 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/alerts/rules`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 138. UI integrate /alerts/rules: web + mobile wiring + UX states
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium

Integrate `/alerts/rules` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 139. API /ops/action: agent handler + validation
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:agent,phase:4,priority:P0
- **Priority:** P0 | **Component:** Agent | **Phase:** Phase 4 | **Risk:** High

Implement the API handler for `/ops/action` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 140. API /ops/action: contract tests + fixtures
- **Milestone:** Phase 4 — Operations
- **Labels:** type:chore,component:infra,phase:4,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 4 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/ops/action`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 141. UI integrate /ops/action: web + mobile wiring + UX states
- **Milestone:** Phase 4 — Operations
- **Labels:** type:feature,component:web,phase:4,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 4 | **Risk:** Medium

Integrate `/ops/action` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 142. API /support/bundle: agent handler + validation
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:agent,phase:3,priority:P2
- **Priority:** P2 | **Component:** Agent | **Phase:** Phase 3 | **Risk:** Medium

Implement the API handler for `/support/bundle` exactly per OpenAPI.

Outcome:
- Route exists and matches the OpenAPI request/response schema
- Validation rejects invalid payloads with consistent error envelope
- Structured logs (redacted) and audit event where applicable

Acceptance Criteria:
- ✅ Unit tests for success + primary error cases
- ✅ Contract tests (wire-level) pass
- ✅ No secrets in logs or error messages

---
## 143. API /support/bundle: contract tests + fixtures
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:chore,component:infra,phase:3,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 3 | **Risk:** Medium

Add deterministic contract tests and fixtures for `/support/bundle`.

Outcome:
- Fixtures cover happy-path and edge-cases
- Tests run in CI and prevent spec drift

Acceptance Criteria:
- ✅ Tests fail if response schema changes
- ✅ Golden fixtures stored (redacted) under `tests/fixtures/`
- ✅ CI job reports coverage for this endpoint

---
## 144. UI integrate /support/bundle: web + mobile wiring + UX states
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:feature,component:web,phase:3,priority:P2
- **Priority:** P2 | **Component:** Web | **Phase:** Phase 3 | **Risk:** Medium

Integrate `/support/bundle` into clients with consistent UX states.

Outcome:
- Web UI uses SDK client, handles loading/error/empty states
- Mobile wiring where relevant (status surfaces, quick actions)
- All failures map to human-readable recovery guidance

Acceptance Criteria:
- ✅ Web: loading/empty/error states are explicit and accessible
- ✅ Telemetry event for success/failure paths (privacy-safe)
- ✅ No UI jank under streaming/polling where applicable

---
## 145. Test harness: mock MoltBot runtime (deterministic)
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:chore,component:infra,phase:1,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** High

Create a deterministic mock MoltBot runtime for local development and CI.

Outcome:
- A single command spins up a fake runtime with predictable status/logs/metrics
- Used by contract + e2e tests to prevent flaky debugging

Acceptance Criteria:
- ✅ Supports toggling scenarios (healthy, crash-loop, gateway-down)
- ✅ Produces stable fixtures for /logs/* and /metrics/current
- ✅ Documented usage in docs/07-test-strategy.md

---
## 146. E2E: wizard golden path (local docker) with screenshots/log capture
- **Milestone:** Phase 2 — Setup Wizard
- **Labels:** type:chore,component:infra,phase:2,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 2 | **Risk:** High

Add end-to-end test for the setup wizard using the docker install path.

Outcome:
- CI executes full wizard flow against mock runtime and/or ephemeral agent
- Captures logs and (optional) screenshots on failure

Acceptance Criteria:
- ✅ Passes reliably in CI
- ✅ Failure artifacts uploaded to CI as downloadable bundle
- ✅ Covers retry behavior for a transient failure

---
## 147. E2E: monitoring golden path (logs stream + alerts) under load
- **Milestone:** Phase 3 — Monitoring
- **Labels:** type:chore,component:infra,phase:3,priority:P1
- **Priority:** P1 | **Component:** Infra | **Phase:** Phase 3 | **Risk:** High

Add e2e test for monitoring functions under load.

Outcome:
- Validates SSE reconnect, paging, alerts evaluation loop
- Prevents regressions that lead to hard-to-debug production issues

Acceptance Criteria:
- ✅ Simulates 200+ log lines/min for 5 minutes without memory leak
- ✅ SSE reconnect works and does not duplicate data
- ✅ Alerts fire once (debounced) and appear in UI

---
## 148. DX: devcontainer + one-command bootstrap (web+agent+mock)
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:feature,component:infra,phase:1,priority:P2
- **Priority:** P2 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** Medium

Provide a devcontainer and a single bootstrap command to run web+agent+mock.

Outcome:
- New contributor can run the stack in <10 minutes
- Eliminates machine-specific debugging

Acceptance Criteria:
- ✅ `make dev` (or equivalent) works on a fresh machine
- ✅ Ports and env vars documented
- ✅ Includes preconfigured lint/test commands

---
## 149. Security gate: secret scanning + dependency audit enforced in PRs
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:security,component:infra,phase:1,priority:P0
- **Priority:** P0 | **Component:** Infra | **Phase:** Phase 1 | **Risk:** High

Enforce secret scanning and dependency audits in PRs.

Outcome:
- PRs blocked if secrets are detected or critical CVEs found

Acceptance Criteria:
- ✅ Secret scanner runs on push + PR
- ✅ Dependency audit fails on critical severity (configurable)
- ✅ Triage instructions included in docs/02-security.md

---
## 150. Codex brief: implementation guardrails + anti-mire checklist
- **Milestone:** Phase 1 — Foundations
- **Labels:** type:docs,component:docs,phase:1,priority:P1
- **Priority:** P1 | **Component:** Docs | **Phase:** Phase 1 | **Risk:** Medium

Write a Codex-facing implementation brief that prevents “debugging mire”.

Must include:
- Strict adherence to OpenAPI contract
- Deterministic mocks + golden path tests first
- “No side-effects without explicit confirmation” rule for ops
- Logging redaction requirements
- Review checkpoints and Definition of Done

Acceptance Criteria:
- ✅ Saved as docs/08-codex-delivery-brief.md
- ✅ Includes copy/paste prompts for Codex per phase

---
