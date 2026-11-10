import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, CardContent, Input, Typography } from "../index";
import { ThemeProvider, CssBaseline, Stack } from "@mui/material";
import { editorialTheme, streamingTheme, observatoryTheme } from "../theme";
const meta = {
  title: "Guides/Using Vietri",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const Example = ({
  theme,
  label,
}: {
  theme: typeof editorialTheme;
  label: string;
}) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Stack
      spacing={2}
      sx={{
        p: 3,
        maxWidth: 420,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="overline">{label}</Typography>
      <Typography variant="h4">One interface, many products</Typography>
      <Typography color="text.secondary">
        Components keep their behavior and adopt the active theme.
      </Typography>
      <Input label="Email address" placeholder="name@example.com" />
      <Button variant="contained">Continue</Button>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Content card</Typography>
          <Typography variant="body2">
            Shared Vietri component.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  </ThemeProvider>
);
export const ThemeExamples: Story = {
  render: () => (
    <Stack spacing={4}>
      <Example theme={editorialTheme} label="Editorial" />
      <Example theme={streamingTheme} label="Streaming" />
      <Example theme={observatoryTheme} label="Observatory" />
    </Stack>
  ),
};
