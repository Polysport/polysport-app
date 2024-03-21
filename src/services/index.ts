import { ChainId } from "@/configs/type";
import { BigNumber, ethers } from "ethers";
import { Address } from "wagmi";
import { getNftContract, getTokenContract } from "./getContract";
import { getProvider } from "@/utils/wagmi/provider";
import { GRADE, GRADE_PRICE } from "@/configs";

export const mintNft = async (
  chainId: ChainId,
  signer: ethers.Signer,
  grade: GRADE
) => {
  const tokenContract = getTokenContract(chainId!, signer);
  const nftContract = getNftContract(chainId!, signer);

  const tokenAmount = ethers.utils.parseEther(GRADE_PRICE[grade]);

  let approveTx = await tokenContract.approve(nftContract.address, tokenAmount);
  await approveTx.wait();

  console.log(1, +grade);
  await nftContract.callStatic.mint(1, +grade);
  const tx: ethers.providers.TransactionResponse = await nftContract.mint(
    1,
    +grade
  );
  const result: ethers.providers.TransactionReceipt = await tx.wait();

  return {
    txHash: result.transactionHash,
  };
};

// export const compound = async (chainId: ChainId, signer: ethers.Signer) => {
//   const dinoFarmContract = getNftContract(chainId!, signer);
//   await dinoFarmContract.callStatic.compound();
//   const tx: ethers.providers.TransactionResponse =
//     await dinoFarmContract.compound();
//   const result: ethers.providers.TransactionReceipt = await tx.wait();

//   return {
//     txHash: result.transactionHash,
//   };
// };

// export const claim = async (chainId: ChainId, signer: ethers.Signer) => {
//   const dinoFarmContract = getNftContract(chainId!, signer);
//   await dinoFarmContract.callStatic.claim();
//   const tx: ethers.providers.TransactionResponse =
//     await dinoFarmContract.claim();
//   const result: ethers.providers.TransactionReceipt = await tx.wait();

//   return {
//     txHash: result.transactionHash,
//   };
// };

// export const getPoolStats = async (chainId: ChainId) => {
//   const provider = getProvider(chainId);
//   const dinoFarmContract = getNftContract(chainId!, provider);

//   const [latestAPRAndPrice, tvl, conf] = await Promise.all([
//     dinoFarmContract.getLatestAPRAndPrice(),
//     dinoFarmContract.getTVL(),
//     dinoFarmContract.getConfig(),
//   ]);

//   return {
//     apr: +latestAPRAndPrice[0].toString() / 1000,
//     tvl: tvl.toNumber() as number,
//     fee: conf.fee as number,
//   };
// };

// export const getUserStats = async (chainId: ChainId, address: Address) => {
//   try {
//     const provider = getProvider(chainId);
//     const dinoFarmContract = getNftContract(chainId!, provider);

//     const [user, useStats, ethPrice] = await Promise.all([
//       dinoFarmContract.getUser(address),
//       dinoFarmContract.getUserStats(address),
//       dinoFarmContract.getEthPrice(),
//     ]);

//     return {
//       egg: useStats[0] as BigNumber,
//       eggUnclaim: useStats[1] as BigNumber,
//       ethUnclaim: useStats[2] as BigNumber,
//       ethEarned: useStats[3] as BigNumber,
//       refEarned: useStats[4] as BigNumber,
//       overApr: useStats[5] as boolean,
//       ethPrice: ethPrice as BigNumber,
//       farming: user.farming as BigNumber,
//       // eggPrice: user.buyPrice as BigNumber,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// export const getEthPrice = async (chainId: ChainId) => {
//   const provider = getProvider(chainId);
//   const dinoFarmContract = getNftContract(chainId!, provider);

//   const ethPrice = await dinoFarmContract.getEthPrice();

//   return ethPrice as BigNumber;
// };
