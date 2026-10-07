# lifecycle-and-extensions

Fixture for devcontainer-builder's `GET /devcontainer`: a local Feature
(`.devcontainer/hello/`) and `devcontainer.json` both contribute lifecycle
commands and VS Code customizations, so the image's `devcontainer.metadata`
label has entries that must be merged.

| What | Where | Expected after merge |
|---|---|---|
| `postCreateCommand` | Feature (string), then devcontainer.json (array) | both run, Feature first |
| `postStartCommand` | devcontainer.json (object) | `first` and `second` run in parallel |
| `onCreateCommand` | uses `${containerWorkspaceFolder}` | reported as a warning (not substituted) |
| extensions | Feature adds `hashicorp.terraform`, `ms-python.python`; devcontainer.json adds `redhat.vscode-yaml`, `HashiCorp.Terraform`, removes `-ms-python.python` | `hashicorp.terraform`, `redhat.vscode-yaml` |
| settings | Feature `editor.tabSize: 4`, `files.trimTrailingWhitespace: true`; devcontainer.json `editor.tabSize: 2` | `editor.tabSize: 2`, `files.trimTrailingWhitespace: true` |
