export const APP_URL: string =
    process.env.NEXT_PUBLIC_MODE === "production"
        ? "https://polysport.finance/"
        : "http://localhost:3000";

export const PAGE_SIZE = 10;

export enum GRADE {
    BRONZE = 0,
    SILVER = 1,
    GOLD = 2,
}

export const GRADE_PRICE = {
    [GRADE.BRONZE]: "100",
    [GRADE.SILVER]: "200",
    [GRADE.GOLD]: "300",
};

export const GAME_API =
    // http://localhost:5000/game";
    "https://api.polysport.finance/game";

export const IS_PROD: boolean = process.env.NEXT_PUBLIC_MODE === "production";
