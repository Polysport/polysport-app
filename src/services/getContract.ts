import NftAbi from "@/abis/nft.json";
import Erc20Abi from "@/abis/erc20.json";
import IdoAbi from "@/abis/ido.json";
import GamePoolAbi from "@/abis/game.json";
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
    return getContractInstance(address, Erc20Abi, providerOrSigner);
};

export const getUSDTContract = (
    chainId: number,
    providerOrSigner: Provider | ethers.Signer
) => {
    const address = getContract(chainId, "USDT");
    return getContractInstance(address, Erc20Abi, providerOrSigner);
};

export const getIDOContract = (
    chainId: number,
    providerOrSigner: Provider | ethers.Signer
) => {
    const address = getContract(chainId, "IDO");
    return getContractInstance(address, IdoAbi, providerOrSigner);
};

export const getGamePoolContract = (
    chainId: number,
    providerOrSigner: Provider | ethers.Signer
) => {
    const address = getContract(chainId, "GAME_POOL");
    return getContractInstance(address, GamePoolAbi, providerOrSigner);
};
