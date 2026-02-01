import React, { useMemo, useState } from "react";
import { formatUnits } from "viem";
import { useProtocol } from "@/contexts/ProtocolContext";
import { roundWithFormat, shortAddress } from "@/blockchain/roundsNumber";
import { ClaimCountdown } from "@/components/Countdown";
import WithdrawStatsCard from "@/components/WithdrawStatsCard";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Copy, CheckCircle2 } from "lucide-react";

const plans = [
    {
        name: "Plan 1",
        baseDeposit: 100,
        stepReward: 14,
        topUps: [
            { step: 5, amount: "50" },
            { step: 9, amount: "25" },
            { step: 12, amount: "100" },
        ],
    },
    {
        name: "Plan 2",
        baseDeposit: 200,
        stepReward: 28,
        topUps: [
            { step: 5, amount: "100" },
            { step: 9, amount: "50" },
            { step: 12, amount: "200" },
        ],
        popular: true,
    },
    {
        name: "Plan 3",
        baseDeposit: 400,
        stepReward: 56,
        topUps: [
            { step: 5, amount: "200" },
            { step: 9, amount: "100" },
            { step: 12, amount: "400" },
        ],
    },
    {
        name: "Plan 4",
        baseDeposit: 800,
        stepReward: 112,
        topUps: [
            { step: 5, amount: "400" },
            { step: 9, amount: "200" },
            { step: 12, amount: "800" },
        ],
    },
    {
        name: "Plan 5",
        baseDeposit: 1600,
        stepReward: 224,
        topUps: [
            { step: 5, amount: "800" },
            { step: 9, amount: "400" },
            { step: 12, amount: "1600" },
        ],
    },
    {
        name: "Plan 6",
        baseDeposit: 3200,
        stepReward: 448,
        topUps: [
            { step: 5, amount: "1600" },
            { step: 9, amount: "800" },
            { step: 12, amount: "3200" },
        ],
    },
    {
        name: "Plan 7",
        baseDeposit: 6400,
        stepReward: 896,
        topUps: [
            { step: 5, amount: "3200" },
            { step: 9, amount: "1600" },
            { step: 12, amount: "6400" },
        ],
    },
];

