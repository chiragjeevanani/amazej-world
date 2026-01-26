import { formatEther } from "viem";

export const roundsNumber = (number, decimals = 2) => {
    return Number(number).toFixed(decimals);
}

export const roundWithFormat = (number, decimals = 2) => {
    return roundsNumber(formatEther(number || 0n), decimals);
}

export async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shortAddress(addr) {
    return addr
        ? addr.slice(0, 6) + "..." + addr.slice(-3)
        : "";
}
