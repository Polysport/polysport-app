import { polygon } from "wagmi/chains";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ChainId, polygonAmoy } from "@/configs/type";

const polygonProvider = new JsonRpcProvider(
    polygon.rpcUrls.default.http[0],
    polygon.id
);

// const polygonMumbaiProvider = new JsonRpcProvider(
//     // polygonMumbai.rpcUrls.default.http[0],
//     "https://polygon-mumbai.blockpi.network/v1/rpc/public",
//     polygonMumbai.id
// );

const polygonAmoyProvider = new JsonRpcProvider(
    polygonAmoy.rpcUrls.default.http[0],
    polygonAmoy.id
);

export const PROVIDERS: { [chainId in ChainId]: JsonRpcProvider } = {
    [ChainId.POLYGON]: polygonProvider,
    [ChainId.POLYGON_AMOY]: polygonAmoyProvider,
};

export function getProvider(chainId: ChainId): JsonRpcProvider {
    if (!PROVIDERS[chainId]) {
        throw new Error(`Unknown provider for chainId ${chainId}`);
    }

    return PROVIDERS[chainId];
}