function fmtUSDc(cents) {
    if (cents === undefined) return "-";
    const c = typeof cents === "number" ? BigInt(cents) : cents;
    const s = (Number(c) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `USDT ${s}`;
}

export function fmtTs(ts) {
    if (!ts || ts === 0n) return "—";
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

export default function PlansAndActions() {
    const { data, actions } = useProtocol();
    const { loading } = actions;

    const canClaimAll = gt0(data.pending?.total);
    const canClaimBase = gt0(data.pending?.p0);
    const canClaimHalf = gt0(data.pending?.p1);
    const canClaimQuarter = gt0(data.pending?.p2);

    const baseCents = data.user?.baseUSDCents ?? 0n;
    const nextPhase = data.user?.nextPhase ?? 0;

    const nextRequiredDepositCents = useMemo(() => {
        if (!data?.user?.hasPlan) return 0n;
        const u = data.user;
        if (nextPhase === 0) {
            return baseCents + 1000n;
        }
        if (nextPhase === 1) {
            return baseCents / 2n;
        }
        if (nextPhase === 2) {
            return baseCents / 4n;
        }
        return 0n;
    }, [data.user, baseCents, nextPhase]);

    const [baseInput, setBaseInput] = useState("");
    const parsedBaseInputCents = useMemo(() => {
        return data.user?.baseUSDCents || 0n;
    }, [data.user?.baseUSDCents]);

    const disableAll =
        loading.deposit ||
        loading.approveUsdt ||
        loading.claimAll ||
        loading.claimPhase ||
        loading.claimReferral ||
        loading.claimVIP;

    async function handleSelectPlan(usd) {
        const cents = BigInt(usd) * 100n;
        await actions.approveUsdtIfNeeded(cents);
        await actions.deposit(cents);
        actions.refetch();
    }

    async function handleTopUpExact(cents) {
        if (cents <= 0n) return;
        await actions.approveUsdtIfNeeded(cents);
        await actions.deposit(cents);
        actions.refetch();
    }

    async function handleBaseUpgrade() {
        if (parsedBaseInputCents <= 0n) return;
        await actions.approveUsdtIfNeeded(parsedBaseInputCents);
        await actions.deposit(parsedBaseInputCents);
        setBaseInput("");
        actions.refetch();
    }

    const { isConnected, address } = useAccount();
    const [copied, setCopied] = useState(false);

    const referralLink = useMemo(() => {
        if (typeof window === 'undefined') return '';
        const demo = window.location.pathname.includes("/amazejworld");
        const test = window.location.pathname.includes("/test");
        return `${window.location.origin}${test ? '/test' : demo ? '/amazejworld' : ''}/?ref_id=${address}`;
    }, [address]);

    const referralLinkDisplay = useMemo(() => {
        if (typeof window === 'undefined') return '';
        const demo = window.location.pathname.includes("/amazejworld");
        const test = window.location.pathname.includes("/test");
        return `${window.location.host}${test ? '/test' : demo ? '/amazejworld' : ''}/?ref_id=${shortAddress(address || '')}`;
    }, [address]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid gap-8">
            {/* Balances Section */}
            <div className="stat-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatBox label="AMA Balance" value={data.tokenBalanceFmt ? `${data.tokenBalanceFmt} (USDT ${(Number(data.tokenBalanceFmt) * Number(data.priceUSD)).toFixed(4)})` : "—"} />
                    <StatBox label="USDT Balance" value={data.usdtBalanceFmt ?? "—"} />
                    <StatBox label="AMA Price" value={data.priceUSD ?? "—"} subValue={`USDT ${data.contractUsdtBalanceFmt} | ${data.contractTokenBalanceFmt} AMA`} />
                    <StatBox label="Next Claim In" value={data?.user?.nextClaimAt ? <ClaimCountdown nextClaimAtSec={data?.user?.nextClaimAt} /> : "—"} />
                </div>
            </div>

            {/* Top-Up Section */}
            {data.user?.hasPlan && (
                (() => {
                    const win = data.depositWindow;
                    const phase = nextPhase;
                    const prevTranche = phase === 1 ? data.user?.baseTranche : phase === 2 ? data.user?.halfTranche : data.user?.quarterTranche;
                    const trancheEverStarted = !!prevTranche && !!prevTranche.amountUSDCents && prevTranche.amountUSDCents > 0n;
                    const eligible = Boolean(win?.allowed);

                    const fmtTSLocal = (n) => !n ? "—" : new Date(Number(n) * 1000).toLocaleString();
                    const eta = (at) => {
                        if (!at) return "";
                        const now = Math.floor(Date.now() / 1000);
                        const target = Number(at);
                        const s = Math.max(0, target - now);
                        const sec = s % 60;
                        const m = Math.floor(s / 60) % 60;
                        const h = Math.floor(s / 3600) % 24;
                        const d = Math.floor(s / 86400);
                        return d > 0 ? `${d}d ${h}h` : h > 0 ? `${h}h ${m}m` : `${m}m ${sec}s`;
                    };

                    const lockHint = !eligible
                        ? `Locked until early window opens: ${fmtTSLocal(win?.earlyOpenAt)} (${eta(win?.earlyOpenAt)} left)`
                        : win?.early
                            ? `Early deposit allowed now. First claim will start from due date: ${fmtTSLocal(win?.cycleEnd)} → first step at ${fmtTSLocal(win?.startsAt)}`
                            : `Deposit allowed. First step at ${fmtTSLocal(win?.startsAt)}`;

                    return (trancheEverStarted || phase === 0) ? (
                        <div className="rounded-xl border border-border bg-card p-6 shadow-xl text-card-foreground">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Next Required Top-Up</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black">{fmtUSDc(nextRequiredDepositCents)}</span>
                                    </div>
                                    <p className={`mt-3 text-sm font-medium ${eligible ? "text-muted-foreground" : "text-yellow-500"}`}>
                                        {lockHint}
                                    </p>
                                </div>

                                <button
                                    disabled={disableAll || (phase === 0 ? parsedBaseInputCents <= 0n : nextRequiredDepositCents <= 0n) || !eligible}
                                    onClick={phase === 0 ? handleBaseUpgrade : () => handleTopUpExact(nextRequiredDepositCents)}
                                    className="btn-primary font-bold h-12 px-8 rounded-lg hover:opacity-90 transition-colors disabled:opacity-20 transform hover:scale-105 active:scale-95 duration-200"
                                >
                                    {loading.deposit || loading.approveUsdt ? "Processing…" : eligible ? "Deposit Now" : "Locked"}
                                </button>
                            </div>
                        </div>
                    ) : null;
                })()
            )}

            {/* Referral Link Section */}
            <div className="bg-card/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="w-full md:w-auto">
                            <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2">Your Referral Link</h3>
                            {isConnected ? (
                                <div className="flex flex-col gap-4">
                                    <div className="bg-black/20 border border-white/5 rounded-2xl px-4 py-3 font-mono text-sm text-primary break-all">
                                        {referralLinkDisplay}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="w-full md:w-auto flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckCircle2 size={16} />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} />
                                                <span>Copy Referral Link</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center md:items-start gap-4">
                                    <p className="text-sm text-muted-foreground italic">Connect your wallet to generate a referral link</p>
                                    <ConnectButton />
                                </div>
                            )}
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <Copy size={32} className="text-primary opacity-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plans Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-black px-2">Choose Your Strategy</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {plans.map((plan, idx) => (
                        <PlanCard key={idx} plan={plan} idx={idx} data={data} disableAll={disableAll} onSelect={handleSelectPlan} />
                    ))}
                </div>
            </div>





        </div>
    );
}

function StatBox({ label, value, subValue }) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-secondary/50 rounded-xl border border-secondary">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
            <div className="text-xl font-black truncate">{value}</div>
            {subValue && <div className="text-xs font-medium text-muted-foreground truncate">{subValue}</div>}
        </div>
    );
}

