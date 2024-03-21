import { describe, expect, test } from "vitest";
import { capitalizedString } from "./letter";
import { formatDate } from "./datetime";

describe("datetime", () => {
  describe("convertDatetimeToUTC", () => {
    test("should be match with hours < 12", () => {
      const input = "2023-08-02T07:24:46.969Z";
      const output = formatDate(input);
      console.log(output);
      expect(output).toMatch("2023-08-02 07:24");
    });

    test("should be match with hours >= 12", () => {
      const input = "2023-08-02T14:24:46.969Z";
      const output = formatDate(input);
      console.log(output);
      expect(output).toMatch("2023-08-02 14:24");
    });
  });
});
