# Product Brief: MoltBot Ops

## What it is
A unified **installer + monitor + operator** for MoltBot-like services.

## Who it’s for
- Builders running a bot locally or on a VPS
- Teams that want **repeatable onboarding** and **operational confidence**
- Operators who need secure remote visibility without living in SSH

## Core value pillars
1. **Guided setup with guardrails** (local + cloud)
2. **Monitoring that is actionable** (logs, metrics, connection state)
3. **Safe operations** (start/stop/restart, upgrades, backups, rollback)
4. **AI help grounded in reality** (uses logs+state; no guessing)
5. **Enterprise security** (RBAC, audit trails, secrets hygiene, optional relay with E2EE)

## Non-goals (v1)
- “Auto-heal everything” without user confirmation
- Unbounded code execution via AI
- Exposing ports publicly by default

## Primary user flows
- First-time install (local)
- First-time install (VPS via SSH)
- Pair device
- Run validation
- Monitor health
- Troubleshoot with AI (grounded)
- Export support bundle
- Upgrade safely with rollback

## Success metrics
- Time-to-first-running: < 15 minutes local; < 30 minutes VPS
- 80% of incidents diagnosable without SSH
- Mean time to recover (MTTR) improved via rollback + runbooks
