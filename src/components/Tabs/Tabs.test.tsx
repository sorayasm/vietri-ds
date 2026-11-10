import { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { Tabs, Tab } from "./Tabs";

function Demo({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState("a");
  return (
    <Tabs
      aria-label="Sections"
      value={value}
      onChange={(_event, next: string) => {
        setValue(next);
        onChange?.(next);
      }}
    >
      <Tab label="Map" value="a" />
      <Tab label="Timeline" value="b" />
    </Tabs>
  );
}

describe("Tabs", () => {
  it("exposes a tab list with an accessible name", () => {
    renderWithTheme(<Demo />);
    expect(screen.getByRole("tablist", { name: "Sections" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });

  it("marks the active tab as selected", () => {
    renderWithTheme(<Demo />);
    expect(screen.getByRole("tab", { name: "Map" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tab", { name: "Timeline" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  it("switches tab on click and reports it through onChange", async () => {
    const onChange = vi.fn();
    renderWithTheme(<Demo onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Timeline" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("tab", { name: "Timeline" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
