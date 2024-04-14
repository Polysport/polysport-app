import { Chain, polygon } from "wagmi/chains";

export const polygonAmoy: Chain = {
    id: 80002,
    name: "Polygon Amoy",
    network: "maticamoy",
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["https://rpc-amoy.polygon.technology"],
        },
        public: {
            http: ["https://rpc-amoy.polygon.technology"],
        },
    },
    blockExplorers: {
        default: {
            name: "PolygonScan",
            url: "https://www.oklink.com/amoy",
        },
    },
};

export enum ChainId {
    POLYGON = polygon.id,
    // POLYGON_MUMBAI = polygonMumbai.id,
    POLYGON_AMOY = polygonAmoy.id,
}
