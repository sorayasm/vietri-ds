import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { LanguageSwitch } from "./LanguageSwitch";

describe("LanguageSwitch", () => {
  it("shows EN and ES inside a group with an accessible name", () => {
    renderWithTheme(<LanguageSwitch value="en" onChange={() => {}} />);
    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
  });

  it("marks the active option as pressed", () => {
    renderWithTheme(<LanguageSwitch value="es" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "ES" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("calls onChange with the new language", async () => {
    const onChange = vi.fn();
    renderWithTheme(<LanguageSwitch value="en" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "ES" }));
    expect(onChange).toHaveBeenCalledWith("es");
  });

  it("does not call onChange when the active language is clicked", async () => {
    const onChange = vi.fn();
    renderWithTheme(<LanguageSwitch value="en" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
