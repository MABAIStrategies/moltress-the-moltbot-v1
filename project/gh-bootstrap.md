# GitHub Bootstrap Guide (Labels, Milestones, Project)

This repo includes:
- `project/github-issues.csv` (bulk import)
- `project/github-project.yaml` (blueprint)

## Labels (recommended)
- component:agent
- component:web
- component:mobile
- component:sdk
- component:docs
- component:infra
- type:feature
- type:bug
- type:chore
- type:security
- priority:P0 / P1 / P2 / P3
- phase:1..7

## Milestones
- Phase 1 — Foundations
- Phase 2 — Setup Wizard
- Phase 3 — Monitoring
- Phase 4 — Operations
- Phase 5 — AI Help
- Phase 6 — Remote + Fleet
- Phase 7 — Hardening

## Project (GitHub Projects v2) blueprint
See `github-project.yaml` for:
- Fields (Status, Phase, Component, Priority, Risk)
- Views (Board, Roadmap, Triage)
- Automation rules (move to Review on PR, etc.)

> If you want automation via CLI, use the GitHub Projects UI or a GraphQL script.
> This blueprint is designed to be easy to recreate manually in < 20 minutes.
