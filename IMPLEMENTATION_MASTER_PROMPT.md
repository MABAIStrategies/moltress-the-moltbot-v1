# IMPLEMENTATION_MASTER_PROMPT — MoltBot Ops (Model-Agnostic)

You are an implementation agent responsible for delivering a production-grade unified “Setup + Monitor + Operator + AI Helper” system as defined by this repository.

## Inputs (from user)
User will provide either:
1) **Existing production app / partial repo** (code + configs + deployment details), OR
2) **A brand-new idea** (“let’s brainstorm”), which you must convert into a full production project plan and scaffolding following the repo conventions.

## Required Outputs
You MUST produce, maintain, and keep consistent:
- Working code (agent + web + optional mobile) following the repo structure
- A correct OpenAPI spec and generated clients
- Deterministic tests (unit + contract + e2e golden paths)
- CI that gates merges on quality/security
- Security posture and documentation suitable for enterprise review
- A GitHub issue plan aligned to phases/milestones

## Non-Negotiable Rules (Do Not Violate)
1) **OpenAPI is the contract.**
   - Implement endpoints exactly as in `api/openapi.yaml`.
   - If you need a change, propose a spec PR *first*, then implement after review.
   - Maintain schema validation and a consistent error envelope.

2) **No side effects without explicit user consent.**
   - Any destructive or operational action (install, apply config, restart, upgrade, restore, rollback) must require:
     - a short-lived confirmation token, AND
     - an explicit user approval in UI, AND
     - an audit record linking who/when/what/why (no secrets).

3) **Determinism first.**
   - Avoid “works on my machine” behavior:
     - Provide a deterministic mock runtime with scenario toggles.
     - Create golden fixtures and stable snapshots (normalize timestamps).
     - Prefer dockerized dev for consistency.

4) **Security by default.**
   - Log redaction enabled by default (tokens, keys, PII).
   - Rate-limit pairing endpoints.
   - Secure storage via OS keychain/secret store (with safe fallback).
   - Secret scanning + dependency audits enforced in CI.

5) **Stop if gates are red.**
   - Do not proceed to a later phase if contract tests, e2e golden paths, or security gates fail.
   - Fix failures before expanding scope.

## Repository Orientation (read before coding)
Read these docs first:
- `docs/01-repo-structure.md`
- `docs/02-security.md`
- `docs/04-phased-plan.md`
- `docs/07-test-strategy.md`
- `docs/08-codex-delivery-brief.md`
- `docs/09-motion-and-design-system.md` (UI motion/perf/accessibility)

## Execution Plan (Phase-Driven)
### Phase 0 — Bootstrap (must complete first)
- Ensure build works locally:
  - agent starts
  - web console starts
  - basic “hello” route responds
- CI enabled:
  - lint/format
  - unit tests
  - OpenAPI lint/contract tests scaffold
  - secret scan + dependency audit
- Generate SDK clients from OpenAPI and ensure the web imports them.

**Gate to pass Phase 0:**
- CI green; no secrets in repo; OpenAPI lint passes.

### Phase 1 — Minimal Vertical Slice (Read-only + Pairing)
Implement:
- `/health`
- `/pair/start`, `/pair/confirm` + auth middleware
- `/system/info`
- `/moltbot/status`
Web:
- pairing screen
- overview dashboard (read-only)

**Gates:**
- Contract tests for the above endpoints
- Pairing rate limits
- Token handling secured (no leakage)
- Basic accessibility and reduced-motion compliance

### Phase 2 — Setup Wizard (Deterministic Installation + Config)
Implement:
- job system (progress + cancel)
- install path (docker-first recommended)
- config schema + validate + apply with backups (stub ok here; full encryption Phase 4)
Web:
- wizard stepper
- install progress/logs
- schema-driven config builder

**Gates:**
- Deterministic mock runtime available for CI
- E2E golden path: install → validate → apply → verify
- Failure artifacts captured on CI failure

### Phase 3 — Monitoring (Logs/Metrics/Alerts/Support Bundle)
Implement:
- redaction pipeline (default on) + tests
- logs tail + logs streaming (SSE) with reconnect/backpressure
- metrics current
- alert rules CRUD
- support bundle generator (redacted + manifest)
Web:
- logs viewer
- metrics tiles/charts
- alerts UI
- “download support bundle” UX

