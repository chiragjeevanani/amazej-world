import React from "react";
import { useTranslation } from "react-i18next";
import { useProtocol } from "@/contexts/ProtocolContext";
import { roundWithFormat } from "@/blockchain/roundsNumber";
import { fmtTs } from "@/screens/Plans";
import { Droplets, Hexagon, Zap, ShieldCheck, Timer, ArrowUpRight, Sparkles } from "lucide-react";

function gt0(x) { return (x ?? 0n) > 0n; }

function fmtUSDc(cents) {
    if (cents === undefined) return "-";
    const c = typeof cents === "number" ? BigInt(cents) : cents;
    const s = (Number(c) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `USDT ${s}`;
}

export default function LPClaimComponent() {
    const { t } = useTranslation();
    const { data, actions } = useProtocol();
    const { loading } = actions;

    const canClaimAll = gt0(data.pending?.total);
    const canClaimBase = gt0(data.pending?.p0);
    const canClaimHalf = gt0(data.pending?.p1);
    const canClaimQuarter = gt0(data.pending?.p2);

    return (
        <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8">
            {/* Header / Global Claim Section */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-violet-500 to-indigo-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-card/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Droplets size={200} className="text-primary -rotate-12" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="max-w-xl space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary">
                                <Sparkles size={14} className="animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('lp.lp_rewards')}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400 tracking-tighter leading-[1.1]">
                                {t('lp.claim_profit')}
                            </h1>
                            <p className="text-lg font-bold text-muted-foreground pt-2">
                                {t('lp.withdraw_desc')}
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="text-center lg:text-right">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('lp.total_claimable')}</p>
                                <div className="text-4xl font-black tabular-nums tracking-tight">
                                    {data.pending?.total !== undefined ? `USDT ${roundWithFormat(data.pending.total * BigInt(Math.floor(Number(data.priceUSD || 0) * 1e18)) / BigInt(1e18))}` : "—"}
                                </div>
                            </div>
                            <button
                                onClick={() => actions.claimAll()}
                                disabled={!canClaimAll || loading.claimAll}
                                className="group relative w-full lg:w-auto h-16 min-w-[240px] rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/40 disabled:opacity-20 disabled:scale-100 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading.claimAll ? t('lp.syncing') : <>{t('lp.claim_all')} <ArrowUpRight size={18} /></>}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tranche Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TrancheCard
                    title={t('lp.base_tier')}
                    tranche={data.user?.baseTranche}
                    pending={data.pending?.p0}
                    priceCents={data.priceCents}
                    claimable={canClaimBase}
                    onClaim={() => actions.claimPhase(0)}
                    loading={loading.claimPhase}
                    theme={{
                        primary: "from-blue-500 to-indigo-600",
                        accent: "text-blue-400",
                        glow: "shadow-blue-500/20",
                        bg: "bg-blue-500/5",
                        icon: <ShieldCheck size={20} className="text-blue-400" />
                    }}
                />
                <TrancheCard
                    title={t('lp.half_tier')}
                    tranche={data.user?.halfTranche}
                    pending={data.pending?.p1}
                    priceCents={data.priceCents}
                    claimable={canClaimHalf}
                    onClaim={() => actions.claimPhase(1)}
                    loading={loading.claimPhase}
                    theme={{
                        primary: "from-fuchsia-500 to-purple-600",
                        accent: "text-fuchsia-400",
                        glow: "shadow-fuchsia-500/20",
                        bg: "bg-fuchsia-500/5",
                        icon: <Hexagon size={20} className="text-fuchsia-400" />
                    }}
                />
                <TrancheCard
                    title={t('lp.quarter_tier')}
                    tranche={data.user?.quarterTranche}
                    pending={data.pending?.p2}
                    priceCents={data.priceCents}
                    claimable={canClaimQuarter}
                    onClaim={() => actions.claimPhase(2)}
                    loading={loading.claimPhase}
                    theme={{
                        primary: "from-amber-400 to-orange-500",
                        accent: "text-amber-400",
                        glow: "shadow-amber-500/20",
                        bg: "bg-amber-500/5",
                        icon: <Zap size={20} className="text-amber-400" />
                    }}
                />
            </div>
        </div>
    );
}

function TrancheCard({ title, tranche, pending, priceCents, claimable, onClaim, loading, theme }) {
    const { t } = useTranslation();
    const pendingFmt = pending !== undefined ? `USDT ${roundWithFormat(pending * (priceCents || 0n) / BigInt(10 ** 18))}` : "—";
    const progress = tranche?.claimCounts ? Math.min((tranche.claimCounts / 12) * 100, 100) : 0;
    const isActive = !!tranche?.active;

    return (
        <div className={`group relative bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${theme.glow}`}>
            {/* Active Status Badge */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                        {theme.icon}
                    </div>
                    <span className="text-2xl font-black text-foreground tracking-tight">{title}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${isActive ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-white/5 text-muted-foreground border-white/10'}`}>
                    {isActive ? t('lp.active') : t('lp.locked')}
                </div>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t('lp.principal')}</p>
                    <p className="text-xl font-black tabular-nums">{fmtUSDc(tranche?.amountUSDCents)}</p>
                </div>
                <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t('lp.progress')}</p>
                    <p className="text-xl font-black tabular-nums">{tranche?.claimCounts ?? 0} / 12</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 mb-8">
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${theme.primary} transition-all duration-1000 ease-out rounded-full shadow-lg`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Details & Actions */}
            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 opacity-60">
                        <Timer size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('lp.next_window')}</span>
                    </div>
                    <span className="text-xs font-black tabular-nums">{fmtTs(tranche?.nextClaimAt)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 opacity-60">
                        <Droplets size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('lp.pending_accrual')}</span>
                    </div>
                    <span className={`text-sm font-black tabular-nums ${theme.accent}`}>{pendingFmt}</span>
                </div>

                {isActive && (
                    <button
                        onClick={onClaim}
                        disabled={!claimable || loading}
                        className={`
                            w-full mt-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl disabled:opacity-20 disabled:scale-100
                            bg-gradient-to-r ${theme.primary} text-white hover:opacity-90 group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)]
                        `}
                    >
                        {loading ? t('lp.processing') : claimable ? t('lp.claim_lp_rewards') : t('lp.lp_accruing')}
                    </button>
                )}
            </div>
        </div>
    );
}

