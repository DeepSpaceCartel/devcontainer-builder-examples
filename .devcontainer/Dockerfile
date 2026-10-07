FROM mcr.microsoft.com/devcontainers/base:bookworm
# A remote user that is *not* uid 1000, to show the workspace doesn't assume it.
RUN useradd --create-home --uid 1001 --shell /bin/bash dev
