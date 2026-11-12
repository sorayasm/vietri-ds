# Changelog

All notable changes to Vietri DS are listed here. The project follows
[Semantic Versioning](https://semver.org/); while the version is 0.x, a minor
version may include breaking changes.

## 0.4.0

The Streaming theme gets its final palette. The rule: **orange is for acting; violet and lilac are for everything else.** Orange lines and texts over the violet of a hero, or over a gradient, gave 3.75:1 and vibrated.

### Added

- `ThemeColors.outline`: the neutral line of outlined buttons. A theme that defines it draws outlined buttons with that line and the text color; hover brings the primary color (an orange line and a veil). The Streaming theme uses a lilac line (`#B99BFF`, 7.6:1 on the page and 6.6:1 on cards).
- `ThemeColors.accentLarge` and `accentLargeHover`: a livelier accent for large buttons. A theme that defines it gets bold 19px white labels on `size="large"` buttons, whose fill is the accent (large text only needs 3:1). The Streaming theme uses the brand orange `#F35F1C` (3.25:1).
- `ThemeColors.surfaceRule`: an optional 4px rule along the top of footers.
- `ThemeColors.surfaceMid` and `surfaceAngle`: a middle color and an angle for the surface gradient. `createGradients` and `linearGradient` accept them. No theme uses them today.
- `Hero`: `accentRule` draws a short decorative rule under the title. The title stays white, so it keeps its contrast over any photo.

### Changed

- Streaming footer: a flat violet (`#3B2562`) with white underlined links (12.9:1) and an orange rule on top. The teal gradient of 0.3.2 is gone.
- Streaming hero layer: `#4E2B8B`, the brightest violet that keeps white text at 4.5:1 over a pure white photo with the layer at 74%.
- `Hero`: over the photo, outlined buttons keep a white line and their hover is a white veil.
- `ContentRail`: the scrollbar uses the primary color (the arrows already did).
- The Streaming theme uses the Inter weight 700 for large buttons: load it (see the README).

### Breaking

- Streaming palette: `brand.teal` is removed (the footer is no longer teal); `derived.layerViolet` and `derived.footerViolet` are added.
- Apps that depend on `^0.3.x` must move to `^0.4.0`: in 0.x a caret does not cross a minor version.

## 0.3.2

### Added

- `NavBar` accepts `accentLinks`: the links use the primary color and the current page is underlined. Off by default, so other themes do not change.

### Changed

- `ContentRail` arrows use the primary color.
- Large buttons (`size="large"`) have more room: 52px tall with 32px at the sides (they were about 42px with 22px), and every variant of that size is exactly the same height.
- Streaming theme: the layer over a hero photo is a deep lilac (`#3B2562`) instead of the near-black purple, so the photo shows through with more color and light. White text still keeps AA contrast over any photo.
- Streaming theme: the primary action is orange again, in two versions: a burnt orange (`#C8460B`) fills the buttons and holds white text at 4.8:1 (the brand orange `#F35F1C` only reaches 3.2:1 with white), and a lighter orange (`#F4793F`) colors links, outlines and focus rings on the dark backgrounds (6.3:1 on the night background). The bright cyan of 0.3.0 is gone. Palette keys: `brand.cyan` is now `brand.orange`, `brand.teal` is the deep teal of the footer, and `derived.cyanHover` is replaced by `derived.orangeText`, `derived.orangeDeep` and `derived.orangeHover`. `onAction` is white.
- Streaming theme: the footer and banner surface is now a calm gradient from a deep teal (`#0F5C66`) to the purple of the cards (`#2D1B50`), instead of the bright violet-to-lavender one. White text has 7:1 or more at both ends (the old gradient had the lowest contrast of the palette). The palette gains `brand.teal` and loses `derived.lavenderDeep`.
- `Hero` with an image: the dark layer is lighter (84% to 74% under the text, fading to 10% on the right, was 92% to 86% and 25%) so the photo shows. The text still keeps AA contrast over any photo, even a pure white one.

## 0.3.1

### Added

- `MediaCard` accepts `aspectRatio` and each `EpisodeList` episode accepts
  `imageAspectRatio`, so square pictures (such as flyers) are not cropped to 16:9.

## 0.3.0

### Added

- `Hero` accepts an `image` and an `imagePosition`: a decorative background
  picture under a dark layer. The text keeps AA contrast over any photo.
- `ThemeColors.scrim`: the dark layer color of each theme.

### Changed

- `MediaCard` grows slightly on hover and its image zooms, like a streaming
  catalogue.
- `ContentRail` leaves room above and below its cards so the growing cards are
  not clipped.

## 0.2.4

### Changed

- Streaming theme: the primary action is now cyan (`#1CDAF3`, was orange), and
  the surface of footers and banners is a soft gradient from violet to lavender
  (`#693BCC` to `#7A64AE`). `#7A64AE` is the supplied `#816CB2` darkened a hair,
  so white text keeps a 4.5:1 contrast at that end. Soft text on surfaces is
  now `#F7F3FF`.
- The Streaming palette lists `lavender` and `cyan` instead of `orange`.

## 0.2.3

### Changed

- `ContentRail` uses a thin scrollbar in the theme's secondary text color
  instead of the heavy scrollbar of the system, which clashed with the design.

## 0.2.2

### Documentation

- README explains how to test an app that uses the library with Vitest
  (`server.deps.inline`), because MUI 6 has no `exports` map.

## 0.2.1

### Fixed

- `NavBar` content is now limited to the large width (1200 px) by default, so
  the header lines up with the page content instead of spanning the whole
  screen. A new `maxWidth` prop (`"lg"` by default, `false` for full width)
  controls it.

## 0.2.0

### Added

- Shared components: `Icon`, `Chip`, `CategoryChip`, `Footer`, `SectionHeader`,
  `Select`, `Dialog`, `Drawer`, `CopyField`, `SkipLink`, `VisuallyHidden`.
- Observatory components: `Hero`, `FeatureCard`, `Steps`, `Timeline`,
  `ProfileCard`.
- Streaming components: `MediaCard`, `ContentRail`, `VideoEmbed`,
  `EpisodeList`, `PlaylistCard`.
- A palette per theme (`editorialColors`, `streamingColors`,
  `observatoryColors`), typed as `ThemeColors` and available as
  `theme.vietri.color`.
- `createVietriTheme(colors)` to build a theme from a palette.
- Two category palettes: the default soft tints and
  `observatoryCategoryPalette`.
- Automated accessibility checks (axe-core) for every component, contrast
  tests for every theme, and an Accessibility panel in Storybook.

### Changed

- Themes are flat: no theme uses gradients or decorative lights.
- Default text colors for success, warning, info and error meet WCAG AA in
  every theme.
- Default chips are opaque, so they stay legible on any surface.
- `@mui/material` peer dependency is limited to 6.x until 7.x is verified.
- The package is now published as `@sorayasm/vietri-ds` under the MIT license.

### Breaking

- The global color exports `brand`, `derived` and `gradientStops` were removed.
  Each theme now has its own palette in `palettes.ts`.

## 0.1.0

- Tokens, three themes, and the first components: `Button`, `Typography`,
  `Card`, `Input`, `NavBar`, `LanguageSwitch`, `Tabs`, `StatCard`, `DataTable`
  and `BarChart`.
