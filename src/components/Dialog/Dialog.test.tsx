import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("is not shown when closed", () => {
    renderWithTheme(<Dialog open={false} onClose={() => {}} title="Embed" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is exposed as a dialog with the title as its accessible name", () => {
    renderWithTheme(<Dialog open onClose={() => {}} title="Embed the Observatory" />);
    expect(screen.getByRole("dialog", { name: "Embed the Observatory" })).toBeInTheDocument();
  });

  it("the description is the accessible description", () => {
    renderWithTheme(
      <Dialog open onClose={() => {}} title="Embed" description="Copy the code" />
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("Copy the code");
  });

  it("shows the content and the actions", () => {
    renderWithTheme(
      <Dialog open onClose={() => {}} title="Embed" actions={<button>Accept</button>}>
        Content
      </Dialog>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument();
  });

  it("closes with the close button", async () => {
    const onClose = vi.fn();
    renderWithTheme(<Dialog open onClose={onClose} title="Embed" />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes with Escape", async () => {
    const onClose = vi.fn();
    renderWithTheme(<Dialog open onClose={onClose} title="Embed" />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("allows customizing the close button label", () => {
    renderWithTheme(<Dialog open onClose={() => {}} title="Embed" closeLabel="Dismiss" />);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });
});