**Gates:**
- E2E golden path: stream logs + reconnect + alert triggers once (debounced)
- Load test: logs streaming does not leak memory

### Phase 4 — Operations (Safe Controls + Backups + Upgrades + Rollback)
Implement:
- service manager abstraction (systemd/launchd/docker)
- `/ops/action` start/stop/restart with verification
- audit log (append-only; optional hash chain)
- encrypted backups (AES-GCM) + restore preflight
- staged upgrade with automatic rollback on verify failure
Web:
- operations center + confirmation flows
- audit viewer + export

**Gates:**
- Destructive actions always require confirmation token and UI approval
- Chaos test: fail upgrade mid-flight → rollback restores last-known-good

### Phase 5 — AI Helper (Grounded, Propose-Only)
Implement:
- context packet builder (strict redaction + size caps)
- runbook retrieval with citations (offline capable)
- response schema with evidence/confidence
- prompt injection defenses
Web:
- AI chat + action cards (approval required)
- runbook viewer integration

**Gates:**
- Security regression tests: exfil/prompt injection attempts denied
- AI never auto-executes actions

### Phase 6 — Remote + Fleet (Enterprise)
Implement:
- TLS enforcement + optional mTLS
- RBAC (Owner/Admin/Viewer) enforced server-side
- fleet node registry + web selector
- optional push alerts (opt-in)

**Gates:**
- Remote mode cannot start without TLS
- RBAC enforced for all ops endpoints

### Phase 7 — Hardening + Release
Implement:
- packaging (macOS signed/notarized; Linux deb/rpm)
- SBOM + signed artifacts
- optional OpenTelemetry instrumentation (default off)
- compliance posture docs (SOC2-ready checklist)

**Gates:**
- Release artifacts reproducible and signed
- Security posture doc complete

## Review Cadence (Checkpoint Reviews)
At the end of each phase:
- run full CI pipeline
- review OpenAPI drift (must be zero unless explicitly approved)
- review security checklist
- ensure e2e golden paths are green
- update docs and decision log (ADR) if any architectural decision changed

## Definition of Done (global)
An item is DONE only if:
- code merged with CI green
- tests added/updated (unit + contract + e2e where applicable)
- docs updated
- no secrets in logs; redaction rules updated if new fields introduced
- operational actions require explicit consent + audit record

## If user provides an existing repo
- First, map it into this repo structure.
- Then generate missing artifacts (OpenAPI, tests, CI gates).
- Only then refactor or add features.

## If user says “let’s brainstorm”
Produce:
- clear requirements
- threat model summary
- OpenAPI draft
- UI wireframe map
- full GitHub issue breakdown (phases + checkpoints)
- scaffolding repo with CI gates and a deterministic mock runtime



Here is the openai/yaml piece as well:
openapi: 3.0.3
info:
  title: MoltBot Ops Agent API
  version: 0.1.0
  description: >
    Local-first API for installing, configuring, monitoring, and operating MoltBot.
    Default deployment is loopback-only. Remote access must be explicitly enabled and secured.
servers:
  - url: http://127.0.0.1:7337
    description: Local agent (loopback only)
security:
  - bearerAuth: []
tags:
  - name: Pairing
  - name: System
  - name: MoltBot
  - name: Install
  - name: Config
  - name: Logs
  - name: Metrics
  - name: Alerts
  - name: Operations
  - name: Support

