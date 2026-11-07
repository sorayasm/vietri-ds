# Vietri DS

A themeable design system built with React, TypeScript and MUI. It is the shared UI foundation for the projects in the [Soraya Sacaan](https://sorayasacaan.com) portfolio: the streaming platform and the Mujeres del Blues observatory.

> **Status:** early development (v0.1). The theme architecture and tooling are in place; components are being built.

## Goals

- Reusable, composable components
- Design tokens as a single source of truth
- Multi-theme architecture
- Storybook documentation
- Testing
- Responsive and accessible UI

## Themes

| Theme         | Mode  | Used by                         |
| ------------- | ----- | ------------------------------- |
| `editorial`   | Light | Base Soraya visual language     |
| `streaming`   | Dark  | Streaming application           |
| `observatory` | Light | Data / cultural platform        |

`streaming` and `observatory` extend `editorial` with `createTheme(editorialTheme, ...)`, so they inherit typography, spacing and shape and only override what changes.

```tsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import { streamingTheme } from "./theme";

<ThemeProvider theme={streamingTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>;
```

## Stack

React · TypeScript · Vite · MUI · Emotion · Storybook · Vitest · Testing Library

## Getting started

Requires Node.js 18 or higher.

```bash
npm install
npm run dev
```

## Scripts

| Command                   | Description                         |
| ------------------------- | ----------------------------------- |
| `npm run dev`             | Start the Vite dev server           |
| `npm run build`           | Type-check and build                |
| `npm run preview`         | Preview the production build        |
| `npm run typecheck`       | Run TypeScript checks               |
| `npm test`                | Run tests once                      |
| `npm run test:watch`      | Run tests in watch mode             |
| `npm run storybook`       | Start Storybook on port 6006        |
| `npm run build-storybook` | Build the static Storybook          |

## Project structure

```
vietri-ds/
├── .storybook/        # Storybook config (main.ts, preview.tsx)
├── src/
│   ├── test/          # Vitest setup
│   ├── theme/         # tokens and the three themes
│   │   ├── tokens.ts
│   │   ├── editorial.ts
│   │   ├── streaming.ts
│   │   ├── observatory.ts
│   │   └── index.ts
│   ├── main.tsx       # demo app
│   └── styles.css
├── index.html
├── vite.config.ts     # Vite + Vitest config
└── package.json
```

## Roadmap

**Setup**

- [x] Vite, TypeScript, MUI and Emotion
- [x] Storybook and Vitest configuration
- [x] Base theme and theme variants

**Foundations**

- [ ] Complete tokens (colors, typography, shadows, breakpoints)
- [ ] Typed theme extension (MUI module augmentation)
- [ ] Voxmater brand palette and typefaces

**Components**

- [ ] Button
- [ ] Typography
- [ ] Card
- [ ] Input
- [ ] Navigation
- [ ] Data components

**Documentation and delivery**

- [ ] Storybook documentation
- [ ] Theme switcher in Storybook
- [ ] Library build and exports
- [ ] Streaming application
- [ ] Observatory application