# Release Process

## Branching
- main = always releasable
- short-lived feature branches
- release tags for agent binaries

## CI gates
- lint + unit tests
- OpenAPI contract tests
- secret scan
- dependency scan

## Versioning
- SemVer for agent
- synchronized API version in OpenAPI

## Release artifacts
- agent binary/packages
- SDK package
- web deploy
- mobile build
