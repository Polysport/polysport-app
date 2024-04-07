import { EPool } from "@/app/ido/utils";
import { ChainId } from "@/configs/type";
import { getProvider } from "@/utils/wagmi/provider";
import { BigNumber, Signer, ethers } from "ethers";
import { getIDOContract, getUSDTContract } from "./getContract";
import { Address } from "wagmi";
import { getContract } from "@/utils/constracts/get-contracts";
import { IS_PROD } from "@/configs";

export const getIdoPoolStats = async (chainId: ChainId, ePool: EPool) => {
    const idoContract = getIDOContract(chainId!, getProvider(chainId));
    const stats = await idoContract.getPoolStats(ePool);
    return {
        committed: ethers.utils.formatUnits(stats.committed, IS_PROD ? 6 : 18),
        contributors: stats.contributors.toNumber(),
    };
};

export const getUserStats = async (
    chainId: ChainId,
    ePool: EPool,
    account: Address
) => {
    const idoContract = getIDOContract(chainId!, getProvider(chainId));
    const [stats, isWhitelist] = await Promise.all([
        idoContract.getUser(ePool, account),
        idoContract.isWhitelist(ePool, account),
    ]);
    return {
        committed: ethers.utils.formatEther(stats.committed),
        claimedCount: stats.claimedCount.toNumber(),
        isWhitelist,
    };
};

export const commit = async (
    chainId: ChainId,
    ePool: EPool,
    signer: Signer,
    address: Address,
    amount: BigNumber
) => {
    const idoContract = getIDOContract(chainId!, signer);

    const usdtContract = getUSDTContract(chainId!, signer);
    const allowance = await usdtContract.allowance(
        address,
        idoContract.address
    );
    if (allowance.lt(amount)) {
        await usdtContract
            .approve(idoContract.address, amount)
            .then((tx: any) => tx.wait());
    }

    await idoContract.estimateGas.commit(ePool, amount);

    const tx = await idoContract.commit(ePool, amount);
    await tx.wait();

    return tx;
};

export const claim = async (chainId: ChainId, ePool: EPool, signer: Signer) => {
    const idoContract = getIDOContract(chainId!, signer);

    await idoContract.estimateGas.claim(ePool);

    const tx = await idoContract.claim(ePool);
    await tx.wait();

    return tx;
};
