# python

A plain `image`-based `.devcontainer.json` for Python:
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json)
references `mcr.microsoft.com/devcontainers/python:1-3.12-bookworm`
directly (Microsoft's own image, not `docker.io/library/python`, so this
repeatedly-built example doesn't get caught in Docker Hub's anonymous
pull-rate limit).

## Try it

```bash
curl -s -X POST http://devcontainer-builder.internal:8080/build \
  -H 'Content-Type: application/json' \
  -d '{
    "repository": "https://github.com/DeepSpaceCartel/devcontainer-builder-examples.git",
    "branch": "python",
    "image": { "registry": "ghcr.io/example" }
  }'
```

## Other examples

- [`main`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/main) — index/overview
- [`node`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/node)
- [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go)
- [`dockerfile`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/dockerfile) — the `build.dockerfile` form instead of `image`
