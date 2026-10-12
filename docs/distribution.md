# Independent public UI distribution

[日本語](distribution.ja.md)

The 0.10.0 package is a candidate, not a verified official release. Owner CI builds, tests and packs it, installs the actual TGZ with public dependencies in a separate consumer, checks public declarations/snapshots/types and component SSR, and retains `npm-candidate`. It imports no sibling source and uses no real account. The public-import playground rejects a different scope and executable declaration; UI scope is cache isolation, not authentication.

The fresh development consumer reuses the published localized-site 0.1.4 dependency-security tooling for Nuxt peer backports. That tooling is not a runtime dependency of the UI module. Business handlers, route authorization, durable state and native worker distribution remain host responsibilities.

Before first OIDC staging, the owner approves the exact main SHA/archive digest, establishes the npm package registration through the existing owner-authenticated bootstrap procedure and registers Trusted Publisher: GitHub organization `nuxtjp`, repository `declarative-ui`, workflow `publish-npm.yml`, environment `npm-public`. No new broad token or private registry is assumed. Initial registration may require npm本人確認; no real library release is claimed until the owner-approved OIDC stage becomes official.

Set `REGISTRY_SECURITY_APPROVED_SHA` to the reviewed main SHA. Dispatch `publish-npm.yml` with `expected-source-sha` and `expected-archive-sha256` matching the retained candidate. The job requires public main source, exact approval and OIDC context, repeats the independent consumer, verifies the digest and stages with provenance. The npm owner approves that exact stage with 2FA. Verify official bytes, source/workflow/run attestation and a fresh consumer before switching the interaction fixture to the registry version. Until then, its explicitly pinned public-source development checkout remains a documented exception.

Trusted Publisher registration and a successful OIDC stage do not independently prove that npm forbids every alternative token publishing path. Verify that policy separately. No site, worker service or real authority is activated by this runbook.
