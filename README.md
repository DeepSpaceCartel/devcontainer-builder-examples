# node

A plain `image`-based `.devcontainer.json` for Node.js — the simplest real
shape devcontainer-builder builds, at the standard location
(`.devcontainer/devcontainer.json`):
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json)
references `mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm`
directly (Microsoft's own image, not `docker.io/library/node`, so this
repeatedly-built example doesn't get caught in Docker Hub's anonymous
pull-rate limit).

## Try it

Pushing anywhere real needs credentials for that registry — either
`registryCredentials` in the request (as below), or the service's own
ambient `registryAuth` if it's already configured with credentials for
`image.registry`:

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "node",
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
- [`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python)
- [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go)
- [`dockerfile`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/dockerfile) — the `build.dockerfile` form instead of `image`
- [`root-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/root-config) — `.devcontainer.json` at the repo root
- [`subfolder-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/subfolder-config) — `.devcontainer/<name>/devcontainer.json`
- [`features-and-settings`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/features-and-settings) — Features, `forwardPorts`, lifecycle commands, `hostRequirements`
- [`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json) — negative: no config at all
- [`invalid-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/invalid-devcontainer-json) — negative: malformed config
