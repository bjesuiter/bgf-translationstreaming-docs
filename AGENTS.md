# AGENTS.md - Agentic Coding Guidelines

Guidelines for AI coding agents working in this repository.

## Project Overview

**Astro Starlight** documentation site for BGF Translation Streaming.

- **Framework**: Astro 5.x with Starlight 0.37.x
- **Language**: TypeScript (strict mode)
- **Package Manager**: Bun
- **Content Format**: Markdown (.md) and MDX (.mdx)

## Commands

```bash
# Development
bun install          # Install dependencies
bun dev              # Start dev server (localhost:4321), check port availability first before starting a new one
bun build            # Build production site to ./dist/
bun preview          # Preview production build

# Astro CLI
bun astro check      # Type checking
bun astro add <pkg>  # Add integrations

# Formatting
bun format           # Format all files with Prettier
bun format:check     # Check if files are formatted correctly

# Testing (when configured)
bun test                    # Run all tests
bun test <path/to/test.ts>  # Run single test
```

## Project Structure

```
├── public/                  # Static assets (favicon, etc.)
├── src/
│   ├── assets/              # Images (processed by Astro)
│   ├── content/docs/        # Documentation pages
│   │   ├── guides/          # How-to guides
│   │   └── reference/       # Reference docs
│   └── content.config.ts    # Content collection schema
├── astro.config.mjs         # Astro + Starlight config
└── tsconfig.json            # TypeScript config (strict)
```

## Code Style

### TypeScript

- Strict mode via `astro/tsconfigs/strict`
- ES Modules (`"type": "module"`)
- Explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use `const` by default, `let` only when needed

```typescript
interface DocConfig {
	title: string;
	description?: string;
}

export function getConfig(name: string): DocConfig {
	/* ... */
}
```

### Imports

- ES module imports only
- Order: external packages > internal modules > relative paths
- Use `type` keyword for type-only imports

```typescript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import type { DocConfig } from './types';
```

### Astro Components

- Use `.astro` extension, place in `src/components/`
- Component logic in frontmatter (`---`)

```astro
---
interface Props {
	title: string;
}
const { title } = Astro.props;
---

<h1>{title}</h1>
```

### Content Authoring (Markdown/MDX)

- Place docs in `src/content/docs/`
- Always include `title` and `description` in frontmatter
- Use `<h2>` and below (page title auto-generated from frontmatter)

```markdown
---
title: Page Title
description: Brief description for SEO.
---

Content starts here...

## Section Heading
```

### Naming Conventions

| Type             | Convention       | Example              |
| ---------------- | ---------------- | -------------------- |
| Doc files        | kebab-case       | `getting-started.md` |
| Code files       | camelCase        | `contentConfig.ts`   |
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

### Error Handling

```typescript
try {
	const data = await fetchData();
} catch (error) {
	console.error('Failed to fetch:', error);
	throw new Error(`Fetch failed: ${error.message}`);
}
```

## Starlight Configuration

### Sidebar (in astro.config.mjs)

```javascript
sidebar: [
  { label: 'Guides', items: [{ label: 'Example', slug: 'guides/example' }] },
  { label: 'Reference', autogenerate: { directory: 'reference' } },
],
```

### Built-in Components (MDX)

```mdx
import { Card, CardGrid, Tabs, TabItem } from '@astrojs/starlight/components';

<CardGrid>
	<Card title="Feature" icon="star">
		Description
	</Card>
</CardGrid>
```

## Git Workflow

- Use conventional commits: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## VS Code

- Extension: `astro-build.astro-vscode`
- Debug config in `.vscode/launch.json`
