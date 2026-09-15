FROM mcr.microsoft.com/devcontainers/base:bookworm

# A real, minimal custom build step - the thing the "build" form of
# .devcontainer.json exists for, that a plain "image" reference can't do:
# installing something not already in any base image before the workspace
# ever starts.
RUN curl -fsSL https://astral.sh/uv/install.sh | sh
