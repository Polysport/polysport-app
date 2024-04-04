import { BigNumber, Contract } from "ethers";
import { Provider } from "@ethersproject/providers";
import { bigNumberify } from "../helper/legacy";
import { ChainId } from "@/configs/type";
import { helperToast } from "../helper/helper-toast";
import { polygon, polygonMumbai } from "wagmi/chains";

export async function setGasPrice(
    txnOpts: any,
    provider: Provider,
    chainId: ChainId
) {
    let maxGasPrice = BigNumber.from(0);
    const premium = BigNumber.from(0);

    const gasPrice = await provider.getGasPrice();

    if (maxGasPrice) {
        if (gasPrice.gt(maxGasPrice)) {
            maxGasPrice = gasPrice;
        }

        const feeData = await provider.getFeeData();

        // the wallet provider might not return maxPriorityFeePerGas in feeData
        // in which case we should fallback to the usual getGasPrice flow handled below
        if (feeData && feeData.maxPriorityFeePerGas) {
            txnOpts.maxFeePerGas = feeData.maxFeePerGas;
            txnOpts.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
            return;
        }
    }

    txnOpts.gasPrice = gasPrice.add(premium);
    return;
}

export async function getGasLimit(
    contract: Contract,
    method: any,
    params: any[] = [],
    value?: BigNumber | number
) {
    const defaultValue = bigNumberify(0);

    if (!value) {
        value = defaultValue;
    }

    let gasLimit = await contract.estimateGas[method](...params, { value });

    if (gasLimit.lt(22000)) {
        gasLimit = bigNumberify(22000)!;
    }

    return gasLimit.mul(11000).div(10000); // add a 10% buffer
}

export function getExplorerUrl(chainId: ChainId) {
    if (chainId === polygon.id) {
        return "https://polygonscan.com/";
    } else if (polygonMumbai.id) {
        return "https://mumbai.polygonscan.com/";
    }
    return "https://polygonscan.com/";
}

export const callContract = async (
    chainId: ChainId,
    contract: Contract,
    method: string,
    params: any,
    opts: {
        value?: BigNumber | number;
        gasLimit?: BigNumber | number;
        gasPrice?: BigNumber | null | undefined;
        sentMsg?: string;
        successMsg?: string;
        hideSuccessMsg?: boolean;
        failMsg?: string;
        // setPendingTxns?: React.Dispatch<React.SetStateAction<Transaction[]>>;
    }
) => {
    try {
        if (
            !Array.isArray(params) &&
            typeof params === "object" &&
            opts === undefined
        ) {
            opts = params;
            params = [];
        }

        if (!opts) {
            opts = {};
        }

        const txnOpts: any = {};

        if (opts.value) {
            txnOpts.value = opts.value;
        }
        txnOpts.gasLimit = opts.gasLimit
            ? opts.gasLimit
            : await getGasLimit(contract, method, params, opts.value);

        await setGasPrice(txnOpts, contract.provider, chainId);
        const res = await contract[method](...params, txnOpts);
        const txUrl = getExplorerUrl(chainId) + "tx/" + res.hash;
        const sentMsg = opts.sentMsg || "Transaction sent.";
        helperToast.success(
            <div>
                {sentMsg}{" "}
                <a target="_blank" href={txUrl} rel="noopener noreferrer">
                    View status.
                </a>
                <br />
            </div>
        );

        // if (opts.setPendingTxns) {
        //   const message = opts.hideSuccessMsg
        //     ? undefined
        //     : opts.successMsg || "Transaction completed!";
        //   const pendingTxn: Transaction = {
        //     hash: res.hash,
        //     message,
        //   };
        //   opts.setPendingTxns((pendingTxns) => [...pendingTxns, pendingTxn]);
        // }

        return res;
    } catch (error: any) {
        let message: string;
        if (typeof (error as any)?.data?.data === "object") {
            message = error?.data?.data?.message;
        } else if (typeof error?.data?.message === "string") {
            message = error?.data?.message;
        } else if (
            error.reason?.toLowerCase().includes("user rejected transaction")
        ) {
            message = `Action was cancelled`;
        } else {
            message = "Oops! Something went wrong!";
        }

        console.log(
            "%cerror callCalltract.tsx line:23 ",
            "color: red; display: block; width: 100%;",
            error
        );
        helperToast.error(<div>{message}</div>);
        return false;
    }
};
