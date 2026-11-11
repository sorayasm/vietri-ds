import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { MediaCard } from "./MediaCard";

describe("MediaCard", () => {
  it("the title is a level 3 heading by default", () => {
    renderWithTheme(<MediaCard title="Episode 1" />);
    expect(screen.getByRole("heading", { level: 3, name: "Episode 1" })).toBeInTheDocument();
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<MediaCard title="Episode 1" level={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "Episode 1" })).toBeInTheDocument();
  });

  it("shows the meta, subtitle, duration and badge", () => {
    renderWithTheme(
      <MediaCard
        title="Episode 1"
        meta="Season 1 · Episode 1"
        subtitle="Interview"
        duration="42:10"
        badge="New"
      />
    );
    expect(screen.getByText("Season 1 · Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Interview")).toBeInTheDocument();
    expect(screen.getByText("42:10")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("without href or onClick it is not interactive", () => {
    renderWithTheme(<MediaCard title="Episode 1" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("with href the title is a link inside the heading", () => {
    renderWithTheme(<MediaCard title="Episode 1" href="https://example.com/1" />);
    const link = screen.getByRole("link", { name: "Episode 1" });
    expect(link).toHaveAttribute("href", "https://example.com/1");
    expect(screen.getByRole("heading", { level: 3 })).toContainElement(link);
  });

  it("with onClick the title is a button that responds to click", async () => {
    const onClick = vi.fn();
    renderWithTheme(<MediaCard title="Episode 1" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Episode 1" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("with onClick it can be activated with the keyboard", async () => {
    const onClick = vi.fn();
    renderWithTheme(<MediaCard title="Episode 1" onClick={onClick} />);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Episode 1" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("the thumbnail is decorative", () => {
    const { container } = renderWithTheme(
      <MediaCard title="Episode 1" imageUrl="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("the play icon is hidden from screen readers", () => {
    const { container } = renderWithTheme(<MediaCard title="Episode 1" />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("the play icon can be turned off", () => {
    const { container } = renderWithTheme(<MediaCard title="Episode 1" playIcon={false} />);
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it("accepts another shape for the picture (a square flyer)", () => {
    renderWithTheme(<MediaCard title="Episode 1" aspectRatio="1 / 1" />);
    expect(screen.getByRole("heading", { level: 3, name: "Episode 1" })).toBeInTheDocument();
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("renders with the %s theme", (_name, theme) => {
    renderWithTheme(<MediaCard title="Episode 1" />, theme);
    expect(screen.getByRole("heading", { name: "Episode 1" })).toBeInTheDocument();
  });
});
