import React, { useMemo, useState, useEffect } from "react";
import { formatUnits } from "viem";
import { useProtocol } from "@/contexts/ProtocolContext";
import { roundWithFormat, shortAddress } from "@/blockchain/roundsNumber";
import { ClaimCountdown } from "@/components/Countdown";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";
import { Copy, CheckCircle2, LayoutGrid, Link, Sparkles, TrendingUp, Wallet, ArrowUpCircle, ExternalLink, ShieldCheck, RotateCcw } from "lucide-react";
import { contracts, SCAN_LINK } from "@/blockchain/contracts";

// Admin wallets that can access admin features
// NOTE: Primarily relies on treasury contract owner check from data.owner
const ADMIN_WALLETS = [
    "0xce2a7413aacee78668f640f510daf80d6a2ee1cb", // Default Referrer / Admin
].map(a => a.toLowerCase());

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
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
    });
}

export default function PlansAndActions() {
    const plans = [
        { name: "Plan 1", baseDeposit: 100, stepReward: 14, topUps: [{ step: 5, amount: "50" }, { step: 9, amount: "25" }, { step: 12, amount: "100" }] },
        { name: "Plan 2", baseDeposit: 200, stepReward: 28, topUps: [{ step: 5, amount: "100" }, { step: 9, amount: "50" }, { step: 12, amount: "200" }], popular: true },
        { name: "Plan 3", baseDeposit: 400, stepReward: 56, topUps: [{ step: 5, amount: "200" }, { step: 9, amount: "100" }, { step: 12, amount: "400" }] },
        { name: "Plan 4", baseDeposit: 800, stepReward: 112, topUps: [{ step: 5, amount: "400" }, { step: 9, amount: "200" }, { step: 12, amount: "800" }] },
        { name: "Plan 5", baseDeposit: 1600, stepReward: 224, topUps: [{ step: 5, amount: "800" }, { step: 9, amount: "400" }, { step: 12, amount: "1600" }] },
        { name: "Plan 6", baseDeposit: 3200, stepReward: 448, topUps: [{ step: 1600, amount: "1600" }, { step: 9, amount: "800" }, { step: 12, amount: "3200" }] },
        { name: "Plan 7", baseDeposit: 6400, stepReward: 896, topUps: [{ step: 3200, amount: "3200" }, { step: 9, amount: "1600" }, { step: 12, amount: "6400" }] },
    ];

    const { data, actions } = useProtocol();
    const { loading } = actions;
    const { isConnected, address } = useAccount();
    const { t } = useTranslation();

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

    // Admin check debug logging
    const adminStatus = useMemo(() => {
        if (!address) return { isAnyAdmin: false };
        const isInList = ADMIN_WALLETS.includes(address.toLowerCase());
        const isTreasuryOwner = data.owner && address.toLowerCase() === data.owner.toLowerCase();
        const isRoyaltyOwner = data.royaltyOwner && address.toLowerCase() === data.royaltyOwner.toLowerCase();
        const isMainOwner = data.mainOwner && address.toLowerCase() === data.mainOwner.toLowerCase();
        const isBeneficiary = data.beneficiaries?.some(b => b.wallet?.toLowerCase() === address.toLowerCase());

        return {
            isInList,
            isTreasuryOwner,
            isRoyaltyOwner,
            isMainOwner,
            isBeneficiary,
            isAnyAdmin: isInList || isTreasuryOwner || isRoyaltyOwner || isMainOwner || isBeneficiary
        };
    }, [address, data.owner, data.royaltyOwner, data.mainOwner, data.beneficiaries]);

    useEffect(() => {
        if (address) {
            console.group('🔐 Admin Status Check');
            console.log('User Address:', address.toLowerCase());
            console.log('Status:', adminStatus);
            console.groupEnd();
        }
    }, [address, adminStatus]);

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
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">{t('plans.marketplace')}</h2>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-500">{t('plans.strategies')}</span>
                    </h1>
                </div>

                {/* Admin Badge in Header */}
                {adminStatus.isAnyAdmin && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">Admin Mode Active</span>
                    </div>
                )}
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label={t('home.ama_balance')}
                    value={data.tokenBalanceFmt ?? "—"}
                    subValue={data.tokenBalanceFmt ? `USDT ${(Number(data.tokenBalanceFmt) * Number(data.priceUSD)).toFixed(4)}` : t('home.estimated_value')}
                    icon={<Wallet className="text-blue-400" />}
                />
                <StatCard
                    label={t('home.usdt_balance')}
                    value={data.usdtBalanceFmt ?? "—"}
                    icon={<TrendingUp className="text-emerald-400" />}
                />
                <StatCard
                    label={t('home.ama_price')}
                    value={<span className="text-3xl group-hover:text-yellow-400 transition-colors">{data.priceUSD ?? "—"}</span>}
                    subValue={data.contractUsdtBalanceFmt ? `USDT ${data.contractUsdtBalanceFmt} | ${data.contractTokenBalanceFmt} AMA` : ""}
                    icon={<Sparkles className="text-yellow-400" />}
                    action={
                        <div className="flex flex-col items-end gap-1">
                            <a
                                href="https://bscscan.com/address/0xFF4A6bB452A7C0d0C0AB1d4880CD7e3f38B595b4#readContract"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-yellow-500/50 text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
                            >
                                {t('plans.go_ama_contract')}
                                <ExternalLink size={10} />
                            </a>
                            <span className="text-[10px] font-black text-blue-500 tracking-tight">
                                Don't Trust. Contract Verify.
                            </span>
                        </div>
                    }
                />
                <StatCard
                    label={t('plans.next_claim_window')}
                    value={data?.user?.nextClaimAt ? <ClaimCountdown nextClaimAtSec={data?.user?.nextClaimAt} /> : t('plans.not_scheduled')}
                    icon={<LayoutGrid className="text-purple-400" />}
                />
            </div>

            {/* Top-Up Section */}
            {data.user?.hasPlan && (
                (() => {
                    const win = data.depositWindow;
                    const eligible = Boolean(win?.allowed);

                    const fmtTSLocal = (n) => !n ? "—" : new Date(Number(n) * 1000).toLocaleString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit',
                        hour12: true
                    });

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
                        ? t('plans.locked_until', { time: fmtTSLocal(win?.cycleEnd), left: eta(win?.cycleEnd) })
                        : win?.early
                            ? t('plans.early_deposit', { time: fmtTSLocal(win?.startsAt) })
                            : t('plans.deposit_allowed', { time: fmtTSLocal(win?.cycleEnd) });

                    return (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-emerald-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                            <div className="relative bg-card/90 dark:bg-card/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                                    <ArrowUpCircle size={200} className="text-emerald-500 -rotate-12" />
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="space-y-4">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${eligible ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-orange-500/20 text-orange-500 border-orange-500/30'}`}>
                                            <span className={`relative flex h-2 w-2 ${eligible ? 'animate-pulse' : ''}`}>
                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${eligible ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                            </span>
                                            {eligible ? t('plans.window_active') : t('plans.waiting_for_window')}
                                        </div>
                                        <h3 className="text-3xl font-black tracking-tight text-card-foreground">{t('plans.next_required_topup')}</h3>
                                        <div className="flex flex-col">
                                            <span className="text-xl font-bold text-muted-foreground/80 mb-1">{t('plans.exact_amount', { amount: fmtUSDc(nextRequiredDepositCents) })}</span>
                                            {/* <span className="text-5xl font-black text-foreground tracking-tighter">{fmtUSDc(nextRequiredDepositCents)}</span> */}
                                            <p className={`mt-2 text-sm font-bold ${eligible ? "text-fuchsia-400" : "text-orange-400"}`}>
                                                {lockHint}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        disabled={disableAll || (nextPhase === 0 ? parsedBaseInputCents <= 0n : nextRequiredDepositCents <= 0n) || !eligible}
                                        onClick={nextPhase === 0 ? handleBaseUpgrade : () => handleTopUpExact(nextRequiredDepositCents)}
                                        className={`h-16 min-w-[240px] rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-20 disabled:scale-100 ${eligible ? 'bg-[#50C878] text-white shadow-emerald-500/20' : 'bg-slate-200 text-slate-500'}`}
                                    >
                                        {loading.deposit || loading.approveUsdt ? t('home.processing') : eligible ? `${t('home.deposit')} ${fmtUSDc(nextRequiredDepositCents)}` : t('plans.window_locked')}
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
                        <h3 className="text-2xl font-black tracking-tight text-card-foreground">{t('plans.grow_your_network')}</h3>
                        <p className="text-sm font-medium text-muted-foreground opacity-80 leading-relaxed">
                            {t('plans.invite_others')}
                        </p>
                        {isConnected ? (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-3 font-mono text-sm text-indigo-500 break-all flex items-center">
                                    {shortAddress(address)}... {t('plans.click_copy')}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="h-12 px-6 rounded-xl bg-foreground text-background font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    {copied ? t('plans.copied') : t('plans.copy_link')}
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center md:justify-start">
                                <ConnectButton />
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-card border border-border rounded-[2rem] p-8 flex flex-col justify-center gap-4 relative overflow-hidden group shadow-xl text-card-foreground">
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                        <TrendingUp size={160} />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">{t('plans.premium_benefits')}</h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        {t('plans.scale_tier')}
                    </p>
                    <button className="flex items-center gap-2 text-xs font-black uppercase text-primary tracking-widest hover:gap-4 transition-all">
                        {t('plans.explore_tiers')} <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <LayoutGrid size={18} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-foreground">{t('plans.active_strategies')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {plans.map((plan, idx) => (
                        <PlanCard key={idx} plan={plan} idx={idx} data={data} disableAll={disableAll} onSelect={handleSelectPlan} />
                    ))}
                </div>
            </div>

            {/* Admin Section (Only for treasury owner, beneficiaries or admin wallets) */}
            {isConnected && address && adminStatus.isAnyAdmin && (
                <div className="relative group overflow-visible z-10 min-h-[200px]">
                    {/* Enhanced Pulsating Admin Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 animate-pulse transition duration-1000"></div>

                    <div className="relative bg-card/95 dark:bg-card/80 backdrop-blur-xl border-2 border-red-500/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform group-hover:rotate-12 duration-1000">
                            <ShieldCheck size={240} className="text-red-500" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] font-black uppercase tracking-widest text-red-500">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    Admin Access Protected
                                </div>
                                <h3 className="text-3xl font-black tracking-tight text-card-foreground">
                                    Treasury Management
                                </h3>
                                <p className="text-sm font-medium text-muted-foreground/80 max-w-xl">
                                    Distribute collected USDT fees from the protocol treasury to all registered beneficiaries.
                                </p>
                            </div>

                            <button
                                disabled={loading.distributeFees}
                                onClick={() => actions.distributeFees()}
                                className="group/btn relative h-16 min-w-[240px] rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50 bg-red-600 text-white shadow-red-600/40 overflow-hidden border-2 border-red-500 z-20"
                            >
                                <div className="flex items-center justify-center gap-3 relative z-10">
                                    {loading.distributeFees ? (
                                        <RotateCcw className="animate-spin" size={18} />
                                    ) : (
                                        <ShieldCheck size={18} />
                                    )}
                                    {loading.distributeFees ? t('home.processing') : "Claim Fees"}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, subValue, icon, action }) {
    return (
        <div className="relative group transition-all duration-500 hover:-translate-y-1 h-full">
            {/* Colored Light Glow (Emitting from behind) */}
            <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/10 via-yellow-400/5 to-emerald-500/10 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-700" />

            {/* Sharp Neon Border Accent */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-400/30 via-yellow-400/20 to-emerald-400/30 rounded-[2rem] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 h-full flex flex-col bg-card/95 dark:bg-card/50 rounded-[1.9rem] p-6 shadow-xl transition-all duration-500 border border-border group-hover:border-emerald-500/30 backdrop-blur-md">
                <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">
                        {icon}
                    </div>
                    {action}
                </div>
                <div className="space-y-1.5 flex-1 text-card-foreground">
                    <p className="text-xs font-black text-muted-foreground/60 uppercase tracking-[0.25em]">{label}</p>
                    <div className="text-3xl font-black truncate tracking-tighter group-hover:text-emerald-500 transition-colors">{value}</div>
                    {subValue && (
                        <p className="text-sm font-black text-foreground uppercase tracking-tight mt-3 bg-primary/10 py-2.5 px-4 rounded-xl border border-primary/20 inline-block max-w-full truncate shadow-sm transition-all group-hover:scale-105 group-hover:bg-primary/20">
                            {subValue}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function PlanCard({ plan, idx, data, disableAll, onSelect }) {
    const { t } = useTranslation();
    const isCurrentPlan = (plan.baseDeposit * 100) <= (data?.user?.baseUSDCents || 0n);

    const themes = [
        // 🔹 PLAN 1 – Entry / Beginner
        {
            outer: "bg-sky-400/90",
            inner: "bg-blue-800/20",
            button: "bg-[#50C878] text-white hover:bg-[#45b66d] shadow-emerald-500/20",
            accent: "border-yellow-400/50",
            text: "text-white"
        },
        // 🔹 PLAN 2 – Starter / Trust Builder
        {
            outer: "bg-teal-500/90",
            inner: "bg-teal-900/30",
            button: "bg-[#50C878] text-white hover:bg-[#45b66d] shadow-emerald-500/20",
            accent: "border-teal-200/20",
            badge: "bg-orange-400 text-white",
            text: "text-white"
        },
        // 🟡 PLAN 3 – Growth Plan (Jupiter Power)
        {
            outer: "bg-yellow-400",
            inner: "bg-yellow-600/20",
            button: "bg-green-600 text-white hover:bg-green-700 shadow-green-500/20",
            accent: "border-white/80",
            text: "text-slate-900"
        },
        // 🟢 PLAN 4 – Money Flow Plan
        {
            outer: "bg-emerald-500",
            inner: "bg-green-900/30",
            button: "bg-white text-black hover:bg-slate-100 shadow-white/10",
            accent: "border-sky-300/40",
            text: "text-white"
        },
        // 🟢 PLAN 5 – Trading / Smart Plan
        {
            outer: "bg-[#008B8B]", // Teal Green
            inner: "bg-[#004c4c]/40",
            button: "bg-green-800 text-white hover:bg-green-900 shadow-emerald-900/20",
            accent: "border-yellow-400/30",
            text: "text-white"
        },
        // 🟠 PLAN 6 – Action / Fast ROI
        {
            outer: "bg-orange-400",
            inner: "bg-orange-800/20",
            button: "bg-green-600 text-white hover:bg-green-700 shadow-green-500/20",
            accent: "border-stone-100/50",
            text: "text-white"
        },
        // 🟣 PLAN 7 – High Ticket / Long Term
        {
            outer: "bg-indigo-700",
            inner: "bg-indigo-950/40",
            button: "bg-white text-indigo-900 hover:bg-slate-100 shadow-white/10",
            accent: "border-slate-300/40",
            text: "text-white"
        }
    ];

    const theme = themes[idx % themes.length];

    return (
        <div className={`
            relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-500 transform overflow-hidden group
            ${isCurrentPlan ? 'scale-[0.98] ring-2 ring-emerald-500/50' : 'hover:scale-[1.02] hover:-translate-y-2'}
            ${theme.outer} ${theme.text} ${theme.accent} shadow-2xl
        `}>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[120%] h-full bg-gradient-to-b from-white/10 to-transparent transform -skew-x-12 translate-x-1/2 opacity-20 pointer-events-none"></div>

            {/* Plan 5 Yellow Dots Decoration */}
            {idx === 4 && (
                <div className="absolute top-4 left-4 flex gap-1 z-20">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                </div>
            )}

            {plan.popular && (
                <div className={`absolute top-0 right-0 text-[10px] font-black uppercase tracking-widest ${theme.badge || 'bg-white text-black'} px-4 py-2 rounded-bl-2xl shadow-lg z-20`}>
                    {t('plans.most_popular')}
                </div>
            )}

            <div className="mb-8 relative z-10">
                <h3 className="text-[13px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">{plan.name}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-black tracking-tighter italic">{plan.baseDeposit + 10} $ USDT</span>
                </div>
            </div>

            <div className="space-y-4 flex-1 relative z-10">
                <div className={`flex items-center justify-between p-4 rounded-2xl backdrop-blur-xl border border-white/10 ${theme.inner}`}>
                    <div className="space-y-0.5">
                        <span className="text-[12px] font-black uppercase tracking-widest opacity-60">{t('plans.step_reward')}</span>
                        <div className="text-xl font-black tracking-tight">{plan.stepReward} $ USDT</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {plan.topUps.map((top, i) => (
                        <div key={i} className={`flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 backdrop-blur-md ${theme.inner}`}>
                            <span className="text-[10px] font-black opacity-50 mb-1">ST {top.step}</span>
                            <span className="text-[13px] font-black">{top.amount} $ USDT</span>
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
                        ? "bg-emerald-500 text-black shadow-emerald-500/20 cursor-default"
                        : `${theme.button}`}
                `}
            >
                {isCurrentPlan ? t('plans.active_strategy') : t('plans.initiate_strategy')}
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
