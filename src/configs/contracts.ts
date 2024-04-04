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
        NFT: "0x22C71322DDc3c65226E9384401f4e246C0308e9e",
        Token: "0x0E683Ae0469a8996AEb4315a98D5cdAB0B64ab4a",
        POOL: "0xAaCc475360945acf3972554c2BfF6610F94ca8C8",
        USDT: "0x5b13A30A8c496595146ABeB9e9B07Fe3f3C21d11",
        IDO: "0x3EC51d1b21aefaBffB8054e445770A5F09a97C7c",
    },
};
