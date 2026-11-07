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

All three themes are built from the same `baseOptions` (typography, spacing, shape, breakpoints) and only differ in their palette. Every value comes from `src/theme/tokens.ts`, so changing a brand color means editing one file.

Tokens are also available inside components through `theme.vietri` (typed via MUI module augmentation).

```tsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import { streamingTheme } from "./theme";

<ThemeProvider theme={streamingTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>;
```

## Components

Use the theme switcher in the Storybook toolbar to see every component in the three themes.

```tsx
import { Button, Typography } from "./components";

<Typography variant="h2">Selected work</Typography>
<Button variant="contained" color="primary">Explore</Button>
```

Components are thin wrappers over MUI. The brand look (radius, focus ring, no elevation) lives in `src/theme/components.ts`, so it is shared by all themes.

## Brand colors

| Token    | Hex       |
| -------- | --------- |
| `navy`   | `#131B2E` |
| `sky`    | `#38BDF8` |
| `purple` | `#481374` |
| `mist`   | `#E2E8F0` |
| `white`  | `#FFFFFF` |
| `black`  | `#000000` |

Themes are tested for WCAG AA contrast (4.5:1) on body text and buttons. A few derived neutrals (`slate`, `slateLight`, `navyRaised`) exist only to build hierarchy while keeping that contrast.

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
│   ├── components/    # Button, Typography (each with stories and tests)
│   ├── test/          # Vitest setup and renderWithTheme helper
│   ├── theme/         # tokens and the three themes
│   │   ├── tokens.ts         # brand colors, typography, shadows, breakpoints
│   │   ├── base.ts           # options shared by all themes
│   │   ├── components.ts     # MUI component overrides (brand look)
│   │   ├── augmentation.ts   # typed theme.vietri
│   │   ├── editorial.ts
│   │   ├── streaming.ts
│   │   ├── observatory.ts
│   │   └── index.ts
│   ├── index.ts       # library entry (components + themes)
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

- [x] Complete tokens (colors, typography, shadows, breakpoints)
- [x] Typed theme extension (MUI module augmentation)
- [x] Voxmater brand palette (typeface: Inter)

**Components**

- [x] Button
- [x] Typography
- [ ] Card
- [ ] Input
- [ ] Navigation
- [ ] Data components

**Documentation and delivery**

- [ ] Storybook documentation
- [x] Theme switcher in Storybook
- [ ] Library build and exports
- [ ] Streaming application
- [ ] Observatory application
