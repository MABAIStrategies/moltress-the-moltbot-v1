# GitHub Project Post-Create Checklist (Views + Automation)

After running `project/gh-bootstrap.sh`, complete these steps in the GitHub UI.

## Create Views
1. **Board**
   - Layout: Board
   - Group by: **Status**
   - Filter: is:issue
2. **Roadmap**
   - Layout: Roadmap
   - Group by: **Phase**
3. **Triage**
   - Layout: Table
   - Columns: Title, Status, Phase, Component, Priority, Risk, Sprint
   - Sort: Priority asc, Risk desc

## Automation (Optional)
Depending on your GitHub org/project settings, configure:
- New item added -> Status=Backlog
- PR opened (linked) -> Status=Review
- PR merged -> Status=Done

If unavailable, enforce via process (PR template + weekly triage).

## Import Issues
- Full catalog: `project/github-issues-expanded.csv`
- Seed list: `project/github-issues.csv`

## Add Issues to Project
Select all issues -> “Add to project” -> choose your created project.

## Suggested cadence
- Weekly sprint planning (30 min)
- Mid-sprint checkpoint review (15 min)
- End-of-sprint demo + security checklist (30–45 min)
