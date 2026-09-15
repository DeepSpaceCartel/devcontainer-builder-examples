# features-and-settings

A richer, more realistic `.devcontainer.json` than "just an image" —
[Dev Container Features](https://containers.dev/implementors/features/),
`forwardPorts`, `hostRequirements`, `remoteEnv`, `postCreateCommand`, and
`customizations` all together (see
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json)).

**What actually affects the built image vs. what doesn't:**

- **`features`** genuinely change the build — each one is installed into
  the image during `devcontainer build`, same as this example's Node.js
  and GitHub CLI Features. This is the one part of this file
  devcontainer-builder's build step actually acts on beyond `image`
  itself.
- **`postCreateCommand`, `forwardPorts`, `customizations`** are consumed by
  devcontainer-CLI-*aware* tooling (`devcontainer up`, VS Code Dev
  Containers) at container-*run* time, via the `devcontainer.metadata`
  label the build bakes into the image — not by `devcontainer build`
  itself, and **not** automatically by a plain Coder Workspace Template
  pod either (`templates/coder-kubernetes/main.tf`'s
  `kubernetes_deployment_v1.main` runs the built image directly, the same
  way `kubectl run` would — it never calls `devcontainer up`). They're
  included here because a real project's `.devcontainer.json` commonly
  has them, not because devcontainer-builder or the Coder template
  execute them.

## Try it

Pushing anywhere real needs credentials for that registry — either
`registryCredentials` in the request (as below), or the service's own
ambient `registryAuth` if it's already configured with credentials for
`image.registry`:

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "features-and-settings",
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
- [`root-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/root-config) — `.devcontainer.json` at the repo root
- [`subfolder-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/subfolder-config) — negative: a location that exists but isn't discovered
- [`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json) — negative: no config at all
- [`invalid-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/invalid-devcontainer-json) — negative: malformed config
