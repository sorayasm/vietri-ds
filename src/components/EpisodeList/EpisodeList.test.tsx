import { describe, it, expect, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { EpisodeList } from "./EpisodeList";

const episodes = [
  { id: "e1", number: 1, title: "Premiere", meta: "38:20", description: "The season opens" },
  { id: "e2", number: 2, title: "Interview" },
  { id: "e3", number: 3, title: "Finale" },
];

describe("EpisodeList", () => {
  it("is an ordered list with one item per episode", () => {
    renderWithTheme(<EpisodeList episodes={episodes} />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("each title is a level 3 heading by default", () => {
    renderWithTheme(<EpisodeList episodes={episodes} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<EpisodeList episodes={episodes} level={4} />);
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(3);
  });

  it("shows the episode label, meta and description", () => {
    renderWithTheme(<EpisodeList episodes={episodes} />);
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("38:20")).toBeInTheDocument();
    expect(screen.getByText("The season opens")).toBeInTheDocument();
  });

  it("allows customizing the episode label", () => {
    renderWithTheme(<EpisodeList episodes={episodes} episodeLabel={(n) => `Chapter ${n}`} />);
    expect(screen.getByText("Chapter 2")).toBeInTheDocument();
  });

  it("the list can have an accessible name", () => {
    renderWithTheme(<EpisodeList episodes={episodes} ariaLabel="Season 1" />);
    expect(screen.getByRole("list", { name: "Season 1" })).toBeInTheDocument();
  });

  it("without links or onSelect it is not interactive", () => {
    renderWithTheme(<EpisodeList episodes={episodes} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("episodes with href are links", () => {
    renderWithTheme(
      <EpisodeList episodes={[{ id: "e1", number: 1, title: "Premiere", href: "https://example.com/1" }]} />
    );
    expect(screen.getByRole("link", { name: "Premiere" })).toHaveAttribute("href", "https://example.com/1");
  });

  it("with onSelect every row is a button that reports its id", async () => {
    const onSelect = vi.fn();
    renderWithTheme(<EpisodeList episodes={episodes} onSelect={onSelect} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    await userEvent.click(screen.getByRole("button", { name: "Interview" }));
    expect(onSelect).toHaveBeenCalledWith("e2");
  });

  it("with onSelect a row can be activated with the keyboard", async () => {
    const onSelect = vi.fn();
    renderWithTheme(<EpisodeList episodes={episodes} onSelect={onSelect} />);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith("e1");
  });

  it("marks the current episode with aria-current and a visible label", () => {
    renderWithTheme(<EpisodeList episodes={episodes} currentId="e2" onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: "Interview" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: "Premiere" })).not.toHaveAttribute("aria-current");
    expect(screen.getByText(/Now playing/)).toBeInTheDocument();
  });
});
