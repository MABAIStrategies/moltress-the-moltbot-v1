#!/usr/bin/env bash
set -euo pipefail
pnpm exec swagger-cli validate api/openapi.yaml
