# node

A plain `image`-based `.devcontainer.json` for Node.js — the simplest real
shape devcontainer-builder builds:
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json)
references `mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm`
directly (Microsoft's own image, not `docker.io/library/node`, so this
repeatedly-built example doesn't get caught in Docker Hub's anonymous
pull-rate limit).

## Try it

```bash
curl -s -X POST http://devcontainer-builder.internal:8080/build \
  -H 'Content-Type: application/json' \
  -d '{
    "repository": "https://github.com/DeepSpaceCartel/devcontainer-builder-examples.git",
    "branch": "node",
    "image": { "registry": "ghcr.io/example" }
  }'
```

## Other examples

- [`main`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/main) — index/overview
- [`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python)
- [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go)
- [`dockerfile`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/dockerfile) — the `build.dockerfile` form instead of `image`
