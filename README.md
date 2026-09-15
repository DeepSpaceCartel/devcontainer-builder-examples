# invalid-devcontainer-json

**Negative example.** A `.devcontainer.json` that exists, right where it's
supposed to, but is genuinely malformed —
[`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json) is
missing a comma and never closes its outer brace. Distinct from
[`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json):
the file is found, parsing it is what fails.

## What actually happens

Unlike the "not found" cases (`missing-devcontainer-json`,
`subfolder-config`), this fails at JSON(C) parse time, with a real parse
error naming the actual syntax problem and its position in the file —
visible in devcontainer-builder's own pod logs, not the HTTP response
body (same "500 only has the command + exit code" rule as every other
real failure — see
[the API reference's own warning](https://github.com/DeepSpaceCartel/devcontainer-builder/blob/main/docs/reference/API.md#post-build)).

## Try it (and see the real failure)

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "invalid-devcontainer-json",
  "image": { "registry": "ghcr.io/deepspacecartel" }
}
```

```bash
curl -s -X POST http://devcontainer-builder.internal:8080/build \
  -H 'Content-Type: application/json' \
  -d @payload.json
# 500 {"error":"devcontainer build --workspace-folder ... exited with code 1"}
```

## Other examples

- [`main`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/main) — index/overview
- [`node`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/node)
- [`python`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/python)
- [`go`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/go)
- [`dockerfile`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/dockerfile) — the `build.dockerfile` form instead of `image`
- [`root-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/root-config) — `.devcontainer.json` at the repo root
- [`subfolder-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/subfolder-config) — negative: a location that exists but isn't discovered
- [`features-and-settings`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/features-and-settings) — Features, `forwardPorts`, lifecycle commands, `hostRequirements`
- [`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json) — negative: no config at all
