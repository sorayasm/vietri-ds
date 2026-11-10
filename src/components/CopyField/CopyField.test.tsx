import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { CopyField } from "./CopyField";

const value = '<iframe src="https://example.com"></iframe>';

describe("CopyField", () => {
  it("shows the label and the value in a named region", () => {
    renderWithTheme(<CopyField label="HTML code" value={value} />);
    expect(screen.getByRole("region", { name: "HTML code" })).toHaveTextContent(value);
  });

  it("copies the value to the clipboard", async () => {
    const user = userEvent.setup();
    renderWithTheme(<CopyField label="HTML code" value={value} />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(await navigator.clipboard.readText()).toBe(value);
  });

  it("announces that it was copied, visibly and to screen readers", async () => {
    const user = userEvent.setup();
    renderWithTheme(<CopyField label="HTML code" value={value} />);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(await screen.findByRole("button", { name: "Copied!" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Copied!");
  });

  it("goes back to its initial state after a while", async () => {
    const user = userEvent.setup();
    renderWithTheme(<CopyField label="HTML code" value={value} copiedDuration={50} />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    await screen.findByRole("button", { name: "Copied!" });
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
    );
  });

  it("announces when copying is not possible", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
    renderWithTheme(<CopyField label="HTML code" value={value} />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Could not copy")
    );
  });

  it("allows customizing the labels", () => {
    renderWithTheme(<CopyField label="Embed code" value={value} copyLabel="Copy code" />);
    expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument();
  });
});
