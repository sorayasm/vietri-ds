import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { Database } from "../Icon/icons";
import { FeatureCard } from "./FeatureCard";

describe("FeatureCard", () => {
  it("the title is a level 3 heading by default", () => {
    renderWithTheme(<FeatureCard icon={Database} title="Open data" />);
    expect(screen.getByRole("heading", { level: 3, name: "Open data" })).toBeInTheDocument();
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<FeatureCard icon={Database} title="Open data" level={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "Open data" })).toBeInTheDocument();
  });

  it("shows the description and the extra content", () => {
    renderWithTheme(
      <FeatureCard icon={Database} title="Open data" description="Downloadable">
        <span>Profiles</span>
      </FeatureCard>
    );
    expect(screen.getByText("Downloadable")).toBeInTheDocument();
    expect(screen.getByText("Profiles")).toBeInTheDocument();
  });

  it("the icon is decorative", () => {
    const { container } = renderWithTheme(<FeatureCard icon={Database} title="Open data" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
