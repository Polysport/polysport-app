import { polygon, polygonMumbai } from "wagmi/chains";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ChainId } from "@/configs/type";
const polygonProvider = new JsonRpcProvider(
  polygon.rpcUrls.default.http[0],
  polygon.id
);

const polygonMumbaiProvider = new JsonRpcProvider(
  polygonMumbai.rpcUrls.default.http[0],
  polygonMumbai.id
);

export const PROVIDERS: { [chainId in ChainId]: JsonRpcProvider } = {
  [ChainId.POLYGON]: polygonProvider,
  [ChainId.POLYGON_MUMBAI]: polygonMumbaiProvider,
};

export function getProvider(chainId: ChainId): JsonRpcProvider {
  if (!PROVIDERS[chainId]) {
    throw new Error(`Unknown provider for chainId ${chainId}`);
  }

  return PROVIDERS[chainId];
}
