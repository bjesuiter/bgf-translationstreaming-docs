# Editable Streamplan Feature

## Goal

Allow editing table cells (location values) from any device with simple PIN protection.

## Current State

- Static Astro site on Cloudflare Pages
- Schedule data hardcoded in `streamplan-2025.astro` (lines 43-266)
- Location type: `'igr-to-igr' | 'aula-to-igr' | 'igr-to-aula' | 'none'`

## Requirements

- **Real-time save** per cell (no "Save all" button)
- **No history/undo**
- **No "last updated" timestamp**
- **Cell locking**: locked cells cannot be edited by normal users
- **Two-tier auth**:
  - Normal PIN: edit unlocked cells only
  - Master PIN: edit all cells + toggle lock state

## Data Structure

```typescript
type Location = 'igr-to-igr' | 'aula-to-igr' | 'igr-to-aula' | 'none';

interface ScheduleItem {
	location: Location;
	note?: string;
	locked?: boolean; // NEW: prevents editing by normal users
}
```

## Proposed Architecture

### Backend: Cloudflare Pages Functions + KV

- **Storage**: Cloudflare KV for schedule data
- **API**: Pages Functions at `/api/streamplan`
- **Auth**: Two PINs stored as env vars (`PIN_NORMAL`, `PIN_MASTER`)

### Frontend: SolidJS + TanStack Query

- **Framework**: SolidJS via `@astrojs/solid-js`
- **Data fetching**: TanStack Query (Solid) for caching + mutations
- Double-click cell → dropdown (if unlocked or master auth)
- Locked cells show visual indicator (e.g., lock icon, muted style)
- PIN prompt on first edit (sessionStorage remembers auth level)

## API Design

| Endpoint               | Method | Auth   | Description             |
| ---------------------- | ------ | ------ | ----------------------- |
| `/api/streamplan`      | GET    | none   | Fetch all schedule data |
| `/api/streamplan`      | PATCH  | PIN    | Update single cell      |
| `/api/streamplan/lock` | PATCH  | Master | Toggle cell lock state  |

### PATCH body example

```json
{
	"language": "S01 - English",
	"date": "2025-12-28",
	"timeslot": "morning",
	"index": 0,
	"location": "aula-to-igr",
	"pin": "1234"
}
```

## Implementation Phases

### Phase 1: Infrastructure

1. Add `@astrojs/cloudflare` adapter
2. Add `@astrojs/solid-js` integration
3. Add `@tanstack/solid-query` for data fetching
4. Switch to `output: 'hybrid'` in astro.config
5. Create KV namespace in Cloudflare dashboard
6. Add wrangler.toml for local dev

### Manual Setup (After Phase 1, Before Phase 2)

1. **Create KV namespaces** in Cloudflare dashboard:

   ```bash
   # Production namespaces
   wrangler kv namespace create STREAMPLAN_KV
   wrangler kv namespace create SESSION

   # Preview namespaces
   wrangler kv namespace create STREAMPLAN_KV --preview
   wrangler kv namespace create SESSION --preview
   ```

2. **Update `wrangler.toml`** with the actual namespace IDs from the commands above:

   ```toml
   [[kv_namespaces]]
   binding = "STREAMPLAN_KV"
   id = "<actual-production-id>"
   preview_id = "<actual-preview-id>"

   [[kv_namespaces]]
   binding = "SESSION"
   id = "<session-production-id>"
   preview_id = "<session-preview-id>"
   ```

3. **Configure production environment variables** in Cloudflare dashboard:
   - Go to Cloudflare Pages → Settings → Environment Variables
   - Add `PIN_NORMAL` (e.g., "1234")
   - Add `PIN_MASTER` (e.g., "5678")
   - Note: `.dev.vars` is already configured for local development

### Phase 2: API Routes

1. `GET /api/streamplan`
2. `PATCH /api/streamplan` (normal + master PIN)
3. `PATCH /api/streamplan/lock` (master PIN only)

### Phase 3: Interactive UI (SolidJS)

1. `StreamplanTable.tsx` - main table component
2. `EditableCell.tsx` - double-click → dropdown
3. `PinModal.tsx` - auth prompt, stores level in sessionStorage
4. `QueryProvider.tsx` - TanStack Query setup
5. Use `createQuery` for fetching, `createMutation` for updates
6. Lock icon + visual styling for locked cells
7. Master mode: show lock/unlock toggle per cell

### Phase 4: Data Migration

1. Seed script: hardcoded data → KV
2. Fetch from API on page load

## Alternatives Considered

- localStorage: rejected (multi-device requirement)
- Full SSR + database: overkill for this use case
- GitHub API: too complex for non-technical users
