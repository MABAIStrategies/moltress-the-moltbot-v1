# Skill: GitHub Production Planner & Enterprise App Blueprint Writer

This skill produces a complete, production-grade project blueprint for a unified operations product that combines:
- Setup Assistant (local + VPS)
- Monitoring (status, logs, metrics, alerts)
- Operator Console (safe controls, backups, upgrades, rollback)
- Grounded AI Assistant (propose actions with evidence; never auto-exec)

It outputs enterprise-grade documentation and planning artifacts that can be handed to an implementation model or engineering team.

---

## Inputs

User may provide either:

1) **Existing production web app / partial repo**
   - Source code, infrastructure details, environment variables, and constraints.

2) **A new idea**
   - A free-form description of a product to be designed and planned.

---

## Outputs (Required Artifacts)

### 1) Full repository structure
- A canonical mono-repo layout including:
  - agent service
  - web console
  - mobile app (optional)
  - SDK generated from OpenAPI
  - docs, scripts, CI, and infra

### 2) Phased development plan with embedded checkpoint reviews
- Phases aligned to release outcomes:
  - Phase 1: Foundations (pairing/auth + read-only status)
  - Phase 2: Setup Wizard (deterministic install + config validation)
  - Phase 3: Monitoring (logs/metrics/alerts/support bundle)
  - Phase 4: Operations (safe controls + backups + upgrades + rollback)
  - Phase 5: AI Helper (grounded, propose-only)
  - Phase 6: Remote + Fleet (TLS/mTLS, RBAC, multi-node)
  - Phase 7: Hardening (packaging, SBOM, compliance posture)

Each phase includes:
- Gate criteria (tests, security checks, CI)
- Checkpoint code reviews (architecture + security + UX/perf)
- Definition of Done enforcement

### 3) API spec in OpenAPI format
- OpenAPI 3.0+ spec defining:
  - endpoints
  - auth/security schemes
  - request/response schemas
  - error envelope consistency
  - example payloads (redacted)

### 4) UI wireframe map
- Screen map with navigation, states, and component inventory:
  - pairing
  - overview
  - wizard steps
  - logs/metrics/alerts
  - operations center (confirmation flows)
  - AI helper and runbooks

### 5) Explicit task breakdown into GitHub Issues
- CSV for bulk import, each issue including:
  - milestone/phase
  - labels (component/type/priority/phase)
  - acceptance criteria
  - test plan references
  - dependencies (where applicable)

### 6) Full GitHub Project specification
- Project v2 blueprint:
  - core fields (Status, Phase, Component, Priority, Risk, Sprint)
  - view definitions (Board, Roadmap, Triage)
  - optional automation rules (if supported by org settings)
- Bootstrap scripts:
  - apply labels
  - create milestones
  - create project + fields (GraphQL via gh CLI)
  - post-create UI checklist

---

## Enterprise Quality Standards

### Security
- Deny-by-default auth middleware
- Rate limits on pairing endpoints
- Secure secret storage via OS primitives where possible
- Default log redaction (tokens/keys/PII)
- Confirmation-token flow for destructive actions
- Append-only audit log with export capability
- SBOM + signed artifacts for releases (Phase 7)

### Reliability
- Deterministic mock runtime + scenario toggles
- Golden fixtures and normalized timestamps
- Contract tests derived from OpenAPI
- E2E golden paths for wizard and monitoring
- CI gates prevent regressions and drift

### UX / Motion
- Premium interactions with reduced-motion fallback
- Virtualized long lists (logs)
- Clear error recovery guidance
- Performance budgets enforced

### Portability
- Implementation language/runtime flexible
- Build scripts and docs designed to support multiple stacks
- Containerized dev environment recommended

---

## First-shot reliability policy (“No Debugging Mire”)

To reduce the probability of getting stuck:
- Generate endpoint-level tasks from OpenAPI:
  - handler + validation
  - contract tests + fixtures
  - client wiring + UX states
- Require deterministic mocks and golden path tests before feature expansion
- Enforce CI gating on:
  - spec linting
  - contract tests
  - secret scanning and dependency audit
  - e2e golden paths for critical flows
- Embed phase checkpoint reviews; do not proceed if gates are red

---

## Thread progression log (start → finish)

1) Evaluated reference apps (setup assistant + monitoring/operator console).
2) Defined a unified system architecture: agent + web console + optional mobile + SDK + docs + infra.
3) Produced full blueprint artifacts:
   - repo structure, phased plan, OpenAPI spec, wireframe map, GitHub issues + project spec
4) Added GitHub Project v2 bootstrapping:
   - GraphQL templates + scripts + post-create checklist
5) Expanded issue catalog to a high-granularity set designed for first-shot success:
   - endpoint-level issues derived from OpenAPI
   - deterministic mock runtime + e2e golden paths
6) Added implementation guardrails:
   - test strategy and Codex brief to prevent “debugging mire”
7) Delivered a master implementation prompt:
   - model-agnostic instruction packet to execute phases with gates and checkpoints

---

## Usage

Provide either:
- existing code/assets (repo, docs, screenshots, deployments), or
- a new idea

This skill returns a complete production blueprint package that can be executed directly by an implementation model or engineering team.