paths:
  /health:
    get:
      tags: [System]
      summary: Health check
      security: []
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Health"

  /pair/start:
    post:
      tags: [Pairing]
      summary: Start pairing and generate a short-lived pairing code
      security: []
      responses:
        "200":
          description: Pairing started
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PairStartResponse"

  /pair/confirm:
    post:
      tags: [Pairing]
      summary: Confirm pairing with code and mint session tokens
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PairConfirmRequest"
      responses:
        "200":
          description: Paired
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthTokens"
        "401":
          $ref: "#/components/responses/Unauthorized"

  /system/info:
    get:
      tags: [System]
      summary: Get host system information
      responses:
        "200":
          description: System info
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SystemInfo"

  /moltbot/status:
    get:
      tags: [MoltBot]
      summary: Get MoltBot service status and detected version/config path
      responses:
        "200":
          description: Status
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MoltBotStatus"

  /install/local:
    post:
      tags: [Install]
      summary: Install MoltBot locally using a supported method
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/InstallLocalRequest"
      responses:
        "202":
          description: Install started
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/JobAccepted"

  /install/ssh:
    post:
      tags: [Install]
      summary: Install MoltBot on a remote host over SSH (VPS path)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/InstallSshRequest"
      responses:
        "202":
          description: Install started
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/JobAccepted"

  /config/validate:
    post:
      tags: [Config]
      summary: Validate a proposed configuration without applying it
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ConfigValidateRequest"
      responses:
        "200":
          description: Validation result
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ConfigValidationResult"

  /config/apply:
    post:
      tags: [Config]
      summary: Apply configuration (creates backup first)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ConfigApplyRequest"
      responses:
        "200":
          description: Applied
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ConfigApplyResult"

  /logs/tail:
    get:
      tags: [Logs]
      summary: Get last N log lines (redacted by default)
      parameters:
        - in: query
          name: lines
          schema: { type: integer, minimum: 10, maximum: 5000, default: 200 }
        - in: query
          name: redact
          schema: { type: boolean, default: true }
      responses:
        "200":
          description: Log lines
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/LogTailResponse"

  /logs/stream:
    get:
      tags: [Logs]
      summary: Stream logs via Server-Sent Events (SSE)
      description: >
        SSE stream of log lines. Use EventSource in web clients.
        For mobile, consider a websocket variant in implementation.
      parameters:
        - in: query
          name: redact
          schema: { type: boolean, default: true }
      responses:
        "200":
          description: SSE stream
          content:
            text/event-stream:
              schema:
                type: string

  /metrics/current:
    get:
      tags: [Metrics]
      summary: Get current metrics snapshot
      responses:
        "200":
          description: Metrics snapshot
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MetricsSnapshot"

  /alerts/rules:
    get:
      tags: [Alerts]
      summary: List alert rules
      responses:
        "200":
          description: Rules
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AlertRules"
    post:
      tags: [Alerts]
      summary: Create or update an alert rule
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/AlertRule"
      responses:
        "200":
          description: Saved
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AlertRule"

  /ops/action:
    post:
      tags: [Operations]
      summary: Execute a safe operational action (requires confirmation token for destructive actions)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/OpsActionRequest"
      responses:
        "200":
          description: Result
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/OpsActionResult"

  /support/bundle:
    post:
      tags: [Support]
      summary: Generate a redacted support bundle (zip)
      requestBody:
        required: false
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SupportBundleRequest"
      responses:
        "200":
          description: Bundle metadata + download URL
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SupportBundleResponse"

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  responses:
    Unauthorized:
      description: Unauthorized
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"

  schemas:
    Health:
      type: object
      properties:
        status: { type: string, example: ok }
        time: { type: string, format: date-time }
      required: [status, time]

    PairStartResponse:
      type: object
      properties:
        pairing_code:
          type: string
          description: Short-lived code shown to user
          example: "482-119"
        expires_in_seconds:
          type: integer
          example: 180
      required: [pairing_code, expires_in_seconds]

    PairConfirmRequest:
      type: object
      properties:
        pairing_code: { type: string }
        device_name: { type: string }
      required: [pairing_code, device_name]

    AuthTokens:
      type: object
      properties:
        access_token: { type: string }
        expires_in_seconds: { type: integer }
        refresh_token: { type: string }
      required: [access_token, expires_in_seconds]

    SystemInfo:
      type: object
      properties:
        os: { type: string, example: macos }
        os_version: { type: string }
        arch: { type: string, example: arm64 }
        cpu_cores: { type: integer }
        memory_bytes: { type: integer }
        disk_free_bytes: { type: integer }
        hostname: { type: string }
      required: [os, os_version, arch, cpu_cores, memory_bytes, disk_free_bytes, hostname]

    MoltBotStatus:
      type: object
      properties:
        installed: { type: boolean }
        running: { type: boolean }
        version: { type: string, nullable: true }
        service_manager: { type: string, example: systemd }
        config_path: { type: string, nullable: true }
        last_start_time: { type: string, format: date-time, nullable: true }
        restart_count_24h: { type: integer, example: 0 }
        gateway_connected: { type: boolean, example: true }
      required: [installed, running, service_manager, gateway_connected]

    InstallLocalRequest:
      type: object
      properties:
        method:
          type: string
          enum: [brew, npm, docker]
        channel:
          type: string
          description: Release channel
          enum: [stable, beta, nightly]
          default: stable
      required: [method]

    InstallSshRequest:
      type: object
      properties:
        host: { type: string, example: 203.0.113.10 }
        port: { type: integer, default: 22 }
        username: { type: string }
        auth:
          type: object
          properties:
            type: { type: string, enum: [password, key] }
            password: { type: string, nullable: true }
            private_key_pem: { type: string, nullable: true }
          required: [type]
        method:
          type: string
          enum: [docker, native]
          default: docker
      required: [host, username, auth]

    JobAccepted:
      type: object
      properties:
        job_id: { type: string }
        status: { type: string, example: accepted }
      required: [job_id, status]

    ConfigValidateRequest:
      type: object
      properties:
        config:
          type: object
          additionalProperties: true
      required: [config]

    ConfigValidationResult:
      type: object
      properties:
        valid: { type: boolean }
        errors:
          type: array
          items: { $ref: "#/components/schemas/ConfigError" }
        warnings:
          type: array
          items: { $ref: "#/components/schemas/ConfigError" }
      required: [valid, errors, warnings]

    ConfigError:
      type: object
      properties:
        path: { type: string, example: "gateway.url" }
        message: { type: string }
        severity: { type: string, enum: [error, warning] }
      required: [path, message, severity]

    ConfigApplyRequest:
      type: object
      properties:
        config:
          type: object
          additionalProperties: true
        backup_before_apply:
          type: boolean
          default: true
      required: [config]

    ConfigApplyResult:
      type: object
      properties:
        applied: { type: boolean }
        backup_id: { type: string, nullable: true }
        next_steps:
          type: array
          items: { type: string }
      required: [applied, next_steps]

    LogTailResponse:
      type: object
      properties:
        lines:
          type: array
          items: { type: string }
        redacted: { type: boolean }
      required: [lines, redacted]

    MetricsSnapshot:
      type: object
      properties:
        cpu_percent: { type: number, format: float }
        mem_percent: { type: number, format: float }
        disk_free_bytes: { type: integer }
        uptime_seconds: { type: integer }
        restart_count_24h: { type: integer }
      required: [cpu_percent, mem_percent, disk_free_bytes, uptime_seconds, restart_count_24h]

    AlertRule:
      type: object
      properties:
        id: { type: string, nullable: true }
        name: { type: string }
        enabled: { type: boolean, default: true }
        condition:
          type: object
          properties:
            type:
              type: string
              enum: [gateway_disconnected, crash_loop, disk_low, auth_failures]
            threshold:
              type: integer
              nullable: true
          required: [type]
        notify:
          type: object
          properties:
            channels:
              type: array
              items:
                type: string
                enum: [in_app, email, webhook, push]
            webhook_url: { type: string, nullable: true }
            email: { type: string, nullable: true }
          required: [channels]
      required: [name, enabled, condition, notify]

    AlertRules:
      type: object
      properties:
        rules:
          type: array
          items: { $ref: "#/components/schemas/AlertRule" }
      required: [rules]

    OpsActionRequest:
      type: object
      properties:
        action:
          type: string
          enum: [start, stop, restart, upgrade, backup, restore, rollback]
        params:
          type: object
          additionalProperties: true
        confirmation_token:
          type: string
          nullable: true
      required: [action]

    OpsActionResult:
      type: object
      properties:
        ok: { type: boolean }
        message: { type: string }
        audit_event_id: { type: string }
        job_id: { type: string, nullable: true }
      required: [ok, message, audit_event_id]

    SupportBundleRequest:
      type: object
      properties:
        include_logs: { type: boolean, default: true }
        include_config_redacted: { type: boolean, default: true }
        include_metrics: { type: boolean, default: true }

    SupportBundleResponse:
      type: object
      properties:
        bundle_id: { type: string }
        download_url: { type: string }
        redacted: { type: boolean }
      required: [bundle_id, download_url, redacted]

    Error:
      type: object
      properties:
        code: { type: string, example: unauthorized }
        message: { type: string }
      required: [code, message]

