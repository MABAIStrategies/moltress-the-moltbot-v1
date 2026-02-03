$ErrorActionPreference = "Stop"

pnpm install
pnpm run gates:phase01

Write-Host "`nBoot dev stack with: pnpm run dev:all"
