# Security (Enterprise-grade defaults)

## Authentication
- Pairing flow with short-lived pairing code
- Session tokens: short-lived access token + refresh token (optional)
- Token storage:
  - Mobile: Secure Enclave/Keychain
  - Web: httpOnly cookies (if server-rendered) or encrypted storage

## Authorization
- RBAC (Phase 6): Owner / Admin / Viewer
- Fine-grained permissions for:
  - read: status/logs/metrics
  - write: config changes
  - actions: restart/upgrade/rollback

## Transport security
- Local mode: loopback only
- Remote mode: TLS required
- Optional mTLS for enterprise deployments

## Secrets management
- Never store secrets in plaintext
- Prefer OS keychain (macOS Keychain, Linux secret service, Windows DPAPI)
- Backup bundles encrypted (AES-GCM) and user-owned keys

## Logging & privacy
- Redaction pipeline: remove API keys, tokens, emails/phones (configurable)
- Support bundle: redacted by default, includes manifest of included items
- Audit log: append-only with cryptographic hash chain (optional)

## AI safety controls
- Grounding: AI only sees curated “context packet”
- Prompt injection: strip/escape untrusted strings; separate instructions vs data
- Data exfiltration: deny requests that ask for secrets or raw keys
