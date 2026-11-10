import { describe, it, expect, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { Select, type SelectOption } from "./Select";

const options: SelectOption[] = [
  { value: "ALL", label: "All roles" },
  { value: "singer", label: "Singer", count: 170 },
  { value: "guitarist", label: "Guitarist", count: 30 },
];

describe("Select", () => {
  it("has an accessible name from its label and shows the current value", () => {
    renderWithTheme(<Select label="Role" value="ALL" options={options} onChange={() => {}} />);
    const combobox = screen.getByRole("combobox", { name: /Role/ });
    expect(combobox).toHaveTextContent("All roles");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the list of options on click", async () => {
    renderWithTheme(<Select label="Role" value="ALL" options={options} onChange={() => {}} />);
    await userEvent.click(screen.getByRole("combobox", { name: /Role/ }));
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getAllByRole("option")).toHaveLength(3);
  });

  it("shows the count of each option", async () => {
    renderWithTheme(<Select label="Role" value="ALL" options={options} onChange={() => {}} />);
    await userEvent.click(screen.getByRole("combobox", { name: /Role/ }));
    expect(await screen.findByRole("option", { name: /Singer.*170/ })).toBeInTheDocument();
  });

  it("calls onChange with the chosen value", async () => {
    const onChange = vi.fn();
    renderWithTheme(<Select label="Role" value="ALL" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox", { name: /Role/ }));
    await userEvent.click(await screen.findByRole("option", { name: /Guitarist/ }));
    expect(onChange).toHaveBeenCalledWith("guitarist");
  });

  it("can be operated with the keyboard", async () => {
    const onChange = vi.fn();
    renderWithTheme(<Select label="Role" value="ALL" options={options} onChange={onChange} />);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("singer");
  });

  it("is disabled", () => {
    renderWithTheme(
      <Select label="Role" value="ALL" options={options} onChange={() => {}} disabled />
    );
    expect(screen.getByRole("combobox", { name: /Role/ })).toHaveAttribute("aria-disabled", "true");
  });

  it("shows the helper text", () => {
    renderWithTheme(
      <Select label="Role" value="ALL" options={options} onChange={() => {}} helperText="Filter by role" />
    );
    expect(screen.getByText("Filter by role")).toBeInTheDocument();
  });
});
