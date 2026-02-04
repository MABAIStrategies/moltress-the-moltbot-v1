#!/usr/bin/env bash
set -euo pipefail

pnpm install
pnpm run gates:phase01

echo "\nBoot dev stack with: pnpm run dev:all"