function PlanCard({ plan, idx, data, disableAll, onSelect }) {
    const isAffordable = true; // Add logic if needed
    const isCurrentPlan = (plan.baseDeposit * 100) <= (data?.user?.baseUSDCents || 0n);

    // Ultra-vibrant colors with intense glow logic
    const themes = [
        // 0: Plan 1 - Electric Blue
        {
            outer: "from-blue-600 via-blue-500 to-cyan-500 border-blue-400/50 shadow-blue-500/50",
            inner: "bg-blue-950/60 border-blue-200/30 text-blue-50",
            button: "bg-white text-blue-600 border-blue-200 hover:shadow-blue-500/50",
            shine: "bg-blue-300/20"
        },
        // 1: Plan 2 - Neon Cyan
        {
            outer: "from-cyan-500 via-cyan-400 to-teal-400 border-cyan-400/50 shadow-cyan-500/50",
            inner: "bg-cyan-950/60 border-cyan-200/30 text-cyan-50",
            button: "bg-white text-cyan-600 border-cyan-200 hover:shadow-cyan-500/50",
            shine: "bg-cyan-300/20"
        },
        // 2: Plan 3 - Vivid Teal
        {
            outer: "from-teal-500 via-teal-400 to-emerald-500 border-teal-400/50 shadow-teal-500/50",
            inner: "bg-teal-950/60 border-teal-200/30 text-teal-50",
            button: "bg-white text-teal-600 border-teal-200 hover:shadow-teal-500/50",
            shine: "bg-teal-300/20"
        },
        // 3: Plan 4 - Emerald Green
        {
            outer: "from-emerald-500 via-emerald-400 to-green-500 border-emerald-400/50 shadow-emerald-500/50",
            inner: "bg-emerald-950/60 border-emerald-200/30 text-emerald-50",
            button: "bg-white text-emerald-600 border-emerald-200 hover:shadow-emerald-500/50",
            shine: "bg-emerald-300/20"
        },
        // 4: Plan 5 - Lime Punch
        {
            outer: "from-green-500 via-lime-500 to-yellow-400 border-lime-400/50 shadow-lime-500/50",
            inner: "bg-lime-950/60 border-lime-200/30 text-lime-50",
            button: "bg-white text-lime-600 border-lime-200 hover:shadow-lime-500/50",
            shine: "bg-lime-300/20"
        },
        // 5: Plan 6 - Solar Flare
        {
            outer: "from-yellow-400 via-orange-500 to-red-500 border-orange-400/50 shadow-orange-500/50",
            inner: "bg-orange-950/60 border-orange-200/30 text-orange-50",
            button: "bg-white text-orange-600 border-orange-200 hover:shadow-orange-500/50",
            shine: "bg-orange-300/20"
        },
        // 6: Plan 7 - Cosmic Purple
        {
            outer: "from-purple-600 via-fuchsia-500 to-indigo-600 border-fuchsia-400/50 shadow-fuchsia-500/50",
            inner: "bg-purple-950/60 border-purple-200/30 text-purple-50",
            button: "bg-white text-purple-600 border-fuchsia-200 hover:shadow-fuchsia-500/50",
            shine: "bg-purple-300/20"
        }
    ];

    const theme = themes[idx % themes.length];

    return (
        <div className={`
                relative flex flex-col p-4 rounded-xl border-2 transition-all duration-300 transform overflow-hidden group
                ${isCurrentPlan ? 'opacity-80 scale-95 saturate-50 z-0' : 'hover:scale-[1.05] hover:z-20'}
                bg-gradient-to-br ${theme.outer}
                text-white
                shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]
             `}>

            {/* Glossy sheen overlay */}
            <div className={`absolute top-0 right-0 w-[120%] h-full bg-linear-to-b from-white/10 to-transparent transform -skew-x-12 translate-x-1/2 opacity-30 pointer-events-none`}></div>
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none mix-blend-screen ${theme.shine}`}></div>

            {plan.popular && (
                <div className="absolute top-0 right-0 text-[9px] font-black uppercase tracking-tight bg-white text-black px-2 py-1 rounded-bl-lg shadow-lg z-20">
                    Top Pick
                </div>
            )}

            {/* Header: Compact Name & Big Price */}
            <div className="flex justify-between items-start mb-4 z-10 relative">
                <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 drop-shadow-md border-b border-white/20 pb-1 mb-1 inline-block">
                        {plan.name}
                    </h3>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black drop-shadow-xl tracking-tighter leading-none">
                            USDT {plan.baseDeposit + 10}
                        </span>
                        <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-1 opacity-90">
                            Entry
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 flex-1 z-10">
                {/* Reward Card - Ultra Glossy */}
                <div className={`flex items-center justify-between p-3 rounded-lg border backdrop-blur-xl shadow-inner ${theme.inner}`}>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase opacity-60">Each step reward</span>
                        <div className="text-xl font-black drop-shadow-md tracking-tight">USDT {plan.stepReward}</div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
                    <div className="flex flex-col text-right">
                        <span className="text-[9px] font-black uppercase opacity-60">Cycle</span>
                        <div className="text-[10px] font-bold">12 Steps</div>
                    </div>
                </div>

                {/* Compact Grid for Steps */}
                <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-center opacity-70">
                        Top-Up Requirements
                    </h4>
                    <div className="grid grid-cols-3 gap-1.5">
                        {plan.topUps.map((top, i) => (
                            <div key={i} className={`flex flex-col items-center justify-center py-2 px-1 rounded-md border backdrop-blur-md shadow-sm transition-transform hover:scale-110 ${theme.inner}`}>
                                <div className="text-[7px] font-black opacity-50 mb-0.5">STEP {top.step}</div>
                                <div className="text-xs font-black drop-shadow-sm">USDT {top.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                disabled={disableAll || isCurrentPlan}
                onClick={() => onSelect(plan.baseDeposit)}
                className={`
                    mt-5 h-9 rounded-lg font-black text-[10px] uppercase tracking-[0.2em]
                    transition-all transform active:scale-95 shadow-xl border-b-4
                    flex items-center justify-center
                    ${isCurrentPlan
                        ? "bg-black/40 border-black/20 text-white/40 cursor-not-allowed"
                        : `${theme.button} hover:-translate-y-0.5 active:translate-y-0 active:border-b-0`
                    }
                `}
            >
                {isCurrentPlan ? "Active Strategy" : "Start Plan"}
            </button>
        </div>
    );
}



const gt0 = (x) => (x ?? 0n) > 0n;
