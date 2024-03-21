import { BigNumber, BigNumberish, constants } from "ethers";

export function bigNumberify(n: BigNumberish) {
  try {
    return BigNumber.from(n);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("bigNumberify error", e);
    return BigNumber.from("0");
  }
}

export function expandDecimals(n: BigNumberish, decimals: number): BigNumber {
  return bigNumberify(n).mul(bigNumberify(10).pow(decimals));
}

export const PRECISION = expandDecimals(1, 30);

export const USDG_ADDRESS = constants.AddressZero;
export const USDG_DECIMALS = 18;
export const STABLE_SWAP_FEE_BASIS_POINTS = 1;
export const SWAP_FEE_BASIS_POINTS = 25;
export const STABLE_TAX_BASIS_POINTS = 5;
export const TAX_BASIS_POINTS = 60;
export const BASIS_POINTS_DIVISOR = 10000;
export const MAX_ALLOWED_LEVERAGE = 50 * BASIS_POINTS_DIVISOR;
export const MAX_LEVERAGE = 100 * BASIS_POINTS_DIVISOR;

export const USD_DECIMALS = 30;
export const DUST_USD = expandDecimals(1, USD_DECIMALS);

export const MAX_REFERRAL_CODE_LENGTH = 20;

const adjustForDecimalsFactory = (n: number) => (number: BigNumber) => {
  if (n === 0) {
    return number;
  }
  if (n > 0) {
    return number.mul(expandDecimals(1, n));
  }
  return number.div(expandDecimals(1, -n));
};

export function adjustForDecimals(
  amount: BigNumber,
  divDecimals: number,
  mulDecimals: number
) {
  return amount
    .mul(expandDecimals(1, mulDecimals))
    .div(expandDecimals(1, divDecimals));
}

export function isHashZero(value: string) {
  return value === constants.HashZero;
}

export function isAddressZero(value: string) {
  return value === constants.AddressZero;
}

export const XLOOT_EXCHANGE_RATE = 15000;
