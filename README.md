# Inventory Dashboard (Vite + React + TS + Vanilla CSS + Router)

- React Router routing (`/inventory`, `/reports`, `/settings`)
- Theme Context (light/dark) persisted to localStorage
- Single DashboardLayout (Navbar + Sidebar + Outlet)
- Inventory page: stats, search, responsive table, Add/Edit modal, Delete
- Data: comes from `public/data/db.json` via Fetch; then CRUD in localStorage
- Optional API: set `VITE_API_BASE_URL` to use Axios (json-server supported)

## Quick Start

```bash
npm install
npm run dev
```

## Optional API (json-server) - on a new terminal

```bash
npm run api
# then create .env at project root with:
VITE_API_BASE_URL=http://localhost:5000
```
