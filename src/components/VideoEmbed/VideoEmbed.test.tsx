import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { VideoEmbed } from "./VideoEmbed";

describe("VideoEmbed", () => {
  it("by default shows a play button and loads nothing from YouTube", () => {
    const { container } = renderWithTheme(<VideoEmbed videoId="abc123XYZ_-" title="Premiere" />);
    expect(screen.getByRole("button", { name: "Play video: Premiere" })).toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("loads the player after pressing play, with autoplay", async () => {
    const { container } = renderWithTheme(<VideoEmbed videoId="abc123XYZ_-" title="Premiere" />);
    await userEvent.click(screen.getByRole("button", { name: "Play video: Premiere" }));
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("title", "Premiere");
    expect(iframe?.getAttribute("src")).toContain("https://www.youtube-nocookie.com/embed/abc123XYZ_-");
    expect(iframe?.getAttribute("src")).toContain("autoplay=1");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("with lazy={false} it loads right away and without autoplay", () => {
    const { container } = renderWithTheme(
      <VideoEmbed videoId="abc123XYZ_-" title="Premiere" lazy={false} />
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe?.getAttribute("src")).not.toContain("autoplay");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("the player has an accessible name and allows full screen", () => {
    renderWithTheme(<VideoEmbed videoId="abc123XYZ_-" title="Premiere" lazy={false} />);
    const iframe = screen.getByTitle("Premiere");
    expect(iframe).toHaveAttribute("allowfullscreen");
  });

  it("supports a start time", () => {
    const { container } = renderWithTheme(
      <VideoEmbed videoId="abc123XYZ_-" title="Premiere" lazy={false} start={42.9} />
    );
    expect(container.querySelector("iframe")?.getAttribute("src")).toContain("start=42");
  });

  it("encodes the video id", () => {
    const { container } = renderWithTheme(
      <VideoEmbed videoId={'x"><script>'} title="Premiere" lazy={false} />
    );
    const src = container.querySelector("iframe")?.getAttribute("src") ?? "";
    expect(src).not.toContain("<script>");
    expect(src).toContain(encodeURIComponent('x"><script>'));
  });

  it("allows customizing the play label", () => {
    renderWithTheme(<VideoEmbed videoId="abc123XYZ_-" title="Premiere" playLabel="Watch the premiere" />);
    expect(screen.getByRole("button", { name: "Watch the premiere" })).toBeInTheDocument();
  });

  it("the poster is decorative", () => {
    const { container } = renderWithTheme(
      <VideoEmbed videoId="abc123XYZ_-" title="Premiere" poster="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});
