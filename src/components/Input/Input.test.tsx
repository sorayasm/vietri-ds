import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { Input } from "./Input";

describe("Input", () => {
  it("associates the label with the field", () => {
    renderWithTheme(<Input label="Email address" />);
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
  });

  it("allows typing and reports changes", async () => {
    const onChange = vi.fn();
    renderWithTheme(<Input label="Name" onChange={onChange} />);
    const field = screen.getByLabelText("Name");
    await userEvent.type(field, "Soraya");
    expect(field).toHaveValue("Soraya");
    expect(onChange).toHaveBeenCalledTimes(6);
  });

  it("shows the helper text and links it to the field", () => {
    renderWithTheme(<Input label="Email" helperText="Use your personal email" />);
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "Use your personal email"
    );
  });

  it("marks the field as invalid when there is an error", () => {
    renderWithTheme(<Input label="Email" error helperText="Invalid email address" />);
    expect(screen.getByLabelText("Email")).toBeInvalid();
  });

  it("is disabled", () => {
    renderWithTheme(<Input label="Email" disabled />);
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("renders with the %s theme", (_name, theme) => {
    renderWithTheme(<Input label="Email" />, theme);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});
