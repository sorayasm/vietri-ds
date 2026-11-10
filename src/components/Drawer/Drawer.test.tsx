import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("is not shown when closed", () => {
    renderWithTheme(
      <Drawer open={false} onClose={() => {}} title="Mamie Smith">
        Content
      </Drawer>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is exposed as a modal dialog with the title as its name", () => {
    renderWithTheme(
      <Drawer open onClose={() => {}} title="Mamie Smith">
        Content
      </Drawer>
    );
    const dialog = screen.getByRole("dialog", { name: "Mamie Smith" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("heading", { level: 2, name: "Mamie Smith" })).toBeInTheDocument();
  });

  it("shows the eyebrow, the content and the footer", () => {
    renderWithTheme(
      <Drawer
        open
        onClose={() => {}}
        title="Mamie Smith"
        eyebrow="Archive profile"
        footer={<button>View biography</button>}
      >
        Singer and pianist
      </Drawer>
    );
    expect(screen.getByText("Archive profile")).toBeInTheDocument();
    expect(screen.getByText("Singer and pianist")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View biography" })).toBeInTheDocument();
  });

  it("closes with the close button", async () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Drawer open onClose={onClose} title="Mamie Smith">
        Content
      </Drawer>
    );
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes with Escape", async () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Drawer open onClose={onClose} title="Mamie Smith">
        Content
      </Drawer>
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("allows customizing the close button label", () => {
    renderWithTheme(
      <Drawer open onClose={() => {}} title="Profile" closeLabel="Dismiss">
        Content
      </Drawer>
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });
});
