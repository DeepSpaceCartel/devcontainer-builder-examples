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
| [`node`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/node) | A plain `image`-based `.devcontainer.json`, Node.js. |
| [`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python) | A plain `image`-based `.devcontainer.json`, Python. |
| [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go) | A plain `image`-based `.devcontainer.json`, Go. |
| [`dockerfile`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/dockerfile) | The `build.dockerfile` form instead of `image` — a real, custom-built environment. |

Each branch is independent (no shared history with `main` or each other) —
that's deliberate: a branch is meant to be pointed at directly (as a
`repository`/`branch` pair in a `/build` request, or the Coder Workspace
Template's own **Branch** parameter), not browsed as a merged whole.

## Using one

Point devcontainer-builder at this repo and the branch you want:

```bash
curl -s -X POST http://devcontainer-builder.internal:8080/build \
  -H 'Content-Type: application/json' \
  -d '{
    "repository": "https://github.com/DeepSpaceCartel/devcontainer-builder-examples.git",
    "branch": "node",
    "image": { "registry": "ghcr.io/example" }
  }'
```

Or, from a Coder workspace created off `templates/coder-kubernetes`, just
use this repo's URL as the **Git repository** parameter and one of the
branches above as **Branch**.

## License

MIT (see [LICENSE](LICENSE)).
