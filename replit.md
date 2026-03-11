# CarbonHive - React/Vite Frontend

## Project Overview
A marketing/product website for CarbonHive, a process solutions company offering milling, mixing, and emission control solutions.

## Architecture
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State/Data**: TanStack React Query
- **Animation**: Framer Motion

## Pages
- `/` - Home (Index)
- `/products` - Products listing
- `/about` - About page
- `/spares` - Spare parts
- `/services` - Services
- `/contact` - Contact page

## Key Components
- `Navbar`, `Footer` - Site-wide layout
- `Hero`, `HomeProducts`, `SolutionsExplorer` - Homepage sections
- `Industries`, `InnovationLab`, `TrustSignals` - Feature sections
- `ProductMarquee`, `Contact` - Reusable components

## Development
- **Dev server**: `npm run dev` (port 5000)
- **Build**: `npm run build`

## Replit Configuration
- Migrated from Lovable; removed `lovable-tagger` plugin from vite config
- Vite server set to `host: "0.0.0.0"`, `port: 5000`, `allowedHosts: true` for Replit compatibility
- Workflow: "Start application" runs `npm run dev` on port 5000 (webview)
