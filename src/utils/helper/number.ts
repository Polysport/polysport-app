import { BigNumber, BigNumberish, ethers } from "ethers";
import {
    BASIS_POINTS_DIVISOR,
    PRECISION,
    USD_DECIMALS,
    bigNumberify,
} from "./legacy";
import { memoize } from "lodash";
import { formatUnits } from "ethers/lib/utils.js";

export const trimZeroDecimals = (amount: string) => {
    if (parseFloat(amount) === parseInt(amount)) {
        return parseInt(amount).toString();
    }
    return amount;
};

export const limitDecimals = (amount: BigNumberish, maxDecimals?: number) => {
    let amountStr = amount.toString();
    if (maxDecimals === undefined) {
        return amountStr;
    }
    if (maxDecimals === 0) {
        return amountStr.split(".")[0];
    }
    const dotIndex = amountStr.indexOf(".");
    if (dotIndex !== -1) {
        const decimals = amountStr.length - dotIndex - 1;
        if (decimals > maxDecimals) {
            amountStr = amountStr.substr(
                0,
                amountStr.length - (decimals - maxDecimals)
            );
        }
    }
    return amountStr;
};

export const padDecimals = (amount: BigNumberish, minDecimals: number) => {
    let amountStr = amount.toString();
    const dotIndex = amountStr.indexOf(".");
    if (dotIndex !== -1) {
        const decimals = amountStr.length - dotIndex - 1;
        if (decimals < minDecimals) {
            amountStr = amountStr.padEnd(
                amountStr.length + (minDecimals - decimals),
                "0"
            );
        }
    } else {
        amountStr = amountStr + ".0000";
    }
    return amountStr;
};

export function formatTokenAmountWithUsd(
    tokenAmount?: BigNumber,
    usdAmount?: BigNumber,
    tokenSymbol?: string,
    tokenDecimals?: number,
    opts: {
        fallbackToZero?: boolean;
        displayDecimals?: number;
    } = {}
) {
    if (!tokenAmount || !usdAmount || !tokenSymbol || !tokenDecimals) {
        if (!opts.fallbackToZero) {
            return undefined;
        }
    }

    return `${formatTokenAmount(
        tokenAmount,
        tokenDecimals,
        tokenSymbol,
        opts
    )} (${formatUsd(usdAmount, opts)})`;
}

const calculateMinDisplayed = memoize(
    (decimals: number, displayedDecimals: number): number => {
        return 10 ** decimals / 10 ** displayedDecimals;
    },
    (decimals, displayedDecimals) => `${decimals}#${displayedDecimals}`
);

export const formatAmount = (
    amount: BigNumberish | undefined,
    tokenDecimals: number,
    displayDecimals?: number,
    useCommas?: boolean,
    defaultValue?: string
) => {
    const minAmount = calculateMinDisplayed(
        tokenDecimals,
        displayDecimals ?? 4
    );
    if (
        BigNumber.from(amount).lt(BigNumber.from(minAmount)) &&
        BigNumber.from(amount).gt(0)
    ) {
        const minAmountDisplay = formatUnits(minAmount, tokenDecimals);
        return `<${minAmountDisplay}`;
    }

    if (!defaultValue) {
        defaultValue = "...";
    }
    if (amount === undefined || amount.toString().length === 0) {
        return defaultValue;
    }
    if (displayDecimals === undefined) {
        displayDecimals = 4;
    }
    let amountStr = ethers.utils.formatUnits(amount, tokenDecimals);
    amountStr = limitDecimals(amountStr, displayDecimals);
    if (displayDecimals !== 0) {
        amountStr = padDecimals(amountStr, displayDecimals);
    }
    if (useCommas) {
        return numberWithCommas(amountStr);
    }
    return amountStr;
};

export const formatAmountFree = (
    amount: BigNumberish,
    tokenDecimals: number,
    displayDecimals?: number
) => {
    if (!amount) {
        return "...";
    }
    let amountStr = ethers.utils.formatUnits(amount, tokenDecimals);
    amountStr = limitDecimals(amountStr, displayDecimals);
    return trimZeroDecimals(amountStr);
};

export const parseValue = (value: string, tokenDecimals: number) => {
    const pValue = parseFloat(value);

    if (isNaN(pValue)) {
        return undefined;
    }

    value = limitDecimals(value, tokenDecimals);
    const amount = ethers.utils.parseUnits(value, tokenDecimals);
    return bigNumberify(amount);
};

export function formatUsd(
    usd?: BigNumber,
    opts: { fallbackToZero?: boolean } = {}
) {
    const { fallbackToZero = false } = opts;

    if (!usd) {
        if (fallbackToZero) {
            usd = BigNumber.from(0);
        } else {
            return undefined;
        }
    }

    const sign = usd.lt(0) ? "-" : "";

    return `${sign}$${formatAmount(usd.abs(), USD_DECIMALS, 2, true)}`;
}

