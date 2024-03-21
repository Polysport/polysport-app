import DinoFarmAbi from "@/abis/DinoFarm.json";
import { getContractInstance } from "@/utils/constracts/common";
import { getContract } from "@/utils/constracts/get-contracts";
import { Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export const getDinoFarmContract = (
  chainId: number,
  providerOrSigner: Provider | ethers.Signer
) => {
  const address = getContract(chainId, "DINO_FARM");
  return getContractInstance(address, DinoFarmAbi, providerOrSigner);
};
