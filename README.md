# Preparing your computer for the workshop

To avoid losing time on setup during the first day, please prepare your machine in advance. The whole workshop runs inside a Docker container we provide, which already includes Node.js, the Claude Code CLI, the GitHub CLI, and Git. You do not need to install those yourself. You only need a Docker engine running, plus a Claude subscription and a GitHub account.

If anything below requires IT approval or unblocking in your organization, please sort it out ahead of time.

## On your computer

- **Docker**, installed and running. Docker Desktop works if your organization has a license. If not (Docker Desktop requires a paid license at larger companies), an open-source equivalent such as Rancher Desktop or Podman Desktop runs this workshop's setup equally well, as long as it provides Docker Engine + Compose v2. Either way, the engine must actually be running, so don't just confirm it's installed (look for the whale/engine icon in your tray or menu bar, or run `docker info`, see the readiness check below). On a fresh machine, the engine often has to be launched manually at least once.
- **Git**, installed, so we can clone the repository together at the start of the workshop.
- **~3 GB free disk space** for container images, dependencies and the database.
- **An editor** (VS Code or whatever you use) and a terminal you're comfortable with.

## Accounts

Have these ready, you'll sign in during the workshop:

- **A Claude subscription.** You'll log into Claude Code with your own account inside the container.
- **A GitHub account** with permission to fork and clone repositories.

## Readiness check

A few days before the workshop, run this in your terminal:

```bash
docker info
git --version
```

If `docker info` prints server details (rather than "Cannot connect to the Docker daemon"), the engine is genuinely running. If you see that error, Docker is installed but not started: launch Docker Desktop / Rancher Desktop / Podman Desktop (or `sudo systemctl start docker` on Linux) and run it again. Note that a passing `docker --version` does not mean the engine is up.

## Test environment

The workshop repository is shared at the start of Day 1, so please verify your setup with this small test environment. It uses the same container image, database and ports as the workshop, so if it runs, the workshop will run too. Running it ahead of time also downloads most of what the workshop needs, which makes the first morning faster.

```bash
git clone https://github.com/makspiechota/workshop-env-test.git
cd workshop-env-test
docker compose up
```

The first run builds the container and may take several minutes. When the log shows `Ready: open http://localhost:3011 in your browser`, open **http://localhost:3011**. You should see a welcome message, which the server reads from the database, and the versions of the tools installed in the container. If you do, your machine is ready. Stop the environment with `Ctrl+C`, then run `docker compose down`.

Typical problems on corporate laptops:

- **The build or `npm install` fails** with timeouts or certificate errors. This usually means a corporate proxy or TLS inspection is in the way, so ask IT to allow Docker Hub, the npm registry, the Debian package mirrors and GitHub.
- **"port is already allocated"** means another program uses port 3011 or 5433. Stop it for the workshop.
- **The page doesn't load while connected to VPN.** Try again with VPN disconnected and tell us if that helps.

If anything above doesn't work, please contact the trainer in advance (maksymilianpiechota@gmail.com) so we have time to help.
