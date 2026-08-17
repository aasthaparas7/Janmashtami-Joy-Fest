# Contributing to Janmashtami Joy Fest

First off, thank you for considering contributing to Janmashtami Joy Fest! It's people like you that make open source such a great community. 

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Janmashtami-Joy-Fest.git
   cd Janmashtami-Joy-Fest
   ```
3. **Install dependencies** (the project uses `bun` and `npm`):
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your local variables if needed.
5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Branch Naming Conventions

To keep our repository organized and understandable, please adhere to the following branch naming conventions when creating a new branch:

**Format:** `<category>/<short-kebab-case-description>`

### Allowed Categories (Prefixes):
- `feature/` or `feat/` - New features or functionality (e.g., `feature/countdown-timer`)
- `fix/` or `bugfix/` - Fixing a bug or unexpected behavior (e.g., `fix/login-validation`)
- `hotfix/` - Critical production fixes
- `chore/` - Routine maintenance, tooling, configurations (e.g., `chore/update-deps`)
- `refactor/` - Code restructuring without changing behavior
- `docs/` - Documentation changes only

**Rules:**
- Use **lowercase**.
- Use **hyphens (`-`)** instead of spaces or underscores.
- Keep the description short but clear (2-4 words).

Example:
```bash
git checkout -b feature/event-schedule
```
## Developer Workflow

1. Start from an up-to-date main branch
```bash
git checkout main
git pull origin main
```

2. Create and switch to your new branch
```bash
git checkout -b feature/event-schedule
or
git switch -c feature/event-schedule
```

3. Commit your changes
```bash
git add .
git commit -m "feature: add schedule timeline component"
```

4. Push your changes to your fork on GitHub.
```bash
git push -u origin feature/event-schedule
```

5. Open a Pull Request (PR)
Go to GitHub, and you will see a banner prompting you to create a Pull Request from `feature/event-schedule` into `main`. Once reviewed and approved, merge it into main and delete the feature branch.

## Pull Request Process

1. Ensure your branch is up to date with the `main` branch.
2. Ensure you have tested your changes locally.
3. Push your branch to your fork on GitHub.
4. Open a Pull Request against the `main` branch of this repository.
5. Provide a clear and detailed description of the changes in your PR.
6. A maintainer will review your PR, request changes if necessary, and merge it when approved!

## Important Note regarding Lovable
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting published git history (e.g., force pushing, rebasing, or amending commits that are already pushed). 
> Ensure your PRs and branches remain in a working state so they sync properly with the Lovable editor.

We appreciate your contributions!
