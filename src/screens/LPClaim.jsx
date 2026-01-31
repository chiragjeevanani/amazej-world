import React, { useState } from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { roundWithFormat } from "@/blockchain/roundsNumber";
import { fmtTs } from "@/screens/Plans"; // Ensure we can import this or redefine it

const gt0 = (x) => (x ?? 0n) > 0n;

function fmtUSDc(cents) {
    if (cents === undefined) return "-";
    const c = typeof cents === "number" ? BigInt(cents) : cents;
    const s = (Number(c) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `USDT ${s}`;
}

export default function LPClaimComponent() {
    const { data, actions } = useProtocol();
    const { loading } = actions;

    const canClaimAll = gt0(data.pending?.total);
    const canClaimBase = gt0(data.pending?.p0);
    const canClaimHalf = gt0(data.pending?.p1);
    const canClaimQuarter = gt0(data.pending?.p2);

    return (
        <div className="space-y-8">
            <div className="stat-card">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-2xl font-black">LP Claim</h3>
                        <p className="text-muted-foreground text-sm mt-1">Claim your earned rewards across all tranches</p>
                    </div>
                    <button
                        onClick={() => actions.claimAll()}
                        className="w-full sm:w-auto h-12 sm:h-10 px-8 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 shadow-lg transition-all disabled:opacity-20 whitespace-nowrap active:scale-95"
                    >
                        {loading.claimAll ? "Processing…" : "Claim All Rewards"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TrancheCard
                        title="Base Tier"
                        tranche={data.user?.baseTranche}
                        pending={data.pending?.p0}
                        priceCents={data.priceCents}
                        claimable={canClaimBase}
                        onClaim={() => actions.claimPhase(0)}
                        loading={loading.claimPhase}
                        colorClass="from-blue-500 to-indigo-500"
                        borderClass="border-blue-200"
                        bgClass="bg-blue-50/50 dark:bg-blue-950/20"
                        textClass="text-blue-600 dark:text-blue-400"
                        progressClass="bg-blue-500"
                    />
                    <TrancheCard
                        title="Half Tier"
                        tranche={data.user?.halfTranche}
                        pending={data.pending?.p1}
                        priceCents={data.priceCents}
                        claimable={canClaimHalf}
                        onClaim={() => actions.claimPhase(1)}
                        loading={loading.claimPhase}
                        colorClass="from-purple-500 to-pink-500"
                        borderClass="border-purple-200"
                        bgClass="bg-purple-50/50 dark:bg-purple-950/20"
                        textClass="text-purple-600 dark:text-purple-400"
                        progressClass="bg-purple-500"
                    />
                    <TrancheCard
                        title="Quarter Tier"
                        tranche={data.user?.quarterTranche}
                        pending={data.pending?.p2}
                        priceCents={data.priceCents}
                        claimable={canClaimQuarter}
                        onClaim={() => actions.claimPhase(2)}
                        loading={loading.claimPhase}
                        colorClass="from-amber-400 to-orange-500"
                        borderClass="border-amber-200"
                        bgClass="bg-amber-50/50 dark:bg-amber-950/20"
                        textClass="text-amber-600 dark:text-amber-400"
                        progressClass="bg-amber-500"
                    />
                </div>
            </div>
        </div>
    );
}

function TrancheCard({
    title,
    tranche,
    pending,
    priceCents,
    claimable,
    onClaim,
    loading,
    colorClass,
    borderClass,
    bgClass,
    textClass,
    progressClass
}) {
    const pendingFmt = pending !== undefined ? `USDT ${roundWithFormat(pending * (priceCents || 0n) / BigInt(10 ** 18))}` : "—";
    const progress = tranche?.claimCounts ? Math.min((tranche.claimCounts / 12) * 100, 100) : 0;

    return (
        <div className={`relative flex flex-col p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${bgClass} ${borderClass}`}>

            {tranche?.active && (
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClass} rounded-t-2xl opacity-80`} />
            )}

            <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-black uppercase tracking-tighter ${textClass}`}>{title}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${tranche?.active ? "bg-white/80 dark:bg-black/20 text-green-600" : "bg-muted text-muted-foreground"}`}>
                    {tranche?.active ? "Live" : "Idle"}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Principal</div>
                    <div className="text-lg font-black">{fmtUSDc(tranche?.amountUSDCents)}</div>
                </div>
                <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Progress</div>
                    <div className="text-lg font-black flex items-center gap-2">
                        {tranche?.claimCounts ?? 0}/12
                    </div>
                </div>
            </div>

            <div className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mb-5">
                <div className={`h-full transition-all duration-700 rounded-full shadow-sm ${progressClass}`} style={{ width: `${progress}%` }} />
            </div>

            <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5 mt-auto">
                <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-muted-foreground">Next Claim</span>
                    <span className="font-black">{fmtTs(tranche?.nextClaimAt)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-muted-foreground">Accumulated</span>
                    <span className={`font-black ${textClass}`}>{pendingFmt}</span>
                </div>

                {tranche?.active && (
                    <button
                        disabled={!claimable || loading}
                        onClick={onClaim}
                        className={`
                            w-full mt-2 py-2.5 rounded-xl font-bold text-xs uppercase transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                            text-white bg-gradient-to-r ${colorClass} hover:opacity-90
                        `}
                    >
                        {loading ? "Claiming..." : claimable ? "Claim LP" : "LP Accruing"}
                    </button>
                )}
            </div>
        </div>
    );
}
