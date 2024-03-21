import { Address } from "wagmi";
import { ChainId } from "./type";

export const CONTRACTS: {
  [chainId in ChainId]: { [key: string]: Address };
} = {
  [ChainId.POLYGON]: {
    NFT: "0x73dCc54EADdFD6a94d33E4D0d0A611784626226f",
    Token: "0x73dCc54EADdFD6a94d33E4D0d0A611784626226f",
  },
  [ChainId.POLYGON_MUMBAI]: {
    NFT: "0x9019875E88B11193b400d117576f65c92E41B1e0",
    Token: "0x0E683Ae0469a8996AEb4315a98D5cdAB0B64ab4a",
  },
};
