#!/usr/bin/env bash
set -euo pipefail

patterns=(
  "AKIA[0-9A-Z]{16}"
  "ASIA[0-9A-Z]{16}"
  "-----BEGIN(.*?)PRIVATE KEY-----"
  "sk-[A-Za-z0-9]{20,}"
  "xox[baprs]-[A-Za-z0-9-]{10,}"
  "ghp_[A-Za-z0-9]{20,}"
  "gho_[A-Za-z0-9]{20,}"
)

matches=0
for pattern in "${patterns[@]}"; do
  if rg --hidden --no-heading --line-number --pcre2 "$pattern" .; then
    matches=1
  fi
done

if [ "$matches" -ne 0 ]; then
  echo "Secret patterns detected."
  exit 1
fi
