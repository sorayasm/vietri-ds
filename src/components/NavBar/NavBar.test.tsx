import { afterEach, describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { NavBar } from "./NavBar";

const links = [
  { label: "Proyectos", href: "#proyectos", current: true },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

/** jsdom no implementa matchMedia: simulamos una pantalla ancha. */
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

describe("NavBar en escritorio", () => {
  it("muestra la marca y los enlaces dentro de una navegación", () => {
    mockDesktop();
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.getByRole("link", { name: "Soraya Sacaan" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sobre mí" })).toHaveAttribute(
      "href",
      "#sobre-mi"
    );
  });

  it("marca la página actual con aria-current", () => {
    mockDesktop();
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.getByRole("link", { name: "Proyectos" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Contacto" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("no muestra el botón de menú", () => {
    mockDesktop();
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.queryByRole("button", { name: "Menú" })).not.toBeInTheDocument();
  });

  it("muestra las acciones extra", () => {
    mockDesktop();
    renderWithTheme(
      <NavBar brand="Soraya Sacaan" links={links} actions={<button>EN</button>} />
    );
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
  });
});

describe("NavBar en móvil", () => {
  it("oculta los enlaces hasta abrir el menú", async () => {
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    expect(screen.queryByRole("link", { name: "Sobre mí" })).not.toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: "Menú" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggle);
    expect(await screen.findByRole("link", { name: "Sobre mí" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
  });

  it("cierra el menú con el botón de cerrar", async () => {
    renderWithTheme(<NavBar brand="Soraya Sacaan" links={links} />);
    await userEvent.click(screen.getByRole("button", { name: "Menú" }));
    await userEvent.click(await screen.findByRole("button", { name: "Cerrar menú" }));
    await waitFor(() =>
      expect(screen.queryByRole("link", { name: "Sobre mí" })).not.toBeInTheDocument()
    );
  });

  it("permite cambiar los textos del menú", () => {
    renderWithTheme(
      <NavBar brand="Soraya Sacaan" links={links} menuLabel="Menu" closeLabel="Close" />
    );
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
});
