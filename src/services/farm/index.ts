import { ChainId } from "@/configs/type";
import { BigNumber, ethers } from "ethers";
import { Provider } from "@ethersproject/providers";
import { getContract } from "@/utils/constracts/get-contracts";
import { Address } from "wagmi";
import { getDinoFarmContract } from "../getContract";
import { formatBigNumberToNumber } from "@/utils/constracts/common";
import { getProvider } from "@/utils/wagmi/provider";
import { userAgent } from "next/server";

export const buy = async (
  chainId: ChainId,
  signer: ethers.Signer,
  amount: BigNumber,
  referral: Address = ethers.constants.AddressZero
) => {
  const dinoFarmContract = getDinoFarmContract(chainId!, signer);
  await dinoFarmContract.callStatic.buy(ethers.constants.AddressZero, {
    value: amount.toHexString(),
  });
  const tx: ethers.providers.TransactionResponse = await dinoFarmContract.buy(
    referral,
    {
      value: amount.toHexString(),
    }
  );
  const result: ethers.providers.TransactionReceipt = await tx.wait();

  // const decodedLogs = decodeTransactionLogsWithIface(
  //   stakingContract.interface,
  //   result.logs
  // );

  // const stakeEvent = decodedLogs.find((log) => log?.name === "StakingLoot");

  return {
    txHash: result.transactionHash,
    // user: stakeEvent?.args.user,
    // amount: formatBigNumberToNumber(stakeEvent?.args.amount ?? 0),
    // time: Number(stakeEvent?.args.time.toString()),
  };
};

export const compound = async (chainId: ChainId, signer: ethers.Signer) => {
  const dinoFarmContract = getDinoFarmContract(chainId!, signer);
  await dinoFarmContract.callStatic.compound();
  const tx: ethers.providers.TransactionResponse =
    await dinoFarmContract.compound();
  const result: ethers.providers.TransactionReceipt = await tx.wait();

  return {
    txHash: result.transactionHash,
  };
};

export const claim = async (chainId: ChainId, signer: ethers.Signer) => {
  const dinoFarmContract = getDinoFarmContract(chainId!, signer);
  await dinoFarmContract.callStatic.claim();
  const tx: ethers.providers.TransactionResponse =
    await dinoFarmContract.claim();
  const result: ethers.providers.TransactionReceipt = await tx.wait();

  return {
    txHash: result.transactionHash,
  };
};

export const getPoolStats = async (chainId: ChainId) => {
  const provider = getProvider(chainId);
  const dinoFarmContract = getDinoFarmContract(chainId!, provider);

  const [latestAPRAndPrice, tvl, conf] = await Promise.all([
    dinoFarmContract.getLatestAPRAndPrice(),
    dinoFarmContract.getTVL(),
    dinoFarmContract.getConfig(),
  ]);

  return {
    apr: +latestAPRAndPrice[0].toString() / 1000,
    tvl: tvl.toNumber() as number,
    fee: conf.fee as number,
  };
};

export const getUserStats = async (chainId: ChainId, address: Address) => {
  try {
    const provider = getProvider(chainId);
    const dinoFarmContract = getDinoFarmContract(chainId!, provider);

    const [user, useStats, ethPrice] = await Promise.all([
      dinoFarmContract.getUser(address),
      dinoFarmContract.getUserStats(address),
      dinoFarmContract.getEthPrice(),
    ]);

    return {
      egg: useStats[0] as BigNumber,
      eggUnclaim: useStats[1] as BigNumber,
      ethUnclaim: useStats[2] as BigNumber,
      ethEarned: useStats[3] as BigNumber,
      refEarned: useStats[4] as BigNumber,
      overApr: useStats[5] as boolean,
      ethPrice: ethPrice as BigNumber,
      farming: user.farming as BigNumber,
      // eggPrice: user.buyPrice as BigNumber,
    };
  } catch (error) {
    throw error;
  }
};

export const getEthPrice = async (chainId: ChainId) => {
  const provider = getProvider(chainId);
  const dinoFarmContract = getDinoFarmContract(chainId!, provider);

  const ethPrice = await dinoFarmContract.getEthPrice();

  return ethPrice as BigNumber;
};
