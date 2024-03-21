import { BigNumber } from "ethers";
import { formatAmount } from "../helper/number";
import { describe, expect, it } from "vitest";
import { parseEther } from "ethers/lib/utils.js";

describe("formatAmount", () => {
  it.each`
    value                      | expectedValueFormatted
    ${"0"}                     | ${"0.0000"}
    ${"5099272043173"}         | ${"<0.0001"}
    ${"1000000000000"}         | ${"<0.0001"}
    ${"10000000000000"}        | ${"<0.0001"}
    ${"100000000000000"}       | ${"0.0001"}
    ${"1000000000000000"}      | ${"0.0010"}
    ${"10000000000000000"}     | ${"0.0100"}
    ${"100000000000000000"}    | ${"0.1000"}
    ${"1000000000000000000"}   | ${"1.0000"}
    ${"10000000000000000000"}  | ${"10.0000"}
    ${"100000000000000000000"} | ${"100.0000"}
  `(
    "should format $priceDifference to $expectedPriceDifferenceFormatted",
    ({ value, expectedValueFormatted }) =>
      expect(formatAmount(BigNumber.from(value), 18, 4)).toEqual(
        expectedValueFormatted
      )
  );

  it("format rewards", () => {
    const input = "0.14361125648501790";

    const output = formatAmount(parseEther(input), 18, 4);

    expect(output).toMatch("0.1436");
  });
});
