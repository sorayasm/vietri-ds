import type { ReactElement } from "react";
import { describe, it } from "vitest";
import { renderWithTheme } from "./test/utils";
import { expectNoA11yViolations } from "./test/a11y";
import { createCategoryColors, observatoryCategoryPalette } from "./theme";
import {
  BarChart,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CategoryChip,
  Chip,
  CopyField,
  DataTable,
  Dialog,
  Drawer,
  FeatureCard,
  Footer,
  Hero,
  Input,
  LanguageSwitch,
  NavBar,
  ProfileCard,
  SectionHeader,
  Select,
  SkipLink,
  StatCard,
  Steps,
  Tab,
  Tabs,
  Timeline,
  Typography,
  icons,
} from "./components";

const colors = createCategoryColors(["Chile", "USA"]);
const observatoryColors = createCategoryColors(["USA", "Singer"], observatoryCategoryPalette);

/** Components shown inside the page. */
const inline: [string, () => ReactElement][] = [
  ["Button", () => <Button>Explore</Button>],
  ["Disabled Button", () => <Button disabled>Explore</Button>],
  ["Typography", () => <Typography variant="h1">Title</Typography>],
  [
    "Clickable Card",
    () => (
      <Card>
        <CardActionArea>
          <CardContent>Open project</CardContent>
        </CardActionArea>
      </Card>
    ),
  ],
  ["Input", () => <Input label="Email address" helperText="Only used to reply" />],
  ["Input with error", () => <Input label="Email" error helperText="Invalid email address" />],
  [
    "Select",
    () => (
      <Select
        label="Role"
        value="ALL"
        onChange={() => {}}
        options={[
          { value: "ALL", label: "All roles" },
          { value: "singer", label: "Singer", count: 170 },
        ]}
      />
    ),
  ],
  ["Chip", () => <Chip label="Singer" />],
  ["Clickable Chip", () => <Chip label="1920s" onClick={() => {}} />],
  ["CategoryChip", () => <CategoryChip label="Chile" color={colors.Chile} dot />],
  [
    "Tabs",
    () => (
      <Tabs value="a" aria-label="Views">
        <Tab label="Map" value="a" />
        <Tab label="Timeline" value="b" />
      </Tabs>
    ),
  ],
  ["LanguageSwitch", () => <LanguageSwitch value="en" onChange={() => {}} />],
  [
    "NavBar",
    () => (
      <NavBar
        brand="Vietri Design System"
        links={[
          { label: "Projects", href: "#projects", current: true },
          { label: "Contact", href: "#contact" },
        ]}
      />
    ),
  ],
  ["SkipLink", () => <SkipLink href="#content" />],
  [
    "SectionHeader",
    () => <SectionHeader title="Methodology" eyebrow="Process" description="How we work" />,
  ],
  ["StatCard", () => <StatCard value="+200" label="Biographies" />],
  [
    "DataTable",
    () => (
      <DataTable
        caption="Artists"
        columns={[
          { key: "name", header: "Artist", sortable: true },
          { key: "year", header: "Year", align: "right", sortable: true },
        ]}
        rows={[
          { name: "Bessie Smith", year: 1894 },
          { name: "Ma Rainey", year: 1886 },
        ]}
        getRowKey={(row) => row.name}
      />
    ),
  ],
  [
    "BarChart",
    () => (
      <BarChart
        title="Profiles by country"
        data={[
          { label: "Chile", value: 22 },
          { label: "USA", value: 138 },
        ]}
      />
    ),
  ],
  ["CopyField", () => <CopyField label="HTML code" value="<iframe></iframe>" />],
  [
    "Footer",
    () => (
      <Footer
        title="Observatorio MDB"
        lines={["Santiago, Chile"]}
        links={[
          { label: "Vox Mater", href: "https://www.voxmater.com", external: true },
          { label: "About", href: "#about" },
        ]}
        legal="© 2026"
      />
    ),
  ],
];

/** Components that open over the page (checked on the whole document). */
const overlays: [string, () => ReactElement][] = [
  [
    "Dialog",
    () => (
      <Dialog open onClose={() => {}} title="Embed" description="Copy the code" actions={<Button>Accept</Button>}>
        Content
      </Dialog>
    ),
  ],
  [
    "Drawer",
    () => (
      <Drawer open onClose={() => {}} title="Mamie Smith" eyebrow="Archive profile">
        Singer and pianist
      </Drawer>
    ),
  ],
];

describe("accessibility (axe, WCAG 2.2 A and AA)", () => {
  it.each(inline)("%s has no violations", async (_name, build) => {
    const { container } = renderWithTheme(build());
    await expectNoA11yViolations(container);
  });

  it.each(overlays)("open %s has no violations", async (_name, build) => {
    renderWithTheme(build());
    await expectNoA11yViolations(document.body);
  });
});

/** Observatory components. */
const observatory: [string, () => ReactElement][] = [
  ["Hero", () => <Hero title="Women in the blues" eyebrow="Observatory" description="176 profiles" actions={<Button>Explore</Button>} />],
  ["FeatureCard", () => <FeatureCard icon={icons.ShieldCheck} title="Verified sources" description="Every profile cites its sources." />],
  [
    "Steps",
    () => (
      <Steps
        ariaLabel="Methodology"
        steps={[
          { title: "Collect sources", description: "Books and archives" },
          { title: "Human review", description: "Every data point is checked" },
        ]}
      />
    ),
  ],
  [
    "Timeline",
    () => (
      <Timeline
        ariaLabel="Timeline by decade"
        entries={[
          { id: "decade-1920s", label: "1920s", content: <p>Mamie Smith</p> },
          { id: "decade-1950s", label: "1950s", content: <p>Big Mama Thornton</p> },
        ]}
      />
    ),
  ],
  [
    "ProfileCard (static)",
    () => <ProfileCard name="Mamie Smith" subtitle="The first lady of the Blues" bio="Singer and pianist" tags={[{ label: "USA", color: observatoryColors.USA }]} />,
  ],
  ["ProfileCard (link)", () => <ProfileCard name="Mamie Smith" href="https://example.com/mamie" tags={[{ label: "Singer", color: observatoryColors.Singer }]} />],
  ["ProfileCard (button)", () => <ProfileCard name="Mamie Smith" onClick={() => {}} />],
];

describe("accessibility of the Observatory components (axe, WCAG 2.2 A and AA)", () => {
  it.each(observatory)("%s has no violations", async (_name, build) => {
    const { container } = renderWithTheme(build());
    await expectNoA11yViolations(container);
  });
});
