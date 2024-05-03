import { ChainId } from "@/configs/type";
import { getGamePoolContract } from "./getContract";
import { getProvider } from "@/utils/wagmi/provider";
import { BigNumber, ContractTransaction, Signer, ethers } from "ethers";
import { getContract } from "@/utils/constracts/get-contracts";
import { Address } from "wagmi";

export enum EWithdrawOrder {
    NOW,
    ONE_DAY,
    THREE_DAY,
}

export const getGamePoolReward = async (chainId: ChainId) => {
    const gamePoolContract = getGamePoolContract(
        chainId!,
        getProvider(chainId)
    );
    const reward = await gamePoolContract.getReward(
        getContract(chainId, "Token")
    );
    return ethers.utils.formatUnits(reward, 18);
};

export const getUserRewarded = async (chainId: ChainId, user: Address) => {
    const gamePoolContract = getGamePoolContract(
        chainId!,
        getProvider(chainId)
    );
    const reward = await gamePoolContract.getRewarded(
        getContract(chainId, "Token"),
        user
    );
    return ethers.utils.formatUnits(reward, 18);
};

export const createWithdraw = async (
    chainId: ChainId,
    signer: Signer,
    orderType: EWithdrawOrder,
    amount: BigNumber
) => {
    const gamePoolContract = getGamePoolContract(chainId!, signer);
    const token = getContract(chainId, "Token");
    await gamePoolContract.estimateGas.createWithdraw(token, orderType, amount);
    const tx: ContractTransaction = await gamePoolContract.createWithdraw(
        token,
        orderType,
        amount
    );

    const res = await tx.wait();
    return res;
};

export const decodeWithdrawEvent = (chainId: ChainId, log: any) => {
    const gamePoolContract = getGamePoolContract(
        chainId!,
        getProvider(chainId)
    );
    return gamePoolContract.interface.decodeEventLog(
        "NewWithdrawOrder",
        log.data,
        log.topics
    );
};

export const claim = async (
    chainId: ChainId,
    signer: Signer,
    orderId: BigNumber | number | string
) => {
    const gamePoolContract = getGamePoolContract(chainId!, signer);
    const token = getContract(chainId, "Token");
    await gamePoolContract.estimateGas.claim(token, orderId);
    const tx = await gamePoolContract.claim(token, orderId);

    await tx.wait();
    return tx;
};
