# Vietri DS

A themeable design system built with React, TypeScript and MUI. It is the shared UI foundation for the projects in the [Soraya Sacaan](https://sorayasacaan.com) portfolio: the portfolio site, the streaming platform and the Mujeres del Blues Observatory.

> **Status:** pre-1.0 (0.4). The portfolio and the streaming platform already use it. While the version is 0.x, a minor version may include breaking changes: see the [changelog](CHANGELOG.md).

## Goals

- Reusable, composable components
- Design tokens as a single source of truth
- Multi-theme architecture
- Storybook documentation
- Testing, including automated accessibility checks
- Responsive and accessible UI (WCAG 2.2 AA)

## Releases

The package is published on npm as [`@sorayasm/vietri-ds`](https://www.npmjs.com/package/@sorayasm/vietri-ds). Every release is listed in the [changelog](./CHANGELOG.md). Storybook is deployed to GitHub Pages by the `Storybook` workflow and lives at [sorayasm.github.io/vietri-ds](https://sorayasm.github.io/vietri-ds/) once Pages is enabled in the repository settings. Source code: [github.com/sorayasm/vietri-ds](https://github.com/sorayasm/vietri-ds).

## Themes

| Theme         | Mode  | Used by                     |
| ------------- | ----- | --------------------------- |
| `editorial`   | Light | Portfolio (Soraya Sacaan)   |
| `streaming`   | night `#20123A`, burnt orange `#C8460B`, light orange `#F4793F`, brand orange `#F35F1C`, violet `#4E2B8B` and `#3B2562`, lilac `#B99BFF`, magenta `#CB1F9C` | Dark theme. Orange is for acting; violet and lilac are for everything else. |
| `observatory` | Light | Mujeres del Blues Observatory |

All three themes are built from the same `baseOptions` (typography, spacing, shape, breakpoints, component styles) and only differ in their palette. Each palette lives in `src/theme/palettes.ts`, so changing a color means editing one file.

Tokens are also available inside components through `theme.vietri` (typed via MUI module augmentation).

```tsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import { streamingTheme } from "@sorayasm/vietri-ds";

<ThemeProvider theme={streamingTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>;
```

## Palettes

Each theme has its own identity.

| Theme         | Brand colors                                                        | Notes |
| ------------- | ------------------------------------------------------------------- | ----- |
| `editorial`   | black `#000000`, gold `#DBAC5B`, white `#FFFFFF`, light gold `#FDD07A` | Gold is used as a fill with black text. Bronze `#7A5718` carries gold-colored text. |
| `streaming`   | night `#20123A`, burnt orange `#C8460B`, light orange `#F4793F`, deep teal `#0F5C66`, violet `#693BCC`, lavender `#816CB2`, magenta `#CB1F9C` | Dark theme. Orange carries actions: the burnt orange fills buttons (white text), the lighter one colors links and outlines. Footers and banners use a calm gradient from deep teal to purple. |
| `observatory` | teal `#027381`, cyan `#0EB9CB`, amber `#FFC23D`, coral `#FF7751`, vermilion `#F33829`, crimson `#C41E32`, purple `#4A0875` | Light theme. Teal carries actions, purple the footer. Cyan, amber, coral and vermilion are fills for charts and highlights. |

Every palette is a typed `ThemeColors` object (`editorialColors`, `streamingColors`, `observatoryColors`). The active theme's palette is available inside components as `theme.vietri.color`.

Brand colors that cannot carry text on their own (gold on white, violet on deep purple, cyan or amber on white) are only used as **fills** next to a text color that reaches 4.5:1, or replaced by a text-safe sibling. Every text pair in every theme is tested for WCAG AA.

## Fills and gradients

Every fill in the three themes is a solid color. A fill is described by a pair of colors in `ThemeColors` (`action`, `actionHover`, `surface`): a flat fill repeats the same color twice, and a gradient uses two different ones. A surface can also have a middle color (`surfaceMid`) and an angle (`surfaceAngle`); no theme uses them today. They reach components through `theme.vietri.gradient`:

- `surface` — headers, footers and banners (light text on top)
- `action` and `actionHover` — primary buttons

The tests check contrast at **every color** of every fill. A `Footer` draws a thin rule along its top edge when the theme defines `surfaceRule` (the Streaming theme does, in orange). `ThemeColors.glow` can add soft decorative lights to the footer; it is `null` in every theme today.

## Interactive color

In the Streaming theme **orange is for acting; violet and lilac are for everything else.** Orange goes as a surface (a filled button) or over a dark, flat background. On the violet of a hero, or on a gradient, lines and texts are lilac or white: orange there gives 3.75:1 and the edges vibrate.

| Element | Color |
| --- | --- |
| Button fill (medium, small) | burnt orange `#C8460B`, white label (4.8:1) |
| Large button fill | brand orange `#F35F1C`, bold white 19px label: it counts as large text, and 3.25:1 is enough (3:1) |
| Outlined buttons | lilac line `#B99BFF` (7.6:1 on the page, 6.6:1 on cards), white label. Hover: orange line and an orange veil. Focus: orange ring |
| Text buttons, arrows and scrollbar of `ContentRail`, focus rings | light orange `#F4793F` (6.3:1 on the page, 5.5:1 on cards) |
| `NavBar` links (with `accentLinks`) | light orange; the current page is white and underlined |
| `Footer` | flat violet `#3B2562`, white underlined links (12.9:1), a 4px orange rule on top |
| `Hero` | white title with a short orange rule (`accentRule`); the secondary button has a white line |
| Cards and episode lists | the border turns orange on hover and focus |

Color is never the only clue: links in a navigation mark the current page with `aria-current` and an underline, and inline links keep their underline.

`NavBar` and `Hero` keep their usual look by default, so the other themes do not change. Pass `accentLinks` (or `accentRule`) to use the orange. Only a theme that defines `outline` gets lilac lines on outlined buttons, and only one that defines `accentLarge` gets the bold 19px label on large buttons.

## Hero with an image

`Hero` accepts an `image` (a background picture). A layer (`theme.vietri.color.scrim`) sits over it and the text stays in the left 60%, where that layer is at least 74% opaque, so the **white text and the buttons** keep WCAG AA contrast whatever the photo, even a pure white one (a test checks it). If the image fails to load, the theme surface shows instead. The image is decorative: do not put information in it.

`accentRule` draws a short decorative rule under the title, in the accent orange. The title stays white.

```tsx
<Hero
  image="/key-art.webp"
  imagePosition="center 30%"
  accentRule
  title="El Blues es Femenino"
  description="…"
  actions={<Button size="large">Play</Button>}
/>
```

## Categorical colors

`createCategoryColors(["USA", "Chile", …])` assigns a stable color to each category (country, role, decade). The category name is always shown as text, so color is never the only cue. Use it with `CategoryChip` and `ProfileCard`.

There are two palettes. The default one has soft tints (text at AAA, 7:1). `observatoryCategoryPalette` uses the seven brand fills of the Observatory, with dark or white text chosen for AA: `createCategoryColors(keys, observatoryCategoryPalette)`. Pass the keys ordered by importance (for example countries by number of profiles); with more than seven categories the colors repeat.

## Components

Use the theme switcher in the Storybook toolbar to see every component in the three themes.

| Group            | Components                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| Basics           | `Button`, `Typography`, `Card`, `Input`, `Select`, `Chip`, `CategoryChip`   |
| Navigation       | `NavBar`, `LanguageSwitch`, `Tabs`, `SkipLink`                              |
| Layout & content | `Footer`, `SectionHeader`, `Hero`, `FeatureCard`, `Steps`, `Timeline`      |
| Overlays         | `Dialog`, `Drawer`                                                          |
| Streaming        | `MediaCard`, `ContentRail`, `VideoEmbed`, `EpisodeList`, `PlaylistCard`     |
| Data & people    | `StatCard`, `DataTable`, `BarChart`, `ProfileCard`                          |
| Utilities        | `Icon` (lucide-react), `CopyField`, `VisuallyHidden`                        |

```tsx
import {
  Button,
  Footer,
  Input,
  NavBar,
  LanguageSwitch,
  SectionHeader,
  SkipLink,
  icons,
  Icon,
} from "@sorayasm/vietri-ds";

<SkipLink href="#content" />
<NavBar
  brand="Soraya Sacaan"
  links={[{ label: "About", href: "#about" }]}
  actions={<LanguageSwitch value={lang} onChange={setLang} />}
/>
<main id="content">
  <SectionHeader title="Selected work" level={1} />
  <Button startIcon={<Icon icon={icons.ArrowRight} />}>Explore</Button>
  <Input label="Email" helperText="We only use it to reply." />
</main>
<Footer title="Soraya Sacaan" legal="© 2026" />
```

Components are thin wrappers over MUI where possible. The brand look (radius, focus ring, outlined cards, gradients, input borders with 3:1 contrast) lives in `src/theme/components.ts`, so it is shared by all themes.

Every user-facing default text ("Menu", "Close", "Copy"…) is a prop, so the components work in both languages of the portfolio.

## Accessibility

Vietri DS targets **WCAG 2.2 AA**:

- Contrast is tested on every theme, including both ends of each gradient.
- All interactive components work with the keyboard; focus is always visible (white on dark surfaces).
- `Dialog` and `Drawer` trap focus, close with Escape and are announced with their title.
- The system "reduce motion" preference is respected.
- `src/a11y.test.tsx` runs axe-core on every component.
- The Storybook **Accessibility** panel checks each story while you work.

See *Foundations / Accessibility* in Storybook for the full checklist and what each app must do.

## Stack

React · TypeScript · Vite · MUI · Emotion · lucide-react · Storybook · Vitest · Testing Library · axe-core

## Getting started

Requires Node.js 20.19 or higher (Vite 7 and Storybook 10).

```bash
npm install
npm run storybook
```

## Scripts

| Command                   | Description                               |
| ------------------------- | ----------------------------------------- |
| `npm run dev`             | Start the Vite dev server (demo app)      |
| `npm run build`           | Type-check and build the library          |
| `npm run build:lib`       | Build the library (ESM, CJS and types)    |
| `npm run typecheck`       | Run TypeScript checks                     |
| `npm test`                | Run tests once                            |
| `npm run test:watch`      | Run tests in watch mode                   |
| `npm run storybook`       | Start Storybook on port 6006              |
| `npm run build-storybook` | Build the static Storybook                |

## Using the library

**1. Install the library and its peer dependencies.** The host app provides the peers, so there is one copy of React, MUI and Emotion:

```bash
npm install @sorayasm/vietri-ds
npm install react react-dom @mui/material@6 @emotion/react @emotion/styled lucide-react
```

**2. Load the Inter font.** The library does not ship it. For example, in `index.html`. Weight 700 is used by the large buttons of the Streaming theme (a bold label is what makes it count as large text):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**3. Wrap the app in one of the Vietri themes.** Components read `theme.vietri`, so they must be rendered inside a Vietri theme (`editorialTheme`, `streamingTheme`, `observatoryTheme`, or your own with `createVietriTheme`). A plain MUI theme is not enough.

```tsx
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SkipLink, observatoryTheme } from "@sorayasm/vietri-ds";

export function App() {
  return (
    <ThemeProvider theme={observatoryTheme}>
      <CssBaseline />
      <SkipLink href="#content" />
      <main id="content">…</main>
    </ThemeProvider>
  );
}
```

**4. Translate the texts.** Every user-facing default ("Menu", "Close", "Copy"…) is a prop, so an app in another language passes its own.

**5. Testing an app that uses the library (Vitest).** MUI 6 has no `exports` map, so Node cannot import its folders (`@mui/material/Box`) from an ES module package. Running tests that render Vietri components fails with `Directory import '…/@mui/material/Box' is not supported`. Tell Vitest to process the design system with Vite, in the app's `vite.config.ts`:

```ts
export default defineConfig({
  test: {
    environment: "jsdom",
    server: { deps: { inline: ["@sorayasm/vietri-ds"] } },
  },
});
```

Builds and the dev server are not affected, only tests that run directly in Node.

`react`, `react-dom`, `@mui/material` (6.x), `@emotion/react`, `@emotion/styled` and `lucide-react` are peer dependencies. The `theme.vietri` types are added to MUI automatically when `@sorayasm/vietri-ds` is imported.

## Project structure

```
vietri-ds/
├── .storybook/        # Storybook config (main.ts, preview.tsx)
├── src/
│   ├── components/    # One folder per component, with stories and tests
│   ├── docs/          # Storybook documentation pages
│   ├── test/          # Vitest setup, renderWithTheme and axe helpers
│   ├── theme/         # Tokens and the three themes
│   │   ├── tokens.ts         # brand colors, gradients, typography, shadows, breakpoints
│   │   ├── categorical.ts    # accessible categorical palette
│   │   ├── base.ts           # options shared by all themes
│   │   ├── components.ts     # MUI component overrides (brand look)
│   │   ├── augmentation.ts   # typed theme.vietri
│   │   ├── editorial.ts
│   │   ├── streaming.ts
│   │   ├── observatory.ts
│   │   └── index.ts
│   ├── a11y.test.tsx  # axe checks for every component
│   ├── index.ts       # library entry (components + themes)
│   ├── main.tsx       # demo app
│   └── styles.css
├── vite.config.ts     # Vite + Vitest config
├── vite.lib.config.ts # library build
└── package.json
```

## Roadmap

**Setup**

- [x] Vite, TypeScript, MUI and Emotion
- [x] Storybook and Vitest configuration
- [x] Base theme and theme variants

**Foundations**

- [x] Tokens (colors, gradients, typography, shadows, breakpoints)
- [x] Typed theme extension (MUI module augmentation)
- [x] One palette per theme (typeface: Inter)
- [x] Accessible categorical palette

**Components**

- [x] Button, Typography, Card, Input
- [x] Navigation (NavBar, LanguageSwitch, Tabs, SkipLink)
- [x] Data components (StatCard, DataTable, BarChart)
- [x] Shared components (Icon, Chip, Footer, SectionHeader, Select, Dialog, Drawer, CopyField)
- [x] Observatory components (Hero, FeatureCard, Steps, Timeline, ProfileCard)
- [x] Streaming components (MediaCard, ContentRail, VideoEmbed, EpisodeList, PlaylistCard)

**Documentation and delivery**

- [x] Storybook documentation (Welcome, Colors, Typography, Accessibility, Usage)
- [x] Theme switcher in Storybook
- [x] Library build and exports
- [x] Streaming application (live at elbluesesfemenino.cl)
- [x] Portfolio (sorayasacaan.com)
- [ ] Observatory application
