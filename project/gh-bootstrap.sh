#!/usr/bin/env bash
set -euo pipefail

OWNER=""
REPO=""
PROJECT_TITLE="MoltBot Ops — Delivery"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --owner) OWNER="$2"; shift 2 ;;
    --repo) REPO="$2"; shift 2 ;;
    --project) PROJECT_TITLE="$2"; shift 2 ;;
    *) echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

if [[ -z "$OWNER" || -z "$REPO" ]]; then
  echo "Missing required args. Example:"
  echo "  bash project/gh-bootstrap.sh --owner <OWNER> --repo <REPO> --project "MoltBot Ops — Delivery""
  exit 1
fi

command -v gh >/dev/null 2>&1 || { echo "gh CLI required"; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "jq required"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "python3 required"; exit 1; }

echo "==> Bootstrapping labels..."
python3 project/tools/apply_labels.py --owner "$OWNER" --repo "$REPO" --labels project/labels.json

echo "==> Bootstrapping milestones..."
python3 project/tools/apply_milestones.py --owner "$OWNER" --repo "$REPO" --milestones project/milestones.json

echo "==> Creating Project v2..."
OWNER_ID=$(gh api graphql -f query=@project/graphql/00-get-owner-id.graphql -f owner="$OWNER" --jq '.data.repositoryOwner.id')
PROJECT_JSON=$(gh api graphql -f query=@project/graphql/01-create-project.graphql -f ownerId="$OWNER_ID" -f title="$PROJECT_TITLE" --jq '.data.createProjectV2.projectV2')
PROJECT_ID=$(echo "$PROJECT_JSON" | jq -r '.id')
PROJECT_URL=$(echo "$PROJECT_JSON" | jq -r '.url')

echo "Project created: $PROJECT_URL"

echo "==> Creating Project fields..."
python3 project/tools/create_project_fields.py --project-id "$PROJECT_ID"

cat <<EOF

==> Post-create checklist
See: project/POST-CREATE-CHECKLIST.md

==> Next
- Import issues: project/github-issues-expanded.csv
- Add issues to the project at: $PROJECT_URL

EOF