export function formatPercentage(
    percentage?: BigNumber,
    opts: { fallbackToZero?: boolean } = {}
) {
    if (!percentage) {
        if (opts.fallbackToZero) {
            return `${formatAmount(BigNumber.from(0), 2, 2)}%`;
        }

        return undefined;
    }

    return `${formatAmount(percentage, 2, 2)}%`;
}

export function formatTokenAmount(
    amount?: BigNumber,
    tokenDecimals?: number,
    symbol?: string,
    opts: {
        showAllSignificant?: boolean;
        displayDecimals?: number;
        fallbackToZero?: boolean;
    } = {}
) {
    const {
        displayDecimals = 4,
        showAllSignificant = false,
        fallbackToZero = false,
    } = opts;

    const symbolStr = symbol ? `${symbol}` : "";

    if (!amount || !tokenDecimals) {
        if (fallbackToZero) {
            amount = BigNumber.from(0);
            tokenDecimals = displayDecimals;
        } else {
            return undefined;
        }
    }

    const formattedAmount = showAllSignificant
        ? formatAmountFree(amount, tokenDecimals, tokenDecimals)
        : formatAmount(amount, tokenDecimals, displayDecimals);

    return `${formattedAmount} ${symbolStr}`;
}

export function roundUpDivision(a: BigNumber, b: BigNumber) {
    if (a.lt(0)) {
        return a.sub(b).add(1).div(b);
    }

    return a.add(b).sub(1).div(b);
}

export function applyFactor(value: BigNumber, factor: BigNumber) {
    return value.mul(factor).div(PRECISION);
}

export function getBasisPoints(numerator: BigNumber, denominator: BigNumber) {
    return numerator.mul(BASIS_POINTS_DIVISOR).div(denominator);
}

export function formatDeltaUsd(
    deltaUsd?: BigNumber,
    percentage?: BigNumber,
    opts: { fallbackToZero?: boolean } = {}
) {
    if (!deltaUsd) {
        if (opts.fallbackToZero) {
            return `${formatUsd(BigNumber.from(0))} (${formatAmount(
                BigNumber.from(0),
                2,
                2
            )}%)`;
        }

        return undefined;
    }

    let sign = "";
    if (!deltaUsd.eq(0)) {
        sign = deltaUsd?.gt(0) ? "+" : "-";
    }

    const percentageStr = percentage
        ? ` (${sign}${formatPercentage(percentage.abs())})`
        : "";

    return `${sign}${formatUsd(deltaUsd.abs())}${percentageStr}`;
}
export const toFixedSmallNumber = (x: number): number => {
    if (Math.abs(x) < 1.0) {
        const e = parseInt(x.toString().split("e-")[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = Number(`0.${"0".repeat(e)}${x.toString().substring(2)}`);
        }
    } else {
        let e = parseInt(x.toString().split("+")[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += Number(`0${"0".repeat(e + 1)}`);
        }
    }
    return x;
};

export function convertToInternationalCurrencySystem(labelValue: string | any) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
        ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
        ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
        : parseFloat(labelValue).toFixed(2);
}

export const currencyFormatter = (value: number, maxLength = 0) =>
    value?.toFixed(maxLength).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") || "0";

export const shortenString = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
        return text;
    }

    const halfLength = Math.floor((maxLength - 3) / 2);
    const firstHalf = text.slice(0, halfLength);
    const secondHalf = text.slice(text.length - halfLength);

    return `${firstHalf}...${secondHalf}`;
};

export const formatSmartNumber = (num: number | string): string => {
    if (typeof num === "string") {
        num = Number(num);
    }

    if (num >= 10) {
        return parseFloat(num.toFixed(1)).toString();
    } else if (num >= 1) {
        return parseFloat(num.toFixed(2)).toString();
    } else {
        let numberDecimalAfterZero = 7;

        // if (Number(num) >= 0.1) {
        // 	numberDecimalAfterZero = 4;
        // }

        const strNumber = num.toFixed(7).toString();
        const arr = strNumber.split(".");
        if (arr.length === 1) {
            return num.toString();
        }
        const decimal = arr[1];
        //find first non-zero number
        let index = 0;
        while (index < decimal.length && decimal[index] === "0") {
            index++;
        }
        if (index === decimal.length) {
            return parseFloat(num.toString()).toString();
        }

        let threeDecimal = decimal.slice(index, index + numberDecimalAfterZero);

        threeDecimal = Number(threeDecimal.split("").reverse().join(""))
            .toString()
            .split("")
            .reverse()
            .join("");

        return `${arr[0]}.${decimal.slice(0, index)}${threeDecimal}`;
    }
};

export function numberWithCommas(x: number | string | undefined) {
    return !x
        ? "0"
        : new Intl.NumberFormat("en-US", {
              maximumSignificantDigits: 7,
          }).format(+formatSmartNumber(x).toString());
    // .toString()
    //     .replace(/.(?=(?:.{3})+$)/g, "$&,")
    //     .toLocaleLowerCase()
    //     .replace(/\.0$/, "");
}
