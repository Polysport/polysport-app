export const APP_URL: string =
  process.env.NEXT_PUBLIC_MODE === "production"
    ? "https://polysport.finance/"
    : "http://localhost:3000";

export const PAGE_SIZE = 10;
