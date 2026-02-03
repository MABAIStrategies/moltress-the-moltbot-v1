# Architecture

## Components
1. **Ops Agent** (runs alongside MoltBot)
   - Local-first API (loopback only)
   - Optional remote mode behind TLS + auth
   - OS adapters for service management and filesystem access
2. **Clients**
   - Web Console (Next.js)
   - Mobile App (React Native)
3. **Optional Relay** (later)
   - Used only when user wants remote access without opening ports
   - Design target: relay cannot read payloads (E2EE)

## Data flows
- Pairing: device receives pairing code from agent, exchanges for session token
- Observability: agent streams logs + metrics to client
- Operations: client requests action → agent validates → logs audit → executes → verifies → returns result

## Threat model (summary)
- Primary: token theft, MITM, exposed ports, prompt injection, config/key exfiltration, log PII
- Controls: local-only default, short-lived tokens, OS keychain, TLS, RBAC, audit logs, log redaction, least privilege

## Design principle: “Propose, don’t execute”
AI can recommend and draft runbooks, but operator must approve any action.
