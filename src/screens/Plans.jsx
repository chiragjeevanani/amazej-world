import React, { useMemo, useState } from "react";
import { formatUnits } from "viem";
import { useProtocol } from "@/contexts/ProtocolContext";
import { roundWithFormat, shortAddress } from "@/blockchain/roundsNumber";
import { ClaimCountdown } from "@/components/Countdown";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Copy, CheckCircle2, LayoutGrid, Link, Sparkles, TrendingUp, Wallet, ArrowUpCircle } from "lucide-react";

function gt0(x) { return (x ?? 0n) > 0n; }

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
    const plans = [
        { name: "Plan 1", baseDeposit: 100, stepReward: 14, topUps: [{ step: 5, amount: "50" }, { step: 9, amount: "25" }, { step: 12, amount: "100" }] },
        { name: "Plan 2", baseDeposit: 200, stepReward: 28, topUps: [{ step: 5, amount: "100" }, { step: 9, amount: "50" }, { step: 12, amount: "200" }], popular: true },
        { name: "Plan 3", baseDeposit: 400, stepReward: 56, topUps: [{ step: 5, amount: "200" }, { step: 9, amount: "100" }, { step: 12, amount: "400" }] },
        { name: "Plan 4", baseDeposit: 800, stepReward: 112, topUps: [{ step: 5, amount: "400" }, { step: 9, amount: "200" }, { step: 12, amount: "800" }] },
        { name: "Plan 5", baseDeposit: 1600, stepReward: 224, topUps: [{ step: 5, amount: "800" }, { step: 9, amount: "400" }, { step: 12, amount: "1600" }] },
        { name: "Plan 6", baseDeposit: 3200, stepReward: 448, topUps: [{ step: 5, amount: "1600" }, { step: 9, amount: "800" }, { step: 12, amount: "3200" }] },
        { name: "Plan 7", baseDeposit: 6400, stepReward: 896, topUps: [{ step: 5, amount: "3200" }, { step: 9, amount: "1600" }, { step: 12, amount: "6400" }] },
    ];

    const { data, actions } = useProtocol();
    const { loading } = actions;
    const { isConnected, address } = useAccount();

    const baseCents = data.user?.baseUSDCents ?? 0n;
    const nextPhase = data.user?.nextPhase ?? 0;

    const nextRequiredDepositCents = useMemo(() => {
        if (!data?.user?.hasPlan) return 0n;
        if (nextPhase === 0) return baseCents + 1000n;
        if (nextPhase === 1) return baseCents / 2n;
        if (nextPhase === 2) return baseCents / 4n;
        return 0n;
    }, [data.user, baseCents, nextPhase]);

    const parsedBaseInputCents = useMemo(() => data.user?.baseUSDCents || 0n, [data.user?.baseUSDCents]);

    const disableAll = loading.deposit || loading.approveUsdt || loading.claimAll || loading.claimPhase || loading.claimReferral || loading.claimVIP;

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
        actions.refetch();
    }

    const [copied, setCopied] = useState(false);
    const referralLink = useMemo(() => {
        if (typeof window === 'undefined') return '';
        const demo = window.location.pathname.includes("/amazejworld");
        return `${window.location.origin}${demo ? '/amazejworld' : ''}/?ref_id=${address}`;
    }, [address]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Sparkles size={24} />
                        </div>
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Marketplace</h2>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
                        Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Strategies</span>
                    </h1>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="AMA Balance"
                    value={data.tokenBalanceFmt ?? "—"}
                    subValue={data.tokenBalanceFmt ? `USDT ${(Number(data.tokenBalanceFmt) * Number(data.priceUSD)).toFixed(4)}` : "Estimated value"}
                    icon={<Wallet className="text-blue-400" />}
                />
                <StatCard
                    label="USDT Balance"
                    value={data.usdtBalanceFmt ?? "—"}
                    icon={<TrendingUp className="text-emerald-400" />}
                />
                <StatCard
                    label="AMA Price"
                    value={`USDT ${data.priceUSD ?? "—"}`}
                    subValue={data.contractUsdtBalanceFmt ? `USDT ${data.contractUsdtBalanceFmt} | ${data.contractTokenBalanceFmt} AMA` : ""}
                    icon={<Sparkles className="text-yellow-400" />}
                />
                <StatCard
                    label="Next Claim Window"
                    value={data?.user?.nextClaimAt ? <ClaimCountdown nextClaimAtSec={data?.user?.nextClaimAt} /> : "Not scheduled"}
                    icon={<LayoutGrid className="text-purple-400" />}
                />
            </div>

            {/* Top-Up Section */}
            {data.user?.hasPlan && (
                (() => {
                    const win = data.depositWindow;
                    const eligible = Boolean(win?.allowed);

                    const lockHint = !eligible
                        ? `Locked until window opens`
                        : `Window is currently open.`;

                    return (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                            <div className="relative bg-card/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                                    <ArrowUpCircle size={200} className="text-primary -rotate-12" />
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="space-y-4">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${eligible ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-orange-500/20 text-orange-500 border-orange-500/30'}`}>
                                            <span className={`relative flex h-2 w-2 ${eligible ? 'animate-pulse' : ''}`}>
                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${eligible ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                            </span>
                                            {eligible ? 'Window Active' : 'Waiting for Window'}
                                        </div>
                                        <h3 className="text-3xl font-black tracking-tight">Next Required Top-Up</h3>
                                        <div className="flex flex-col">
                                            <span className="text-5xl font-black text-foreground tracking-tighter">{fmtUSDc(nextRequiredDepositCents)}</span>
                                            <p className="mt-2 text-sm font-bold text-muted-foreground/60">{lockHint}</p>
                                        </div>
                                    </div>

                                    <button
                                        disabled={disableAll || (nextPhase === 0 ? parsedBaseInputCents <= 0n : nextRequiredDepositCents <= 0n) || !eligible}
                                        onClick={nextPhase === 0 ? handleBaseUpgrade : () => handleTopUpExact(nextRequiredDepositCents)}
                                        className="h-16 min-w-[240px] rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/40 disabled:opacity-20 disabled:scale-100"
                                    >
                                        {loading.deposit || loading.approveUsdt ? "Processing…" : eligible ? "Execute Deposit" : "Window Locked"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()
            )}

            {/* Links & Referral Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-indigo-500/10 border border-indigo-500/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 group">
                    <div className="h-20 w-20 rounded-[1.5rem] bg-indigo-500 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 shrink-0 group-hover:scale-110 transition-transform">
                        <Link size={40} />
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <h3 className="text-2xl font-black tracking-tight">Grow Your Network</h3>
                        <p className="text-sm font-medium text-muted-foreground opacity-80 leading-relaxed">
                            Invite others to the protocol and earn a lifetime percentage of their rewards. Copy your unique link below.
                        </p>
                        {isConnected ? (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-indigo-400 break-all flex items-center">
                                    {shortAddress(address)}... (Click Copy)
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="h-12 px-6 rounded-xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    {copied ? "Copied" : "Copy Link"}
                                </button>
                            </div>
                        ) : (
                            <ConnectButton />
                        )}
                    </div>
                </div>

                <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center gap-4 relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                        <TrendingUp size={160} />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">Premium Benefits</h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        Scale your tier to unlock higher limits and monthly dividends.
                    </p>
                    <button className="flex items-center gap-2 text-xs font-black uppercase text-primary tracking-widest hover:gap-4 transition-all">
                        Explore Tiers <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <LayoutGrid size={18} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">Active Strategies</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {plans.map((plan, idx) => (
                        <PlanCard key={idx} plan={plan} idx={idx} data={data} disableAll={disableAll} onSelect={handleSelectPlan} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, subValue, icon }) {
    return (
        <div className="relative group bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
            <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
                <div className="text-xl font-black text-foreground truncate">{value}</div>
                {subValue && <p className="text-xs font-black text-muted-foreground/80 uppercase tracking-wider mt-2 bg-white/5 py-1 px-3 rounded-lg border border-white/5 inline-block">{subValue}</p>}
            </div>
        </div>
    );
}

function PlanCard({ plan, idx, data, disableAll, onSelect }) {
    const isCurrentPlan = (plan.baseDeposit * 100) <= (data?.user?.baseUSDCents || 0n);

    const themes = [
        { outer: "from-blue-600 to-indigo-600", inner: "bg-blue-950/40", button: "bg-white text-blue-600", accent: "text-blue-300" },
        { outer: "from-cyan-500 to-emerald-500", inner: "bg-cyan-950/40", button: "bg-white text-cyan-600", accent: "text-cyan-300" },
        { outer: "from-teal-500 to-teal-700", inner: "bg-teal-950/40", button: "bg-white text-teal-600", accent: "text-teal-300" },
        { outer: "from-emerald-500 to-green-600", inner: "bg-emerald-950/40", button: "bg-white text-emerald-600", accent: "text-emerald-300" },
        { outer: "from-lime-500 to-emerald-600", inner: "bg-lime-950/40", button: "bg-white text-lime-600", accent: "text-lime-300" },
        { outer: "from-orange-500 to-red-600", inner: "bg-white text-orange-600", button: "bg-white text-orange-600", accent: "text-orange-300" },
        { outer: "from-violet-600 to-fuchsia-600", inner: "bg-violet-950/40", button: "bg-white text-violet-600", accent: "text-violet-300" }
    ];

    const theme = themes[idx % themes.length];

    return (
        <div className={`
            relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-500 transform overflow-hidden group
            ${isCurrentPlan ? 'opacity-60 scale-95 saturate-0' : 'hover:scale-[1.02] hover:-translate-y-2'}
            bg-gradient-to-br ${theme.outer} text-white shadow-2xl
        `}>
            <div className="absolute top-0 right-0 w-[120%] h-full bg-linear-to-b from-white/10 to-transparent transform -skew-x-12 translate-x-1/2 opacity-20 pointer-events-none"></div>

            {plan.popular && (
                <div className="absolute top-0 right-0 text-[10px] font-black uppercase tracking-widest bg-white text-black px-4 py-2 rounded-bl-2xl shadow-lg z-20">
                    Most Popular
                </div>
            )}

            <div className="mb-8 relative z-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black tracking-tighter italic">USDT</span>
                    <span className="text-5xl font-black tracking-tighter">{plan.baseDeposit + 10}</span>
                </div>
            </div>

            <div className="space-y-4 flex-1 relative z-10">
                <div className={`flex items-center justify-between p-4 rounded-2xl backdrop-blur-xl border border-white/10 ${theme.inner}`}>
                    <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Step Reward</span>
                        <div className="text-2xl font-black tracking-tight">USDT {plan.stepReward}</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {plan.topUps.map((top, i) => (
                        <div key={i} className={`flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 backdrop-blur-md ${theme.inner}`}>
                            <span className="text-[8px] font-black opacity-50 mb-1">ST {top.step}</span>
                            <span className="text-[10px] font-black">${top.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                disabled={disableAll || isCurrentPlan}
                onClick={() => onSelect(plan.baseDeposit)}
                className={`
                    mt-8 h-14 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-xl
                    ${isCurrentPlan
                        ? "bg-black/20 border-white/10 text-white/40 cursor-not-allowed"
                        : "bg-white text-black hover:bg-opacity-90"}
                `}
            >
                {isCurrentPlan ? "Active strategy" : "Initiate Strategy"}
            </button>
        </div>
    );
}

function ChevronRight({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}




