import { afterEach, describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { NavBar } from "./NavBar";

const links = [
  { label: "Projects", href: "#projects", current: true },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** jsdom does not implement matchMedia: we simulate a wide screen. */
function mockDesktop() {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("NavBar on desktop", () => {
  it("shows the brand and the links inside a navigation", () => {
    mockDesktop();
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.getByRole("link", { name: "Soraya Sacaan" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "#about"
    );
  });

  it("marks the current page with aria-current", () => {
    mockDesktop();
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Contact" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("does not show the menu button", () => {
    mockDesktop();
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.queryByRole("button", { name: "Menu" })).not.toBeInTheDocument();
  });

  it("shows the extra actions", () => {
    mockDesktop();
    renderWithTheme(
      <NavBar brand="Soraya Sacaan" links={links} actions={<button>EN</button>} />
    );
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
  });
});

describe("NavBar on mobile", () => {
  it("hides the links until the menu is opened", async () => {
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggle);
    expect(await screen.findByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("closes the menu with the close button", async () => {
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    await userEvent.click(await screen.findByRole("button", { name: "Close menu" }));
    await waitFor(() =>
      expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument()
    );
  });

  it("allows changing the menu labels", () => {
    renderWithTheme(
      <NavBar brand="Soraya Sacaan" links={links} menuLabel="Open navigation" closeLabel="Close navigation" />
    );
    expect(screen.getByRole("button", { name: "Open navigation" })).toBeInTheDocument();
  });
});

describe("NavBar width", () => {
  it("limits the content to the large width by default", () => {
    const { container } = renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(container.querySelector("header .MuiContainer-root")).toHaveClass(
      "MuiContainer-maxWidthLg"
    );
  });

  it("allows another maximum width", () => {
    const { container } = renderWithTheme(
      <NavBar brand="Soraya Sacaan" links={links} maxWidth="md" />
    );
    expect(container.querySelector("header .MuiContainer-root")).toHaveClass(
      "MuiContainer-maxWidthMd"
    );
  });

  it("can span the whole width", () => {
    const { container } = renderWithTheme(
      <NavBar brand="Soraya Sacaan" links={links} maxWidth={false} />
    );
    expect(container.querySelector('header [class*="MuiContainer-maxWidth"]')).not.toBeInTheDocument();
  });
});
