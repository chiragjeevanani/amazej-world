import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, usePublicClient, useReadContracts, useWriteContract } from "wagmi";
import { erc20Abi, getAddress } from "viem";
import { contracts, DEFAULT_REFERRER } from "@/blockchain/contracts";
import {
    amzTokenAbi as mainAbi,
    treasuryAbi,
    vipModuleAbi,
    amzGlobalRoyaltyAbi,
} from "@/blockchain/abis";
import { toast } from "react-hot-toast";
import { getQueryVar } from "@/blockchain/query";
import { roundWithFormat } from "@/blockchain/roundsNumber";
import { useAllHistory } from "@/contexts/useHistory";

const ProtocolContext = createContext(null);

export function useProtocol() {
    const ctx = useContext(ProtocolContext);
    if (!ctx) throw new Error("useProtocol must be used within <ProtocolProvider>");
    return ctx;
}

function nowSec() {
    return BigInt(Math.floor(Date.now() / 1000));
}

export function ProtocolProvider({ children }) {
    const { address } = useAccount();
    const chainId = useChainId();
    const publicClient = usePublicClient();
    const { writeContractAsync } = useWriteContract();

    const addrs = contracts[chainId] || undefined;
    const main = addrs?.main;
    const royalty = addrs?.royalty;
    const treasury = addrs?.treasury;
    const vipC = addrs?.vip;
    const usdt = addrs?.usdt;

    const enabled = Boolean(address && main && usdt);

    const CALLS = useMemo(() => {
        if (!enabled) return [];
        const acct = address;
        const m = main;
        const u = usdt;
        return [
            { address: m, abi: mainAbi, functionName: "priceInCentsPerToken" },
            { address: m, abi: mainAbi, functionName: "rewardPeriod" },
            { address: m, abi: mainAbi, functionName: "claimFeeBps" },
            { address: m, abi: mainAbi, functionName: "directRefPercent" },
            { address: m, abi: mainAbi, functionName: "pendingAllRewardsTokens", args: [acct] },
            { address: m, abi: mainAbi, functionName: "getReferralInfo", args: [acct] },
            { address: m, abi: mainAbi, functionName: "getUser", args: [acct] },
            { address: m, abi: erc20Abi, functionName: "balanceOf", args: [acct] },
            { address: u, abi: erc20Abi, functionName: "balanceOf", args: [acct] },
            { address: u, abi: erc20Abi, functionName: "allowance", args: [acct, m] },
            { address: u, abi: erc20Abi, functionName: "decimals" },
            { address: m, abi: mainAbi, functionName: "getWithdrawInfo", args: [acct] },
            { address: m, abi: mainAbi, functionName: "DAY", args: [] },
            { address: m, abi: erc20Abi, functionName: "totalSupply", args: [] },
            { address: u, abi: erc20Abi, functionName: "balanceOf", args: [m] },
            { address: m, abi: mainAbi, functionName: "getDeepReferralStatus", args: [acct] },
            { address: m, abi: mainAbi, functionName: "claimsBlocked", args: [acct, 0] },
            { address: u, abi: erc20Abi, functionName: "balanceOf", args: [royalty] },
        ];
    }, [enabled, address, main, usdt, royalty]);

    const { data: mcData, refetch } = useReadContracts({
        contracts: CALLS,
        query: {
            enabled,
            refetchInterval: 10000,
        }
    });

    const VIP_CALLS = useMemo(() => {
        if (!enabled || !vipC) return [];
        const acct = address;
        return [
            { address: vipC, abi: vipModuleAbi, functionName: "getUserStateView", args: [acct] },
            { address: vipC, abi: vipModuleAbi, functionName: "getClaimableCents", args: [acct] },
            { address: vipC, abi: vipModuleAbi, functionName: "getVipProgress", args: [acct] },
            { address: vipC, abi: vipModuleAbi, functionName: "getRedeProgress", args: [acct] },
            { address: vipC, abi: vipModuleAbi, functionName: "currentTrack", args: [acct] },
            { address: vipC, abi: vipModuleAbi, functionName: "getAllLevelTables", args: [] },
        ];
    }, [enabled, address, vipC]);

    const { data: vipData, refetch: vipRefetch } = useReadContracts({
        contracts: VIP_CALLS,
        query: {
            enabled,
            refetchInterval: 10000,
        }
    });

    const ROYALTY_CALLS = useMemo(() => {
        if (!enabled || !royalty) return [];
        const acct = address;
        return [
            { address: royalty, abi: amzGlobalRoyaltyAbi, functionName: "getMemberDetails", args: [acct] },
            { address: royalty, abi: amzGlobalRoyaltyAbi, functionName: "getRoyaltyPoolStatus" },
        ];
    }, [enabled, address, royalty]);

    const { data: royaltyData, refetch: royaltyRefetch } = useReadContracts({
        contracts: ROYALTY_CALLS,
        query: { enabled, refetchInterval: 10000 }
    });

    const RY = useCallback((i) => royaltyData && royaltyData[i] && royaltyData[i].status === "success" ? royaltyData[i].result : undefined, [royaltyData]);
    const memberDetailsTuple = RY(0);
    const poolStatusTuple = RY(1);

    const earningLevel = Number(memberDetailsTuple?.[1] || 0);
    const { data: earningData, refetch: earningRefetch } = useReadContracts({
        contracts: (enabled && royalty && earningLevel > 0) ? [
            { address: royalty, abi: amzGlobalRoyaltyAbi, functionName: "getExpectedDailyEarning", args: [earningLevel] }
        ] : [],
        query: { enabled: enabled && royalty && earningLevel > 0, refetchInterval: 10000 }
    });

    const expectedEarning = earningData?.[0]?.status === "success" ? earningData[0].result : undefined;

    function R(i) { return mcData && mcData[i] && mcData[i].status === "success" ? mcData[i].result : undefined; }
    function V(i) { return vipData && vipData[i] && vipData[i].status === "success" ? vipData[i].result : undefined; }

    const priceCents = R(0);
    const rewardPeriod = R(1);
    const claimFeeBps = R(2);
    const directRefPercent = R(3);
    const pendingTuple = R(4);
    const referralTuple = R(5);
    const userTuple = R(6);
    const tokenBalance = R(7);
    const usdtBalance = R(8);
    const usdtAllowance = R(9);
    const usdtDecimals = R(10) ?? 18;
    const withdrawTuple = R(11);
    const claimPeriod = R(12);
    const contractTokenBalance = R(13);
    const contractUsdtBalance = R(14);
    const deepReferralStatus = R(15);
    const claimsBlocked = R(16);
    const usdtRoyalty = R(17);

    const vipTuple = V(0);
    const claimVipUSDT = V(1);
    const tablesTuple = V(5);

    const user = useMemo(() => {
        if (!userTuple) return undefined;
        try {
            const [hasPlan, baseUSDCents, nextPhase, a, b, c, totalDepositedCents, totalRewardsCents, referrer] = userTuple;
            return {
                hasPlan,
                baseUSDCents,
                nextPhase: Number(nextPhase ?? 0),
                baseTranche: { ...a, active: !claimsBlocked, amountUSDCents: a?.amountUSDCents || 0n, needsReactivate: !!a?.needsReactivate, wasActiveBeforeGate: !!a?.wasActiveBeforeGate },
                halfTranche: { ...b, active: !claimsBlocked, amountUSDCents: b?.amountUSDCents || 0n, needsReactivate: !!b?.needsReactivate, wasActiveBeforeGate: !!b?.wasActiveBeforeGate },
                quarterTranche: { ...c, active: !claimsBlocked, amountUSDCents: c?.amountUSDCents || 0n, needsReactivate: !!c?.needsReactivate, wasActiveBeforeGate: !!c?.wasActiveBeforeGate },
                totalDepositedUSDCents: totalDepositedCents,
                totalRewardsUSDCents: totalRewardsCents,
                referrer,
                nextClaimAt: !claimsBlocked ? userTuple[9] : undefined,
                depositAllowedAt: userTuple[11]
            };
        } catch { return undefined; }
    }, [userTuple, claimsBlocked]);

    const claimVip = useMemo(() => {
        if (!claimVipUSDT) return undefined;
        return { amountUSDT: claimVipUSDT[0] + claimVipUSDT[1], reAmountUSDT: claimVipUSDT[1] };
    }, [claimVipUSDT]);

    const withdraw = useMemo(() => {
        if (!withdrawTuple) return undefined;
        const [availableWithdraw, availableWithdrawTokens, totalWithdrawn, totalTokensWithdrawn, lastReferralClaimAt] = withdrawTuple;
        return { availableWithdraw, availableWithdrawTokens, totalWithdrawn, totalTokensWithdrawn, lastReferralClaimAt };
    }, [withdrawTuple]);

    const pending = useMemo(() => {
        if (!pendingTuple) return undefined;
        const [total, p0, p1, p2] = pendingTuple;
        return { total, p0, p1, p2 };
    }, [pendingTuple]);

    const referral = useMemo(() => {
        if (!referralTuple || !deepReferralStatus) return undefined;
        const [availableReferralTokens, availableReferralUSDCents, lastReferralClaimAt, directReferrals, teamMembers, teamDepositsCents, teamReferralUSDCents] = referralTuple;
        const [unlocked, directsInWindow, windowStart, windowEnd] = deepReferralStatus;
        return {
            availableReferralTokens, availableReferralUSDCents, lastReferralClaimAt,
            directReferrals: Number(directReferrals), teamMembers, teamDepositsCents, teamReferralUSDCents,
            unlocked, directsInWindow: Number(directsInWindow), windowStart, windowEnd
        };
    }, [referralTuple, deepReferralStatus]);

    const vipDataState = useMemo(() => vipTuple, [vipTuple]);

    const vipTables = useMemo(() => {
        if (!tablesTuple) return undefined;
        const [selfCents, directsMin, directsVip1Min, teamMin, perClaimCents, oneTimeCents, redeAllowed, periodSeconds] = tablesTuple;
        return { selfCents, directsMin, directsVip1Min, teamMin, perClaimCents, oneTimeCents, vipPerClaimCents: perClaimCents, vipOneTimeCents: oneTimeCents, redeAllowed, periodSeconds };
    }, [tablesTuple]);

    const royaltyInfo = useMemo(() => {
        if (!memberDetailsTuple) return undefined;
        const [isActive, activeLevel, claimDaysUsed, claimDaysRemaining, totalClaimed, lastClaimDate, isPermanent, waitlistPosition, activeMembersCount, canClaim] = memberDetailsTuple;
        return {
            isActive, activeLevel: Number(activeLevel), claimDaysUsed, claimDaysRemaining, totalClaimed,
            lastClaimDate, isPermanent, waitlistPosition, activeMembersCount, canClaim,
            poolStats: poolStatusTuple ? {
                totalPool: poolStatusTuple[0],
                dailyPool: poolStatusTuple[1],
                lastDistribution: poolStatusTuple[2],
                canDistribute: poolStatusTuple[3]
            } : undefined,
            expectedEarning: expectedEarning,
            contractBalance: usdtRoyalty,
            usdt: expectedEarning // Map expectedEarning to .usdt for convenience in UI
        };
    }, [memberDetailsTuple, poolStatusTuple, expectedEarning, usdtRoyalty]);

    const tokenBalanceFmt = tokenBalance !== undefined ? roundWithFormat(tokenBalance) : undefined;
    const usdtBalanceFmt = usdtBalance !== undefined ? roundWithFormat(usdtBalance, 2) : undefined;
    const priceUSD = priceCents !== undefined ? (Number(priceCents) / 10 ** 18).toFixed(6) : undefined;
    const contractTokenBalanceFmt = contractTokenBalance !== undefined ? roundWithFormat(contractTokenBalance) : undefined;
    const contractUsdtBalanceFmt = contractUsdtBalance !== undefined ? roundWithFormat(contractUsdtBalance, 2) : undefined;

    const [loading, setLoading] = useState({
        approveUsdt: false, deposit: false, sell: false, claimAll: false, claimRoyalty: false, distributeTokens: false, claimPhase: false, claimReferral: false, claimVIP: false, setReferrer: false,
    });


    const runTx = useCallback(async (key, label, txFn) => {
        setLoading((s) => ({ ...s, [key]: true }));
        try {
            const h = await txFn();
            const receipt = await publicClient.waitForTransactionReceipt({ hash: h });
            toast.success(`${label} confirmed`);
            refetch();
            return h;
        } catch (e) {
            toast.error(e?.shortMessage || e?.message || "Transaction failed");
            throw e;
        } finally {
            setLoading((s) => ({ ...s, [key]: false }));
        }
    }, [publicClient, refetch]);

    const claimRoyalty = useCallback(() => runTx("claimRoyalty", "Claim Royalty Rewards", () => writeContractAsync({
        address: royalty, abi: amzGlobalRoyaltyAbi, functionName: "distributeDailyRoyalty"
    })), [royalty, writeContractAsync, runTx]);

    const approveUsdtIfNeeded = useCallback(async (cents, decs = usdtDecimals) => {
        if (!address || !usdt || !main) throw new Error("Missing config");
        const required = (cents * BigInt(10 ** decs)) / 100n;
        if ((usdtAllowance ?? 0n) >= required) return "0x";
        return runTx("approveUsdt", "Approve USDT", () => writeContractAsync({
            address: usdt, abi: erc20Abi, functionName: "approve", args: [main, 2n ** 256n - 1n]
        }));
    }, [address, usdt, main, usdtAllowance, usdtDecimals, writeContractAsync, runTx]);

    const deposit = useCallback(async (cents) => {
        if (!main) throw new Error("No contract");
        const referrer = getQueryVar('ref_id') || DEFAULT_REFERRER;
        return runTx("deposit", "Deposit", () => writeContractAsync({
            address: main, abi: mainAbi, functionName: "deposit", args: [cents, referrer]
        }));
    }, [main, writeContractAsync, runTx]);

    const claimAll = useCallback(() => runTx("claimAll", "Claim Rewards", () => writeContractAsync({
        address: main, abi: mainAbi, functionName: "claimAll"
    })), [main, writeContractAsync, runTx]);

    const claimPhase = useCallback((phase) => runTx("claimPhase", `Claim Phase ${phase}`, () => writeContractAsync({
        address: main, abi: mainAbi, functionName: "claimPhase", args: [phase]
    })), [main, writeContractAsync, runTx]);

    const history = useAllHistory(main, 10);

    const depositWindow = useMemo(() => {
        if (!userTuple || !rewardPeriod) return undefined;
        const _last = BigInt(userTuple[10] ?? 0n);
        const _now = nowSec();
        if (_last === 0n) return { allowed: true, early: false, startsAt: _now + rewardPeriod };
        const cycleEnd = userTuple[11];
        const allowed = _now >= cycleEnd;
        return { cycleEnd, allowed, startsAt: _now + rewardPeriod };
    }, [userTuple, rewardPeriod]);

    const claimVIP = useCallback(() => runTx("claimVIP", "Claim VIP Rewards", () => writeContractAsync({
        address: vipC, abi: vipModuleAbi, functionName: "claimRewards"
    })), [vipC, writeContractAsync, runTx]);

    const actions = useMemo(() => ({
        refetch: () => { refetch(); vipRefetch(); royaltyRefetch(); earningRefetch(); history.refetch(); },
        loading, approveUsdtIfNeeded, deposit, claimAll, claimPhase, claimVIP, claimRoyalty,
    }), [refetch, vipRefetch, royaltyRefetch, earningRefetch, history, loading, approveUsdtIfNeeded, deposit, claimAll, claimPhase, claimVIP, claimRoyalty]);

    const vipProgressTuple = V(2);
    const redeProgressTuple = V(3);

    // Parse getUserStateView result (vipDataState) into a clean object
    const parsedVipState = useMemo(() => {
        if (!vipDataState) return undefined;
        // Check if it's an array (tuple) or object
        if (Array.isArray(vipDataState)) {
            // Struct UserStateView { 
            //   0: currentLevel, 1: selfBaseCents, 2: directsFirst, 3: directsVip1, 
            //   4: teamFirst, 5: lastDepositAt, 6: levelReachedAt[7], 7: oneTimeClaimed[7], 
            //   8: vip (WindowView), 9: rede (WindowView) 
            // }
            return {
                currentLevel: Number(vipDataState[0]),
                selfBaseCents: vipDataState[1],
                directsFirst: vipDataState[2],
                directsVip1: vipDataState[3],
                teamFirst: vipDataState[4],
                vip: vipDataState[8], // WindowView struct
                rede: vipDataState[9]  // WindowView struct
            };
        }
        return vipDataState; // Already an object (if wagmi mapped it)
    }, [vipDataState]);

    const data = {
        tokenBalance, usdtBalance, // Added raw balances for Sell screen
        tokenBalanceFmt, usdtBalanceFmt, priceUSD, pending, referral, user, history, depositWindow, chainId, main, usdt,
        contractTokenBalanceFmt, contractUsdtBalanceFmt,
        vip: {
            ...parsedVipState,
            // Sync level with royalty as fallback
            currentLevel: Math.max(Number(parsedVipState?.currentLevel ?? 0), Number(royaltyInfo?.activeLevel ?? 0)),
            // Ensure .rede is accessible for redeposit stats
            rede: parsedVipState?.rede,
            vip: parsedVipState?.vip
        },
        vipTables, claimVip,
        vipProgress: vipProgressTuple,
        redeProgress: redeProgressTuple,
        royalty: royaltyInfo
    };

    return <ProtocolContext.Provider value={{ data, actions }}>{children}</ProtocolContext.Provider>;
}
