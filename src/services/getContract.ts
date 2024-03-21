import NftAbi from "@/abis/nft.json";
import { getContractInstance } from "@/utils/constracts/common";
import { getContract } from "@/utils/constracts/get-contracts";
import { Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export const getNftContract = (
  chainId: number,
  providerOrSigner: Provider | ethers.Signer
) => {
  const address = getContract(chainId, "NFT");
  return getContractInstance(address, NftAbi, providerOrSigner);
};

export const getTokenContract = (
  chainId: number,
  providerOrSigner: Provider | ethers.Signer
) => {
  const address = getContract(chainId, "Token");
  return getContractInstance(address, NftAbi, providerOrSigner);
};
