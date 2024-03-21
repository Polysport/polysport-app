import { Contract, Signer } from "ethers";
import { CONTRACTS } from "@/configs/contracts";
import { ChainId } from "@/configs/type";
import { Address } from "wagmi";

export function getContract(chainId: ChainId, name: string): Address {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}
