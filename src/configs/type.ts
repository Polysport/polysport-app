import { polygon, polygonMumbai } from "wagmi/chains";

export enum ChainId {
    POLYGON = polygon.id,
    POLYGON_MUMBAI = polygonMumbai.id,
}
