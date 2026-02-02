# GitHub Project v2 Bootstrap (GraphQL + gh CLI)

This repo provides scripts/templates to bootstrap:
- Labels
- Milestones
- A GitHub Project v2 with core fields

## Prereqs
- `gh` CLI installed and authenticated
- `python3`, `jq`
- Token scopes:
  - `repo`
  - `project`
  - `read:org` (if org-owned project)

## Limitations (be aware)
GitHub Projects v2 APIs can change; and some "views" / automation rules are only configurable via UI depending on org settings.
This package includes:
- A script to create the project and fields
- JSON to apply labels + milestones
- A post-create checklist to configure views/automation quickly in the UI

Run:
1) `bash project/gh-bootstrap.sh --owner <OWNER> --repo <REPO> --project "MoltBot Ops — Delivery"`
2) Follow the post-create checklist output
