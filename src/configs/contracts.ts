import { Address } from "wagmi";
import { ChainId } from "./type";

export const CONTRACTS: {
    [chainId in ChainId]: { [key: string]: Address };
} = {
    [ChainId.POLYGON]: {
        Token: "0x860Ca4c7A60dCdc045BA1012c27788860cFa565f",
        USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        IDO: "0xBf802e7E9777e8C753e4f071F541Ecb8f858d874",
        NFT: "0xA074aa0032B8352B5c168Caad21F181C703e2C6e",
        // Token: "0x3B95dD4B8a6F476DBb81a16835d6aE39dD4e34f5", // TEST token
        GAME_POOL: "0xA76395ba5B15118a1522a18b4c70619886a693fB",
    },
    [ChainId.POLYGON_AMOY]: {
        NFT: "0x0186fC01Cb95687Be3519C8Af72C0A567B9d3283",
        Token: "0xB72b4cbe71C5e40EB7cBC098ef2d1Bae7E43D271",
        GAME_POOL: "0xA5C9b1e01aDe2B77278826843490fe797F25C331",
        USDT: "0x5b13A30A8c496595146ABeB9e9B07Fe3f3C21d11",
        IDO: "0x3EC51d1b21aefaBffB8054e445770A5F09a97C7c",
    },
};
