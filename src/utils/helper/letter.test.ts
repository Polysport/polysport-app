import { describe, expect, test } from "vitest";
import { capitalizedString } from "./letter";

describe("letter", () => {
  describe("capitalizedString", () => {
    test("should be match", () => {
      const input = "hello world";
      expect(capitalizedString(input)).toMatch("Hello world");
    });
  });
});
