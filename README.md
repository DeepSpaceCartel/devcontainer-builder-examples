# dockerfile

The `build.dockerfile` form of `.devcontainer.json` instead of a plain
`image` reference — a real, custom-built environment (a genuinely different
build path through BuildKit than every other example here, see
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json) +
[`.devcontainer/Dockerfile`](.devcontainer/Dockerfile), which installs
[`uv`](https://astral.sh/uv/) on top of a plain base image — something a
plain `image` reference can't express).

## Try it

Pushing anywhere real needs credentials for that registry — either
`registryCredentials` in the request (as below), or the service's own
ambient `registryAuth` if it's already configured with credentials for
`image.registry`:

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "dockerfile",
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
- [`root-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/root-config) — `.devcontainer.json` at the repo root
- [`subfolder-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/subfolder-config) — `.devcontainer/<name>/devcontainer.json`
- [`features-and-settings`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/features-and-settings) — Features, `forwardPorts`, lifecycle commands, `hostRequirements`
- [`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json) — negative: no config at all
- [`invalid-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/invalid-devcontainer-json) — negative: malformed config
