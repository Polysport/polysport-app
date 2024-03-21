import { BigNumber } from "ethers";
import { create } from "zustand";

export const useRootStore = create<{
  ethPrice: BigNumber;
  revenues: Object;
  addRevenue: (k: string, v: string) => void;
}>((set) => ({
  ethPrice: BigNumber.from(0),
  revenues: {},
  addRevenue: (k: string, v: string) =>
    set((s) => ({ revenues: { ...s.revenues, [k]: v } })),
}));
