import { Address } from "wagmi";
import { ChainId } from "./type";

export const CONTRACTS: {
    [chainId in ChainId]: { [key: string]: Address };
} = {
    [ChainId.POLYGON]: {
        Token: "0x860Ca4c7A60dCdc045BA1012c27788860cFa565f",
        USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        IDO: "0xBf802e7E9777e8C753e4f071F541Ecb8f858d874",
    },
    [ChainId.POLYGON_MUMBAI]: {
        NFT: "0x6a61eA3f02EE737488bba9DaD4CF717aD4451316",
        Token: "0x510AeBd7Ff5CDE49Dd99F4C839fE533979B10C7E",
        GAME_POOL: "0x48cD63E748C6D1bC2d4d40DF1Df379B91f504E6E",
        USDT: "0x5b13A30A8c496595146ABeB9e9B07Fe3f3C21d11",
        IDO: "0x3EC51d1b21aefaBffB8054e445770A5F09a97C7c",
    },
};
