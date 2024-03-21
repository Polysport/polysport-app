import { BigNumber, Contract, Signer, ethers } from "ethers";
import { Provider } from "@ethersproject/providers";
import { isAddress } from "@ethersproject/address";

export function getContractInstance(
  address: string,
  ABI: any,
  signer?: Signer | Provider
): Contract {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  const signerOrProvider = signer;
  return new Contract(address, ABI, signerOrProvider);
}

export const formatBigNumberToNumber = (data: BigNumber): number => {
  if (!data) {
    return 0;
  }
  return Number(ethers.utils.formatEther(data?._hex ?? "0"));
};

export const formatNumber = (number: number) => {
  if (isNaN(number)) {
    return "Invalid number";
  }

  if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + "M";
  }

  if (number >= 1000) {
    return (number / 1000).toFixed(2) + "K";
  }

  return Number.isInteger(number)
    ? number.toString()
    : number.toFixed(2).toString();
};
