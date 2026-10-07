# devcontainer-builder-examples

Real, working `.devcontainer.json` examples for
[devcontainer-builder](https://github.com/DeepSpaceCartel/devcontainer-builder),
and functional-testing fixtures for it — **not** a Coder Workspace Template
(that lives in the main repo's
[`templates/coder-kubernetes/`](https://github.com/DeepSpaceCartel/devcontainer-builder/tree/main/templates/coder-kubernetes),
see its
[guide](https://github.com/DeepSpaceCartel/devcontainer-builder/blob/main/docs/guides/coder-workspace-template.md)).

## Examples, one per branch

| Branch | What it demonstrates |
|---|---|
| [`node`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/node) | A plain `image`-based `.devcontainer.json`, Node.js, standard location (`.devcontainer/devcontainer.json`). |
| [`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python) | Same shape, Python. |
| [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go) | Same shape, Go. |
| [`dockerfile`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/dockerfile) | The `build.dockerfile` form instead of `image` — a real, custom-built environment. |
| [`root-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/root-config) | `.devcontainer.json` at the repo **root**, not under `.devcontainer/` — a different valid config location entirely. |
| [`subfolder-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/subfolder-config) | **Negative (a real, documented gap).** `.devcontainer/<name>/devcontainer.json` — a spec-valid location `@devcontainers/cli` doesn't actually auto-discover; a build against this branch fails every time, regardless of the folder's name. |
| [`features-and-settings`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/features-and-settings) | [Dev Container Features](https://containers.dev/implementors/features/), `forwardPorts`, `postCreateCommand`, `hostRequirements`, `remoteEnv` — a richer, more realistic config than "just an image". |
| [`lifecycle-and-extensions`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/lifecycle-and-extensions) | A **local** Feature and `devcontainer.json` both contribute lifecycle commands (string, array and object forms) and VS Code extensions/settings — what `GET /devcontainer` merges. |
| [`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json) | **Negative.** No `.devcontainer.json` anywhere in the repo — what a `/build` request against it actually returns. |
| [`invalid-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/invalid-devcontainer-json) | **Negative.** A `.devcontainer.json` that exists but is malformed — what that actually returns, distinct from the missing-file case. |

Each branch is independent (no shared history with `main` or each other) —
that's deliberate: a branch is meant to be pointed at directly (as a
`repository`/`branch` pair in a `/build` request, or the Coder Workspace
Template's own **Branch** parameter), not browsed as a merged whole.

## Using one

Point devcontainer-builder at this repo and the branch you want. Pushing
anywhere real needs credentials for that registry — see each branch's own
`payload.json` and README for a concrete example
([Credential handling](https://github.com/DeepSpaceCartel/devcontainer-builder/blob/main/docs/concepts/credential-handling.md)
covers the full resolution order):

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "node",
  "image": { "registry": "ghcr.io/deepspacecartel" }
}
```

```bash
curl -s -X POST http://devcontainer-builder.internal:8080/build \
  -H 'Content-Type: application/json' \
  -d @payload.json
```

Or, from a Coder workspace created off `templates/coder-kubernetes`, just
use this repo's URL as the **Git repository** parameter and one of the
branches above as **Branch**.

## License

MIT (see [LICENSE](LICENSE)).
