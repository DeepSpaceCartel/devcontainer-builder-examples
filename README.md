# missing-devcontainer-json

**Negative example.** No `.devcontainer.json` anywhere in this repo — not
at the root, not under `.devcontainer/`, nowhere. The simplest, most
common real failure: someone points devcontainer-builder at a repo that
was never set up for dev containers at all.

## What actually happens

`@devcontainers/cli` reports the same "not found" error as the
[`subfolder-config`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/subfolder-config)
negative example — worth being explicit about, since it'd be easy to
assume a *different* message for "genuinely missing" vs. "exists but not
discovered". It doesn't distinguish the two:

```
Error: Dev container config (.../repo/.devcontainer/devcontainer.json) not found.
```

That's the real text, visible in devcontainer-builder's own pod logs. The
actual HTTP response is a `500` containing only the failing command and
its exit code, never this text — see
[the API reference's own warning](https://github.com/DeepSpaceCartel/devcontainer-builder/blob/main/docs/reference/API.md#post-build)
on that.

## Try it (and see the real failure)

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "missing-devcontainer-json",
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
- [`invalid-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/invalid-devcontainer-json) — negative: malformed config
