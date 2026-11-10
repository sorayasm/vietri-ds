# Changelog

All notable changes to Vietri DS are listed here. The project follows
[Semantic Versioning](https://semver.org/); while the version is 0.x, a minor
version may include breaking changes.

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
