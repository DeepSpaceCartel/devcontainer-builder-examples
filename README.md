# dockerfile

The `build.dockerfile` form of `.devcontainer.json` instead of a plain
`image` reference — a real, custom-built environment (a genuinely different
build path through BuildKit than every other example here, see
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json) +
[`.devcontainer/Dockerfile`](.devcontainer/Dockerfile), which installs
[`uv`](https://astral.sh/uv/) on top of a plain base image — something a
plain `image` reference can't express).

## Try it

```bash
curl -s -X POST http://devcontainer-builder.internal:8080/build \
  -H 'Content-Type: application/json' \
  -d '{
    "repository": "https://github.com/DeepSpaceCartel/devcontainer-builder-examples.git",
    "branch": "dockerfile",
    "image": { "registry": "ghcr.io/example" }
  }'
```

## Other examples

- [`main`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/main) — index/overview
- [`node`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/node)
- [`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python)
- [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go)
