import { configureChains, createClient } from "wagmi";
import { Chain, polygon, polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import {
  okxWallet,
  argentWallet,
  safeWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";

import memoize from "lodash/memoize";
import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { ChainId } from "@/configs/type";

export let CHAINS: Chain[] = [polygon, polygonMumbai];

let defaultChain: Chain = polygonMumbai;
if (process.env.NEXT_PUBLIC_MODE === "production") {
  defaultChain = polygon;
}

CHAINS = [defaultChain];
const projectId = "740582df3e4aab53da39c544d1f17fb3";

export const { chains, provider, webSocketProvider } = configureChains(CHAINS, [
  publicProvider(),
]);

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: "Test",
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId,
  },
});

// });
const { wallets } = getDefaultWallets({
  appName: "Test",
  projectId,
  chains,
});
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Popular",
    wallets: [okxWallet({ projectId, chains })],
  },
  {
    groupName: "Popular",
    wallets: [argentWallet({ projectId, chains })],
  },
  {
    groupName: "Popular",
    wallets: [safeWallet({ chains })],
  },
  {
    groupName: "Popular",
    wallets: [zerionWallet({ projectId, chains })],
  },
]);
export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  // webSocketProvider,
  connectors,
});

export const isChainSupported = memoize(
  (chainId: number, chainsIds?: ChainId[]) =>
    (chainsIds || chains.map((e) => e.id)).includes(Number(chainId)),
  (chainId: number, chainsIds?: ChainId[]) =>
    `${chainId}-${(chainsIds || chains.map((e) => e.id))
      .map((c) => c)
      .join("-")}`
);

export { defaultChain };
