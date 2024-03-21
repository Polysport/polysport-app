import { Address } from "wagmi";
import { ChainId } from "./type";

export const CONTRACTS: {
  [chainId in ChainId]: { [key: string]: Address };
} = {
  [ChainId.POLYGON]: {
    DINO_FARM: "0x73dCc54EADdFD6a94d33E4D0d0A611784626226f",
  },
  [ChainId.POLYGON_MUMBAI]: {
    DINO_FARM: "0xCBe2C934d9e542f6977a523c8E28e70796941c3A",
  },
};
