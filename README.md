# runtime-and-env

Fixture for devcontainer-builder's `GET /devcontainer` `runtime`, `envScripts` and `variables`, and for
the Coder template's mapping of them onto a Kubernetes pod.

| What | devcontainer.json | Expected in the workspace |
|---|---|---|
| Remote user | `remoteUser: dev`, uid **1001** (Dockerfile) | tools and hooks run as `dev`; home `/home/dev` persisted |
| Workspace folder | `/workspaces/${localWorkspaceFolderBasename}-app` | repo cloned into `/workspaces/<repo>-app` |
| containerEnv | `PATH` extends `${containerEnv:PATH}` | the image's real PATH plus `:/opt/fixture/bin` |
| remoteEnv | `${localEnv:FIXTURE_ORG:DeepSpaceCartel}`, `${localEnv:FIXTURE_TOKEN}`, `${containerWorkspaceFolder}` | default `DeepSpaceCartel` unless the user sets `FIXTURE_ORG`; `FIXTURE_TOKEN` reported as unset |
| Ports | `3000` labelled "Fixture web"; `db:5432` | one app "Fixture web"; `db:5432` dropped with a warning |
| Mounts | named volume at `${containerWorkspaceFolder}/node_modules`; bind of `~/.ssh` | volume persisted; bind dropped with a warning |
| runArgs | `--cap-add=SYS_PTRACE`, `--shm-size=256m`, `--add-host`, `--init`, `--network=host` | capability, 256 MiB `/dev/shm`, `/etc/hosts` entry, shared PID namespace; `--network` warned |
| hostRequirements | 2 CPUs, 2 GB, 8 GB disk | override the workspace's CPU/Memory/Disk parameters |
| initializeCommand | `cp -n .env.example .env` | runs first, so `postStartCommand` finds `.env` |
