import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
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
          Proyecto
        </Typography>
        <Typography variant="h4" gutterBottom>
          Vietri Design System
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Componentes reutilizables, tokens y temas para todos los proyectos
          del portafolio.
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
          Observatorio Mujeres del Blues
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visualización de datos y storytelling sobre trayectorias del blues.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver proyecto</Button>
        <Button size="small" variant="text" color="secondary">
          Código
        </Button>
      </CardActions>
    </Card>
  ),
};

export const Clickable: Story = {
  args: { onClick: fn() },
  render: (args) => (
    <Card {...args}>
      <CardActionArea onClick={args.onClick}>
        <CardMedia component="div" sx={{ height: 160, bgcolor: "secondary.main" }} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Streaming Platform
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Toda la tarjeta es un botón accesible con foco visible.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ),
};
