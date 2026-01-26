import { useAccount, usePublicClient } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { amzTokenAbi as mainAbi } from "@/blockchain/generated";

export function useAllHistory(main, pageSize = 10) {
    const { address } = useAccount();
    const pc = usePublicClient();
    const enabled = Boolean(pc && main && address);

    const [loading, setLoading] = useState(false);

    // counts
    const [depTotal, setDepTotal] = useState(0);
    const [clmTotal, setClmTotal] = useState(0);
    const [refTotal, setRefTotal] = useState(0);
    const [vipTotal, setVipTotal] = useState(0);
    const [wdTotal, setWdTotal] = useState(0);
    const [sellTotal, setSellTotal] = useState(0);
    const [royaltyTotal, setRoyaltyTotal] = useState(0);

    // pages
    const [depPage, setDepPage] = useState(0);
    const [clmPage, setClmPage] = useState(0);
    const [refPage, setRefPage] = useState(0);
    const [vipPage, setVipPage] = useState(0);
    const [wdPage, setWdPage] = useState(0);
    const [sellPage, setSellPage] = useState(0);
    const [royaltyPage, setRoyaltyPage] = useState(0);

    // rows
    const [deposits, setDeposits] = useState([]);
    const [claims, setClaims] = useState([]);
    const [refAccr, setRefAccr] = useState([]);
    const [vipClms, setVipClms] = useState([]);
    const [withdraws, setWithdraws] = useState([]);
    const [sells, setSells] = useState([]);
    const [royalty, setRoyalty] = useState([]);

    const read = (fn, args = []) =>
        pc.readContract({ address: main, abi: mainAbi, functionName: fn, args });

    const loadCounts = useCallback(async () => {
        if (!enabled) return;
        try {
            const [d, c, r, v, w, s, ry] = await Promise.all([
                read("depositHistoryLength", [address]),
                read("claimHistoryLength", [address]),
                read("referralClaimHistoryLength", [address]),
                read("vipClaimHistoryLength", [address]),
                read("withdrawHistoryLength", [address]),
                read("sellHistoryLength", [address]),
                read("royaltyClaimHistoryLength", [address]),
            ]);
            setDepTotal(Number(d)); setClmTotal(Number(c));
            setRefTotal(Number(r)); setVipTotal(Number(v)); setWdTotal(Number(w));
            setSellTotal(Number(s));
            setRoyaltyTotal(Number(ry));
        } catch (e) {
            console.error("Failed to load history counts", e);
        }
    }, [enabled, main, address]);

    const loadPage = useCallback(async () => {
        if (!enabled) return;
        const depStart = depPage * pageSize;
        const clmStart = clmPage * pageSize;
        const refStart = refPage * pageSize;
        const vipStart = vipPage * pageSize;
        const wdStart = wdPage * pageSize;
        const sellStart = sellPage * pageSize;
        const royaltyStart = royaltyPage * pageSize;

        try {
            const [depRows, clmRows, rf, vp, wd, sell, royalties] = await Promise.all([
                read("getDepositHistory", [address, BigInt(depStart), BigInt(pageSize)]),
                read("getClaimHistory", [address, BigInt(clmStart), BigInt(pageSize)]),
                read("getReferralClaimHistory", [address, BigInt(refStart), BigInt(pageSize)]),
                read("getVIPClaimHistory", [address, BigInt(vipStart), BigInt(pageSize)]),
                read("getWithdrawHistory", [address, BigInt(wdStart), BigInt(pageSize)]),
                read("getSellHistory", [address, BigInt(sellStart), BigInt(pageSize)]),
                read("getRoyaltyClaimHistory", [address, BigInt(royaltyStart), BigInt(pageSize)]),
            ]);
            setDeposits(depRows); setClaims(clmRows);
            setRefAccr(rf); setVipClms(vp);
            setWithdraws(wd);
            setSells(sell);
            setRoyalty(royalties);
        } catch (e) {
            console.error("Failed to load history page", e);
        }
    }, [enabled, main, address, depPage, clmPage, refPage, vipPage, wdPage, royaltyPage, pageSize]);

    const refetch = useCallback(async () => {
        if (!enabled) return;
        setLoading(true);
        try {
            await loadCounts();
            await loadPage();
        } finally {
            setLoading(false);
        }
    }, [enabled, loadCounts, loadPage]);

    useEffect(() => {
        if (enabled) refetch();
    }, [enabled, refetch]);

    return {
        enabled, loading, pageSize,
        depTotal, clmTotal, refTotal, vipTotal, wdTotal, sellTotal, royaltyTotal,
        depPage, setDepPage, clmPage, setClmPage, refPage, setRefPage, vipPage, setVipPage, wdPage, setWdPage, setRoyaltyPage, royaltyPage,
        sellPage, setSellPage,
        deposits, claims, refAccr, vipClms, withdraws, sells, royalty,
        refetch,
    };
}
