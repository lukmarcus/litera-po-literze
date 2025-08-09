import { describe, it, expect } from "vitest";
import { asset } from "./asset";

describe("asset", () => {
  it("returns correct path for image", () => {
    expect(asset("/images/foo.png")).toContain("images/foo.png");
  });
});
