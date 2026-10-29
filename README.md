# Workshop environment test

Run this before the workshop to check that your machine can run the workshop setup. It uses the same container image, database and ports as the workshop repository.

```bash
git clone https://github.com/makspiechota/workshop-env-test.git
cd workshop-env-test
docker compose up
```

The first run builds the container and downloads dependencies, which can take several minutes. When the log shows `Ready: open http://localhost:3011 in your browser`, open **http://localhost:3011**. You should see a welcome message read from the database, plus the versions of Node.js, Claude Code, the GitHub CLI and Git inside the container.

Stop it with `Ctrl+C`, then run `docker compose down`.

If it doesn't work, contact the trainer at maksymilianpiechota@gmail.com with the error output.
