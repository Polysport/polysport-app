import { create } from "zustand";

export const useRootStore = create<{
  txHash: string;
}>((set) => ({
  txHash: "",
}));
