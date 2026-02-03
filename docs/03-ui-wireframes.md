# UI Wireframe Map (Web + Mobile)

## Web IA (Information Architecture)
```text
[Auth/Pair]
  └─ Pair Device (scan code / enter code)
[Overview]
  ├─ Node Selector (single-node in v1; fleet later)
  ├─ Health Summary (tiles: gateway, uptime, cpu, mem, disk, alerts)
  ├─ Recent Events (audit log snippet)
  └─ Quick Actions (restart, export bundle)
[Setup Wizard]
  ├─ Choose Setup (Local / VPS / Docker)
  ├─ Prerequisites Check
  ├─ Install
  ├─ Configure
  ├─ Validate
  ├─ Run
  └─ Setup Report (download)
[Monitor]
  ├─ Status
  ├─ Logs (tail + search + filters)
  ├─ Metrics (graphs)
  └─ Alerts (rules + history)
[Operate]
  ├─ Service Control (start/stop/restart)
  ├─ Upgrade (preflight + backup + execute + verify)
  ├─ Backups (create/restore)
  └─ Rollback (guided)
[AI Help]
  ├─ Chat (grounded)
  ├─ Suggested Fixes (ranked)
  ├─ Proposed Actions (confirm to execute)
  └─ Runbooks (search)
[Support]
  ├─ Export Support Bundle
  ├─ Copy Support Template
  └─ System Diagnostics
[Admin] (Phase 6)
  ├─ Users & Roles
  ├─ Security Settings
  └─ Audit Log
```

## Mobile Navigation
- Bottom tabs:
  1. **Connect**
  2. **Status**
  3. **Help (AI + FAQ)**

### Mobile screens
- Connect
  - Pairing code entry / QR scan
  - Saved nodes list
- Status
  - Health ring + status tiles
  - Alerts list
  - Logs (compact tail)
- Help
  - FAQ
  - AI chat
  - Export support bundle

## Interaction + animation principles (hyper-magnificent but disciplined)
- Use motion to communicate state transitions:
  - Setup step completion = subtle “progress pulse”
  - Connection lost = gentle shake + red accent, with immediate “next action”
- Prefer **micro-interactions** over large animations:
  - button press, card expand, toast confirmations, inline validation
- Support dark mode and reduced-motion accessibility
- Web: Framer Motion; Mobile: Reanimated/Moti
