import { describe, expect, it } from "vitest";

import { getRouter } from "@/router";

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const matches = getRouter().matchRoutes("/");
    expect(matches.at(-1)?.routeId).toBe("/");
  });
});
