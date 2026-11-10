import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { ContentRail } from "./ContentRail";

const items = [<p key="a">First</p>, <p key="b">Second</p>, <p key="c">Third</p>];

const originalScrollBy = Element.prototype.scrollBy;

beforeEach(() => {
  // jsdom does not implement scrollBy or layout: we simulate both.
  Element.prototype.scrollBy = vi.fn() as unknown as typeof Element.prototype.scrollBy;
  vi.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(500);
});

afterEach(() => {
  Element.prototype.scrollBy = originalScrollBy;
  vi.restoreAllMocks();
});

describe("ContentRail", () => {
  it("is a section named by its title", () => {
    renderWithTheme(<ContentRail title="Season 1">{items}</ContentRail>);
    expect(screen.getByRole("region", { name: "Season 1" })).toBeInTheDocument();
  });

  it("the title is a level 2 heading by default", () => {
    renderWithTheme(<ContentRail title="Season 1">{items}</ContentRail>);
    expect(screen.getByRole("heading", { level: 2, name: "Season 1" })).toBeInTheDocument();
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(
      <ContentRail title="Season 1" level={3}>
        {items}
      </ContentRail>
    );
    expect(screen.getByRole("heading", { level: 3, name: "Season 1" })).toBeInTheDocument();
  });

  it("puts each child in a list item", () => {
    renderWithTheme(<ContentRail title="Season 1">{items}</ContentRail>);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("scrolls forward with the next button", async () => {
    renderWithTheme(<ContentRail title="Season 1">{items}</ContentRail>);
    await userEvent.click(screen.getByRole("button", { name: "Scroll right" }));
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({ left: 400, behavior: "smooth" });
  });

  it("scrolls back with the previous button", async () => {
    renderWithTheme(<ContentRail title="Season 1">{items}</ContentRail>);
    await userEvent.click(screen.getByRole("button", { name: "Scroll left" }));
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({ left: -400, behavior: "smooth" });
  });

  it("allows customizing the arrow labels", () => {
    renderWithTheme(
      <ContentRail title="Season 1" previousLabel="Previous episodes" nextLabel="Next episodes">
        {items}
      </ContentRail>
    );
    expect(screen.getByRole("button", { name: "Previous episodes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next episodes" })).toBeInTheDocument();
  });

  it("shows the extra action", () => {
    renderWithTheme(
      <ContentRail title="Season 1" action={<a href="#all">See all</a>}>
        {items}
      </ContentRail>
    );
    expect(screen.getByRole("link", { name: "See all" })).toBeInTheDocument();
  });

  it("the scroll area can receive focus", async () => {
    const { container } = renderWithTheme(<ContentRail title="Season 1">{items}</ContentRail>);
    const scroller = container.querySelector('[tabindex="0"]');
    expect(scroller).toBeInTheDocument();
  });
});
