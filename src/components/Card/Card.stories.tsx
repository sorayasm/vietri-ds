import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../Button";
import { Typography } from "../Typography";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: { variant: "outlined" },
  argTypes: {
    variant: { control: "inline-radio", options: ["outlined", "elevation"] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          Project
        </Typography>
        <Typography variant="h4" gutterBottom>
          Vietri Design System
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reusable components, tokens and themes for every project in the portfolio.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const WithMediaAndActions: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia component="div" sx={{ height: 160, bgcolor: "primary.main" }} />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Observatorio MDB
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data visualization and storytelling about blues careers.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View project</Button>
        <Button size="small" variant="text" color="secondary">
          Code
        </Button>
      </CardActions>
    </Card>
  ),
};

export const Clickable: Story = {
  render: (args) => (
    <Card {...args}>
      <CardActionArea onClick={fn()}>
        <CardMedia component="div" sx={{ height: 160, bgcolor: "secondary.main" }} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Streaming Platform
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The whole card is an accessible button with a visible focus ring.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ),
};
