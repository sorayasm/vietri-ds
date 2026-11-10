import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { PlaylistCard } from "./PlaylistCard";

const platforms = [
  { name: "Spotify", href: "https://open.spotify.com/playlist/1" },
  { name: "YouTube Music", href: "https://music.youtube.com/playlist?list=1" },
  { name: "Amazon Music", href: "https://music.amazon.com/playlists/1" },
  { name: "YouTube", href: "https://www.youtube.com/playlist?list=1" },
];

describe("PlaylistCard", () => {
  it("the title is a level 3 heading by default", () => {
    renderWithTheme(<PlaylistCard title="Essentials" platforms={platforms} />);
    expect(screen.getByRole("heading", { level: 3, name: "Essentials" })).toBeInTheDocument();
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<PlaylistCard title="Essentials" platforms={platforms} level={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "Essentials" })).toBeInTheDocument();
  });

  it("shows the description", () => {
    renderWithTheme(
      <PlaylistCard title="Essentials" description="Women in the blues" platforms={platforms} />
    );
    expect(screen.getByText("Women in the blues")).toBeInTheDocument();
  });

  it("shows one link per platform inside a named list", () => {
    renderWithTheme(<PlaylistCard title="Essentials" platforms={platforms} />);
    const list = screen.getByRole("list", { name: "Listen on" });
    expect(within(list).getAllByRole("link")).toHaveLength(4);
  });

  it("each link name includes the platform, the playlist and that it opens a new tab", () => {
    renderWithTheme(<PlaylistCard title="Essentials" platforms={platforms} />);
    const link = screen.getByRole("link", { name: /^Spotify.*Essentials.*opens in a new tab/ });
    expect(link).toHaveAttribute("href", "https://open.spotify.com/playlist/1");
  });

  it("links open in a new tab safely", () => {
    renderWithTheme(<PlaylistCard title="Essentials" platforms={platforms} />);
    const link = screen.getByRole("link", { name: /^Amazon Music/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("allows customizing the texts", () => {
    renderWithTheme(
      <PlaylistCard
        title="Essentials"
        platforms={platforms}
        platformsLabel="Play on"
        externalLabel="(external site)"
      />
    );
    expect(screen.getByRole("list", { name: "Play on" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Spotify.*\(external site\)/ })).toBeInTheDocument();
  });

  it("without platforms it shows no list", () => {
    renderWithTheme(<PlaylistCard title="Essentials" platforms={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("the cover is decorative", () => {
    const { container } = renderWithTheme(
      <PlaylistCard
        title="Essentials"
        platforms={platforms}
        imageUrl="data:image/gif;base64,R0lGODlhAQABAAAAACw="
      />
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});
