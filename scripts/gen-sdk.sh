#!/usr/bin/env bash
set -euo pipefail
pnpm exec openapi-typescript api/openapi.yaml -o packages/sdk/src/index.ts
