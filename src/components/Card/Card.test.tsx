import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { Card, CardActionArea, CardContent } from "./Card";

describe("Card", () => {
  it("shows its content", () => {
    renderWithTheme(
      <Card>
        <CardContent>Vietri Design System</CardContent>
      </Card>
    );
    expect(screen.getByText("Vietri Design System")).toBeInTheDocument();
  });

  it("uses the outlined variant by default", () => {
    renderWithTheme(
      <Card data-testid="card">
        <CardContent>Content</CardContent>
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("MuiPaper-outlined");
  });

  it("CardActionArea is an accessible button that responds to clicks", async () => {
    const onClick = vi.fn();
    renderWithTheme(
      <Card>
        <CardActionArea onClick={onClick}>
          <CardContent>Open project</CardContent>
        </CardActionArea>
      </Card>
    );
    await userEvent.click(screen.getByRole("button", { name: "Open project" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("renders with the %s theme", (_name, theme) => {
    renderWithTheme(
      <Card>
        <CardContent>Content</CardContent>
      </Card>,
      theme
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
