import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, Typography } from "@mui/material";
import { Card, CardContent } from "../components/Card";
import { ThemedPage } from "./ThemedPage";

const meta = {
  title: "Foundations/Accessibility",
  parameters: {
    docs: {
      description: {
        component:
          "Vietri DS targets WCAG 2.2 level AA. This page explains what the design system guarantees and what each app must do.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const guarantees: [string, string][] = [
  ["Text contrast", "Themes are tested for a 4.5:1 minimum, also on gradients (at both ends)."],
  ["Component contrast", "Field borders use a color with 3:1 or more."],
  ["Color is never the only cue", "Categories (country, role) always carry text; color only supports it."],
  ["Keyboard", "Every interactive component works with Tab, Enter, Space and Escape."],
  ["Visible focus", "A 2 px focus ring on buttons, links and cards. It turns white on dark backgrounds (Footer)."],
  ["Modals", "Dialog and Drawer trap focus, close with Escape and are announced with their title."],
  ["Motion", "The system “reduce motion” preference is respected."],
  ["Icons", "Decorative by default (aria-hidden); with a label they are announced."],
  ["External links", "They tell screen readers they open in a new tab."],
  ["Skipping navigation", "SkipLink jumps straight to the main content."],
];

const appDuties = [
  "One <main id=\"content\"> per page and a SkipLink pointing to it.",
  "A single h1 per page and headings in order (SectionHeader accepts a level).",
  "Alternative text on meaningful images.",
  "Declare the page language (<html lang=\"en\">) and mark language changes.",
  "Every user-facing text is a prop: translate them when the app is bilingual.",
  "Do not convey information with color alone in custom charts.",
];

const howToTest = [
  "Write the story and check the Accessibility panel in Storybook.",
  "Go through it with the keyboard only: Tab, Shift+Tab, Enter, Space, arrows and Escape.",
  "Add it to the list in src/a11y.test.tsx.",
  "Try it with a screen reader (NVDA on Windows, VoiceOver on Mac).",
];

const List = ({ items }: { items: string[] }) => (
  <ul style={{ margin: 0, paddingLeft: 20 }}>
    {items.map((item) => (
      <li key={item} style={{ marginBottom: 6 }}>
        <Typography variant="body1" component="span">
          {item}
        </Typography>
      </li>
    ))}
  </ul>
);

export const Guidelines: Story = {
  render: () => (
    <ThemedPage>
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 0" }}>
      <Typography variant="overline" color="primary">
        Foundations
      </Typography>
      <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
        Accessibility
      </Typography>
      <Typography variant="h5" sx={{ maxWidth: 720, mb: 4, fontWeight: 400 }}>
        Vietri DS targets WCAG 2.2 level AA. Every component is checked in three ways.
      </Typography>
      <Stack spacing={1} sx={{ mb: 6 }}>
        <Typography>
          <strong>1. The Accessibility panel in Storybook</strong> checks the active story with axe.
        </Typography>
        <Typography>
          <strong>2. Automated tests</strong> (<code>npm test</code>): <code>src/a11y.test.tsx</code> runs axe on every component, and the theme tests verify color contrast.
        </Typography>
        <Typography>
          <strong>3. Manual review</strong> with a keyboard and a screen reader, because automated tools only find part of the problems.
        </Typography>
      </Stack>

      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        What the design system guarantees
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 16,
          marginBottom: 48,
        }}
      >
        {guarantees.map(([title, body]) => (
          <Card key={title} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {title}
              </Typography>
              <Typography color="text.secondary">{body}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        What each app must do
      </Typography>
      <div style={{ marginBottom: 48 }}>
        <List items={appDuties} />
      </div>

      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        How to test a new component
      </Typography>
      <List items={howToTest} />
    </main>
    </ThemedPage>
  ),
};
