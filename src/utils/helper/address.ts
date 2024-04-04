export const truncatedAddress = (address: string, start = 6, end = 4) =>
    `${address.slice(0, start)}...${address.slice(-end)}`;
