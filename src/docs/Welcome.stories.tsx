import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { Card, CardContent } from "../components/Card";
import { ThemedPage } from "./ThemedPage";

const meta = {
  title: "Vietri/Welcome",
  parameters: { layout: "fullscreen", options: { showPanel: false } },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Introduction: Story = {
  render: () => (
    <ThemedPage>
    <main
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "64px 32px",
      }}
    >
      <Typography variant="overline" color="secondary">
        DESIGN SYSTEM · v0.3
      </Typography>
      <Typography variant="h1" sx={{ mt: 2, mb: 3 }}>
        Vietri DS
      </Typography>
      <Typography variant="h5" sx={{ maxWidth: 720, mb: 3, fontWeight: 400 }}>
        A shared visual foundation for building consistent, accessible digital
        experiences that are easy to maintain.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 720, mb: 5 }}>
        Vietri brings together React components, design tokens and MUI themes. The
        same library powers the streaming site and the Mujeres del Blues
        Observatory, letting each product keep its own personality without
        duplicating the interface.
      </Typography>
      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}
      >
        <Button variant="contained">Components</Button>
        <Button variant="outlined" color="secondary">
          Explore foundations
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
        }}
      >
        {[
          ["One library", "Typed, reusable components for React."],
          ["Three identities", "Editorial, streaming and observatory themes."],
          [
            "One language",
            "Shared tokens for color, typography and shape.",
          ],
        ].map(([title, body]) => (
          <Card key={title} variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Typography color="text.secondary">{body}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
    </ThemedPage>
  ),
};
