# @nuxtjp/declarative-ui

[日本語](README.ja.md)

Render a declared interface and show typed interaction results in a Nuxt application.

## What you can do

- Validate declarations and exact SSR snapshots.
- Manage temporary form drafts and view subscriptions.

## Current scope

The host supplies routes, application handlers, authorization and durable state. UI declarations do not create authority.

Package distribution is not activated by this documentation. Use the checked-in source and the declared dependency versions; published availability must be verified separately.

## Getting started

The transport and interaction contracts use the published npm versions `@crowsi/interaction-transport` and `@zixcel/interaction`. No private registry or local TGZ is required for these dependencies. This UI package itself has not yet been published; build the source for development and fixture verification.

Use `pnpm@10.29.3` and the Node.js version declared in `engines` in `package.json`. Run from this repository:

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

## Examples and interface details

## Ownership

- Zixcel: resource/value/action/change contracts and typed application outcomes.
- Crowsi: HTTP/JSONL transport, queue limits, cancellation and connection failures.
- NuxtJP: declaration validation, capability registry, rendering, temporary form
  drafts and view subscription lifecycle.
- Host: authenticated scope, application handler, routes/scenes, business labels,
  adopted meaning references and durable facts.

Install @nuxt/ui and this Nuxt module. NuxtJpInteractionSurface accepts scope,
view and endpoint props. Its read/invoke/subscribe endpoint returns structured
outcomes. A successful read includes ViewSnapshot: declaration revision, scope,
cursor and unchanged Zixcel resources with exact contract/resource revisions.
useAsyncData transfers the initial result into hydration without a second client
initial read. Scope is a cache-isolation identity, not authentication.

NuxtJpInteractionView accepts a snapshot, busy state and feedback and emits typed
invoke requests for hosts using a separate lifecycle. Drafts are transient inputs,
not facts. Live changes preserve edits and original preconditions; required false
is a value rather than absence.

## Documentation and source

[Interface reference](docs/interface-reference.md)

[Usage guide](docs/getting-started.md)

[Implementation and public interfaces](src) · [Verification cases](test) · [Contributing](CONTRIBUTING.md) · [Security reporting](SECURITY.md) · [License](LICENSE) · [Attribution notices](NOTICE)

## Public distribution candidate

[Owner candidate/initial registration/OIDC stage runbook](docs/distribution.md) · [Public API playground](playground/public-api/demo.mjs). The owner CI installs the actual TGZ in an isolated consumer and checks public types, refusal and component SSR.

[OSS responsibility and source completion](docs/oss-source-contract.md) defines the supported package boundary and required acceptance. It does not declare unexecuted source, distribution or production checks complete.

Dependency updates: [repository policy](docs/dependency-updates.md).
Registry releases: [version tags and GitHub OIDC](docs/registry-release.md).
