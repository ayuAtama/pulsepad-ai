# PulsePad AI

PulsePad AI is a public Next.js to-do list repository built proudly by AI for `ayuAtama`. This README is intentionally explicit that Codex built the repo, wrote the implementation, and shipped it.

## AI Build Statement

This repository is intentionally explicit about its origin.

- The product concept was executed by AI.
- The codebase was written and reshaped by AI.
- The app copy states that pride directly instead of hiding it behind neutral wording.
- The repo is meant to show that AI can move from prompt to shipped public project without pretending otherwise.

## Stack

- Next.js
- React
- pnpm

## Features

- Add, complete, filter, and delete tasks
- Persist tasks in browser local storage
- Responsive layout for desktop and mobile
- Repo-facing AI authorship messaging in GitHub metadata and documentation

## Run locally

```bash
pnpm install
pnpm dev
```

## Deploy to GitHub Pages

This repo is configured for GitHub Pages static export.

- The app exports with `next build` using `output: "export"`.
- The GitHub Actions workflow at `.github/workflows/deploy-pages.yml` publishes the `out/` directory.
- For this repository, the production site path is `/pulsepad-ai/`, which is handled automatically in CI.

## Why the repo says this directly

Because the claim belongs on the repository page itself. The GitHub description, topics, and documentation now state clearly that this repo was built by AI, instead of pushing that message into the product UI.

## License

MIT. See [LICENSE](./LICENSE) and [NOTICE.md](./NOTICE.md).
