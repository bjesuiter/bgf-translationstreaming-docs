# AGENTS.md - Agentic Coding Guidelines

Guidelines for AI coding agents working in this repository.

## Project Overview

**Static Site** conference companion for BGF Translation Streaming (Ü-Streaming).

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS (v4 via @tailwindcss/vite)
- **Language**: TypeScript (strict mode)
- **Package Manager**: Bun
- **Content Language**: German only (Code in English)

## Commands

```bash
# Development
bun install          # Install dependencies
bun dev              # Start dev server (localhost:4321)
bun build            # Build production site to ./dist/
bun preview          # Preview production build

# Astro CLI
bun astro check      # Type checking
bun astro add <pkg>  # Add integrations

# Formatting
bun format           # Format all files with Prettier
bun format:check     # Check if files are formatted correctly
```

## Project Structure

```
├── public/                  # Static assets
├── src/
│   ├── layouts/             # Astro layouts
│   ├── pages/               # Astro pages (routing)
│   ├── styles/              # Global styles (Tailwind)
│   └── components/          # Reusable components
├── astro.config.mjs         # Astro config
└── tsconfig.json            # TypeScript config (strict)
```

## Code Style

### TypeScript

- Strict mode via `astro/tsconfigs/strict`
- ES Modules (`"type": "module"`)
- Explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use `const` by default, `let` only when needed

### Astro Components

- Use `.astro` extension, place in `src/components/`
- Component logic in frontmatter (`---`)
- Use Tailwind utility classes for styling

```astro
---
interface Props {
	title: string;
}
const { title } = Astro.props;
---

<h1 class="text-2xl font-bold">{title}</h1>
```

### Naming Conventions

| Type             | Convention       | Example              |
| ---------------- | ---------------- | -------------------- |
| Astro files      | kebab-case       | `my-page.astro`      |
| Code files       | camelCase        | `utils.ts`           |
| Components       | PascalCase       | `CustomButton.astro` |
| Variables        | camelCase        | `pageTitle`          |
| Constants        | UPPER_SNAKE_CASE | `MAX_ITEMS`          |
| Interfaces/Types | PascalCase       | `DocConfig`          |

### Formatting

- **Indentation**: Tabs
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Trailing Commas**: Yes (multiline)
- **Line Length**: ~100 chars

## Git Workflow

- Use conventional commits: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Playwright Usage

- If you should confirm something with playwright, try to open the URL directly WITHOUT starting the dev server!
- If no URL is given, use `http://localhost:4321` as the default
- If this fails with a 404 or "unable to connect", REPORT to the user! NEVER start the dev server yourself!

## Updating the Streamplan

If the user asks to update the streamplan, use the file `src/pages/streamplan-2025.astro`.
DO ONLY UPDATE THE TIMESLOTS REQUESTED BY THE USER! => Do not think about adding defaults to other timeslots!
