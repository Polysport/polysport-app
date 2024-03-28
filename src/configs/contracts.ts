import { Address } from "wagmi";
import { ChainId } from "./type";

export const CONTRACTS: {
  [chainId in ChainId]: { [key: string]: Address };
} = {
  [ChainId.POLYGON]: {
    NFT: "0x22C71322DDc3c65226E9384401f4e246C0308e9e",
    Token: "0x0E683Ae0469a8996AEb4315a98D5cdAB0B64ab4a",
    POOL: "0xAaCc475360945acf3972554c2BfF6610F94ca8C8",
  },
  [ChainId.POLYGON_MUMBAI]: {
    NFT: "0x22C71322DDc3c65226E9384401f4e246C0308e9e",
    Token: "0x0E683Ae0469a8996AEb4315a98D5cdAB0B64ab4a",
    POOL: "0xAaCc475360945acf3972554c2BfF6610F94ca8C8",
  },
};
