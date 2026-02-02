# MoltBot Ops — Blueprint Package (Expanded)

This bundle is a **production-grade planning + scaffolding** package for building a unified:
- Setup Assistant (local + VPS)
- Monitor (status/logs/metrics/alerts)
- Operator console (safe controls, backups, upgrades, rollback)
- Grounded AI helper (propose actions; never auto-exec)

## Included artifacts
- Repo structure + architecture + security docs (`docs/`)
- OpenAPI 3.0 spec (`api/openapi.yaml`)
- UI wireframe map (`docs/03-ui-wireframes.md`)

- Motion + design system (`docs/09-motion-and-design-system.md`)
- Phased plan with embedded checkpoint reviews (`docs/04-phased-plan.md`)
- GitHub Issues:
  - Seed list: `project/github-issues.csv`
  - Expanded catalog (150): `project/github-issues-expanded.csv`
- GitHub Project v2:
  - Blueprint: `project/github-project.yaml`
  - Bootstrap scripts: `project/gh-bootstrap.sh`, `project/graphql/*.graphql`, `project/tools/*.py`
  - Labels + milestones JSON: `project/labels.json`, `project/milestones.json`
  - UI post-create checklist: `project/POST-CREATE-CHECKLIST.md`
- Model-agnostic planning skill: `skill.md`

## Quick start
1) Create an empty repo named `moltbot-ops`
2) Copy this package into it
3) (Optional) bootstrap GitHub:
   - `bash project/gh-bootstrap.sh --owner <OWNER> --repo <REPO> --project "MoltBot Ops — Delivery"`
4) Import issues from `project/github-issues-expanded.csv`
5) Add imported issues to the created Project

> Scripts require `gh`, `python3`, and `jq`.


## Implementation
- Start here: `IMPLEMENTATION_MASTER_PROMPT.md`

[README.md](https://github.com/user-attachments/files/25025766/README.md)
