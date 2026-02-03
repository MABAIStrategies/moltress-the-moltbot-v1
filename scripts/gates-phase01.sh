#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "FAILED: $1"
  echo "REMEDIATION: $2"
  exit 1
}

step() {
  echo "==> $1"
}

step "OpenAPI lint"
if ! pnpm openapi:lint; then
  fail "OpenAPI lint" "Fix api/openapi.yaml to pass validation."
fi

step "SDK generate"
if ! pnpm openapi:gen; then
  fail "SDK generation" "Regenerate SDK and commit updated clients."
fi

step "Typecheck"
if ! pnpm typecheck; then
  fail "Typecheck" "Resolve TypeScript errors."
fi

step "Lint"
if ! pnpm lint; then
  fail "Lint" "Fix lint errors or update lint rules."
fi

step "Format check"
if ! pnpm format:check; then
  fail "Format check" "Run pnpm format and commit formatting changes."
fi

step "Unit tests"
if ! pnpm test:unit; then
  fail "Unit tests" "Fix failing unit tests."
fi

step "Contract tests"
if ! pnpm test:contract; then
  fail "Contract tests" "Ensure responses match OpenAPI schema."
fi

step "E2E tripwire"
if ! pnpm test:e2e; then
  fail "E2E tripwire" "Fix golden path flow (pair -> token -> system/info -> status -> logs/tail)."
fi

step "Dependency audit"
if ! pnpm audit --audit-level=high; then
  fail "Dependency audit" "Resolve high severity dependency issues."
fi

step "Secret scan"
if ! pnpm secret:scan; then
  fail "Secret scan" "Remove secrets from repo and rotate compromised credentials."
fi
