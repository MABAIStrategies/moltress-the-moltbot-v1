# Repo Structure

A **turborepo-style** monorepo (works similarly with pnpm/yarn workspaces). The structure supports:
- Web console (Next.js)
- Mobile app (React Native)
- Ops Agent service (Go or Node)
- Shared SDK + UI component library
- Security/infra-as-code
- Docs & runbooks
- CI/CD + security gates

```text
moltbot-ops/
├─ apps/
│  ├─ web/                         # Next.js web console
│  │  ├─ src/
│  │  │  ├─ app/                   # Routes/pages
│  │  │  ├─ components/            # Page-level + domain components
│  │  │  ├─ lib/                   # api client, auth, utils
│  │  │  └─ styles/
│  │  ├─ public/
│  │  ├─ tests/                    # e2e + component tests
│  │  └─ package.json
│  └─ mobile/                      # React Native (Expo recommended)
│     ├─ src/
│     │  ├─ navigation/
│     │  ├─ screens/
│     │  ├─ components/
│     │  ├─ lib/
│     │  └─ theme/
│     ├─ assets/
│     ├─ tests/
│     └─ package.json
├─ packages/
│  ├─ agent/                       # Ops Agent service (Go OR Node)
│  │  ├─ cmd/agent/                # entrypoint
│  │  ├─ internal/
│  │  │  ├─ api/                   # handlers, middleware
│  │  │  ├─ auth/                  # pairing, tokens, RBAC
│  │  │  ├─ moltbot/               # detect/install/control MoltBot
│  │  │  ├─ config/                # schema, validate, apply
│  │  │  ├─ logs/                  # tail/stream/redact
│  │  │  ├─ metrics/               # host + app metrics
│  │  │  ├─ alerts/                # rules engine + notifiers
│  │  │  ├─ support/               # diagnostics bundle
│  │  │  ├─ audit/                 # immutable action log
│  │  │  └─ platform/              # os-specific adapters
│  │  ├─ scripts/                  # install/uninstall helpers
│  │  ├─ configs/                  # defaults + sample
│  │  ├─ openapi/                  # generated/checked artifacts
│  │  └─ README.md
│  ├─ sdk/                         # TypeScript SDK for the API (generated)
│  │  ├─ src/
│  │  └─ package.json
│  ├─ ui/                          # Shared UI components (web+mobile compatible subset)
│  │  ├─ src/
│  │  └─ package.json
│  └─ shared/                      # Shared types, schemas, validation
│     ├─ src/
│     └─ package.json
├─ api/
│  └─ openapi.yaml                 # Canonical API spec (source-of-truth)
├─ docs/
│  ├─ 00-product-brief.md
│  ├─ 01-architecture.md
│  ├─ 02-security.md
│  ├─ 03-ui-wireframes.md
│  ├─ 04-phased-plan.md
│  ├─ 05-runbooks.md
│  └─ 06-release-process.md
├─ infra/
│  ├─ local/                       # docker-compose, dev env
│  ├─ terraform/                   # optional cloud relay + web hosting
│  └─ k8s/                         # optional helm/kustomize
├─ project/
│  ├─ github-issues.csv            # Importable issues list
│  ├─ github-issues.md             # Human-readable issues
│  ├─ github-project.yaml          # Project blueprint (fields/views/workflow)
│  └─ gh-bootstrap.md              # How to stand up project/labels/milestones
├─ .github/
│  ├─ workflows/
│  │  ├─ ci.yml                    # build/test/lint
│  │  ├─ security.yml              # SAST/dep scan/secret scan
│  │  └─ release.yml               # versioning + artifacts
│  ├─ ISSUE_TEMPLATE/
│  └─ pull_request_template.md
├─ scripts/
│  ├─ dev-bootstrap.sh
│  ├─ gen-sdk.sh                   # generates SDK from openapi
│  └─ lint-openapi.sh
├─ skill.md                        # model-agnostic “project planner skill”
├─ LICENSE
└─ package.json
```

## Key principles
- **Single source of truth**: `api/openapi.yaml` drives SDK generation and server validation tests.
- **Security by default**: local-only + pairing tokens; remote access comes later behind strict controls.
- **Ops first**: monitoring + safe controls + rollback are product-defining features.
