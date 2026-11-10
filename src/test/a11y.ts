import axe from "axe-core";
import { expect } from "vitest";

/**
 * Runs axe-core (WCAG 2.0, 2.1 and 2.2 level A and AA rules) and fails if
 * there are violations, listing which ones. Color contrast is verified in the
 * theme tests instead, because jsdom does not compute real styles.
 */
export async function expectNoA11yViolations(context: Element = document.body) {
  const results = await axe.run(context, {
    iframes: false,
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
    },
    rules: { "color-contrast": { enabled: false } },
  });
  const summary = results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} → ${violation.nodes
        .map((node) => String(node.target))
        .join(" | ")}`,
  );
  expect(summary).toEqual([]);
}
