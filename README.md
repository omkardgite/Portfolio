# Portfolio

This repository contains a personal portfolio web application built with React, Vite, TypeScript, and a small Express server. The client is located in the `client` folder, and the server entry is `server/index.ts`. The project uses TailwindCSS for styling and Drizzle for database schema tooling.

Quick summary

- Client: Vite + React + TypeScript (`client/`)
- Server: Express + TypeScript (`server/index.ts`)
- Styling: TailwindCSS
- Database tooling: Drizzle / drizzle-kit

Why this README
This README outlines the steps to install, build, and run the project locally

## Getting started

Prerequisites

- Node.js (recommended >= 18)
- npm (bundled with Node) or an alternative package manager

Install dependencies

```bash
# from repository root
npm install
```

Run the development server

```bash
# starts the dev server (client + server) depending on your setup
npm run dev
```

If you need to run the client only (helpful for isolating issues):

```bash
cd client
npx vite
```

Build for production

```bash
npm run build
```

This runs the Vite build and bundles the server via esbuild into `dist`.

Start production server

```bash
npm start
```

## Troubleshooting

- EADDRINUSE when running `npm run dev`: another process is using the configured port (the project default may use port 5050). Find the process and stop it:

```bash
lsof -i :5050
kill <PID>
```

- If the build warns about large chunks, consider code-splitting heavy components or tuning `build.rollupOptions` in `vite.config.ts`.
- If Browserslist warns about stale data, run:

```bash
npx update-browserslist-db@latest
```

Project structure (important files)

- `client/` — React + Vite application
- `server/index.ts` — Express server entry used for production bundle
- `vite.config.ts` — Vite configuration (client build)
- `package.json` — root scripts and dependencies
- `drizzle.config.ts` & `shared/schema.ts` — database schema/tooling

## License

This project is licensed under MIT (see `LICENSE`).
