import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { Footer } from "./Footer";

const links = [
  { label: "Vox Mater", href: "https://www.voxmater.com", external: true },
  { label: "About", href: "#about" },
];

describe("Footer", () => {
  it("is the site information landmark (contentinfo)", () => {
    renderWithTheme(<Footer title="Observatorio MDB" />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the title, description, contact lines and legal text", () => {
    renderWithTheme(
      <Footer
        title="Observatorio MDB"
        description="Research platform"
        lines={["Santiago, Chile"]}
        legal="© 2026"
      />
    );
    expect(screen.getByText("Observatorio MDB")).toBeInTheDocument();
    expect(screen.getByText("Research platform")).toBeInTheDocument();
    expect(screen.getByText("Santiago, Chile")).toBeInTheDocument();
    expect(screen.getByText("© 2026")).toBeInTheDocument();
  });

  it("groups the links in a named navigation", () => {
    renderWithTheme(<Footer title="Site" links={links} />);
    const nav = screen.getByRole("navigation", { name: "Footer links" });
    expect(within(nav).getAllByRole("link")).toHaveLength(2);
  });

  it("external links open in a new tab and announce it", () => {
    renderWithTheme(<Footer title="Site" links={links} />);
    const external = screen.getByRole("link", {
      name: "Vox Mater (opens in a new tab)",
    });
    expect(external).toHaveAttribute("target", "_blank");
    expect(external).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("target");
  });

  it("allows customizing the external link text", () => {
    renderWithTheme(
      <Footer title="Site" links={links} externalLabel="(external site)" />
    );
    expect(
      screen.getByRole("link", { name: "Vox Mater (external site)" })
    ).toBeInTheDocument();
  });

  it("shows the highlighted action", () => {
    renderWithTheme(<Footer title="Site" action={<button>Learn more</button>} />);
    expect(screen.getByRole("button", { name: "Learn more" })).toBeInTheDocument();
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("renders with the %s theme", (_name, theme) => {
    renderWithTheme(<Footer title="Site" />, theme);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
