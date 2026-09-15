# root-config

`.devcontainer.json` at the repo **root** — no `.devcontainer/` folder at
all. One of the two top-level locations the
[Dev Container spec](https://containers.dev/implementors/spec/#devcontainerjson)
recognizes (the other is `.devcontainer/devcontainer.json`, the [`node`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/node)/[`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python)/[`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go)
branches' shape) — devcontainer-builder finds either without any
`configPath` field on the request.

## Try it

Pushing anywhere real needs credentials for that registry — either
`registryCredentials` in the request (as below), or the service's own
ambient `registryAuth` if it's already configured with credentials for
`image.registry`:

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "root-config",
  "image": { "registry": "ghcr.io/deepspacecartel" },
  "registryCredentials": {
    "registry": "ghcr.io/deepspacecartel",
    "username": "<your-github-username>",
    "password": "<your-write:packages-scoped GitHub PAT>"
  }
}
```

```bash
curl -s -X POST http://devcontainer-builder.internal:8080/build \
  -H 'Content-Type: application/json' \
  -d @payload.json
```

## Other examples

- [`main`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/main) — index/overview
- [`node`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/node)
- [`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python)
- [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go)
- [`dockerfile`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/dockerfile) — the `build.dockerfile` form instead of `image`
- [`subfolder-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/subfolder-config) — `.devcontainer/<name>/devcontainer.json`
- [`features-and-settings`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/features-and-settings) — Features, `forwardPorts`, lifecycle commands, `hostRequirements`
- [`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json) — negative: no config at all
- [`invalid-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/invalid-devcontainer-json) — negative: malformed config
