# @nuxtjp/declarative-ui

宣言した画面を描画し、操作結果と更新状態をNuxtアプリで表示できます。

## 利用前の確認

実装済みの範囲、必要な依存関係、検証コマンドを以下の英語説明に併記しています。操作・配備・公開は、それぞれの権限と設定を確認してから実施してください。

通信と操作契約の依存ライブラリは公式npmレジストリから取得します。UI自体の公開状況と、検証用fixtureのソース配置は以下に記載しています。

## 使い方

リポジトリ内のサンプル・スキーマ・実装を確認し、用途に必要な入力を明示して利用します。下記のGetting startedに、現行設定に対応する検証コマンドを示しています。

検証結果は実行した範囲だけを示します。未実装の機能、未設定の接続、配備環境の確認を合格扱いにしないでください。

## English

Render a declared interface and show typed interaction results in a Nuxt application.

## What you can do

- Validate declarations and exact SSR snapshots.
- Manage temporary form drafts and view subscriptions.

## Current scope

The host supplies routes, application handlers, authorization and durable state. UI declarations do not create authority.

Package distribution is not activated by this documentation. Use the checked-in source and the declared dependency versions; published availability must be verified separately.

## Getting started

The transport and interaction contracts use the published npm versions `@crowsi/interaction-transport@0.10.0` and `@zixcel/interaction@0.10.0`. No private registry or local TGZ is required for these dependencies. This UI package itself has not yet been published; build the source for development and fixture verification.

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
