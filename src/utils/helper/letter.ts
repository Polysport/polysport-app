import { describe, expect, test } from "vitest";

export function capitalizedString(input: string) {
  const firstLetter = input.charAt(0).toUpperCase();
  const capitalizedString = firstLetter + input.slice(1);
  return capitalizedString;
}
