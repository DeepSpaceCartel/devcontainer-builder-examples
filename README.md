# subfolder-config

`.devcontainer/backend/devcontainer.json` — the one-level-deep,
named-subfolder location the
[Dev Container spec](https://containers.dev/implementors/spec/#devcontainerjson)
recognizes but deliberately doesn't name (a repo can have several,
`.devcontainer/backend/`, `.devcontainer/frontend/`, side by side).

**This is a real, honest negative example, not a positive one** — despite
the file existing right where the spec allows it,
[`@devcontainers/cli` doesn't auto-discover this location](https://github.com/DeepSpaceCartel/devcontainer-builder/blob/main/docs/claude/notes/devcontainer-subfolder-config-discovery.md)
(confirmed on 0.89.0 — only `.devcontainer/devcontainer.json` and root
`.devcontainer.json` are auto-discovered), and devcontainer-builder's
`/build` request has no `configPath` field to point at it explicitly
today. A build against this branch fails, every time, regardless of the
subfolder's name:

```
Error: Dev container config (.../repo/.devcontainer/devcontainer.json) not found.
```

That's the real underlying text, visible in devcontainer-builder's own pod
logs — the actual HTTP `500` response only ever contains the failing
command and its exit code, never this text (see
[the API reference's own warning](https://github.com/DeepSpaceCartel/devcontainer-builder/blob/main/docs/reference/API.md#post-build)
on that). Note it's looking for the *wrong path entirely* (the standard
location, which doesn't exist here), not reporting "found `backend/` but
didn't know to use it". That distinction is the actual point of this
example: the location isn't being checked at all, not a folder-naming
mismatch.

## Try it (and see the real failure)

```json title="payload.json"
{
  "repository": "https://github.com/deepspacecartel/devcontainer-builder-examples.git",
  "branch": "subfolder-config",
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
- [`features-and-settings`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/features-and-settings) — Features, `forwardPorts`, lifecycle commands, `hostRequirements`
- [`missing-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/missing-devcontainer-json) — negative: no config at all
- [`invalid-devcontainer-json`](https://github.com/DeepSpaceCartel/devcontainer-builder-examples/tree/invalid-devcontainer-json) — negative: malformed config
