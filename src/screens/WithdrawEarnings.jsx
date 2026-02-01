import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useProtocol } from "@/contexts/ProtocolContext";
import { DollarSign } from "lucide-react"; // Assuming we might want an icon, or just strictly copy
// If LightTile uses hardcoded styles, I'll copy them.

function fmtUSDc(c) { return c === undefined ? "—" : (Number(c) / 100).toFixed(2); }
function fmtTok(x) { return x === undefined ? "—" : (Number(x) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 }); }
function fmtDate(s) { return !s || s === 0n ? "—" : new Date(Number(s) * 1000).toLocaleString(); }

function useCountdown(targetSec) {
    const targetMs = targetSec && targetSec > 0n ? Number(targetSec) * 1000 : 0;
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const remaining = Math.max(0, targetMs - now);
    const due = !targetMs || remaining === 0;
    const d = Math.floor(remaining / 86400000);
    const h = Math.floor((remaining % 86400000) / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);

    return { due, d, h, m, s };
}

export default function WithdrawEarningsComponent() {
    const { data, actions } = useProtocol();
    const { withdraw } = data;

    const nextRefAt = useMemo(() => {
        const last = data.withdraw?.lastReferralClaimAt ?? 0n;
        const period = data.claimPeriod ?? 86400n;
        return last === 0n ? 0n : last + period;
    }, [data.withdraw?.lastReferralClaimAt, data.claimPeriod]);

    const cd = useCountdown(nextRefAt);
    const minCents = 10n;
    const canClaim = (withdraw?.availableWithdraw ?? 0n) >= minCents && cd.due && !actions.loading.claimReferral;

    const onClaim = async () => {
        try {
            await actions.claimReferral();
            toast.success("Withdraw Successfully claimed!");
            actions.refetch();
        } catch (e) { }
    };

    return (
        <div className="space-y-6">
            <section className="bg-popover rounded-2xl border border-border p-6 shadow-2xl text-popover-foreground transition-colors">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-black">Withdraw Earnings</h3>
                        <p className="text-muted-foreground text-sm mt-1">Manage your realized profits</p>
                    </div>
                    <button
                        disabled={!canClaim || actions.loading.claimReferral}
                        onClick={onClaim}
                        className="bg-foreground text-background font-black text-xs uppercase tracking-widest h-10 px-6 rounded-lg hover:opacity-90 transition-all disabled:opacity-10"
                    >
                        {actions.loading.claimReferral ? "Processing…" : cd.due ? "Withdraw Now" : "Window Locked"}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <LightTile label="Unclaimed" currency="USDT" value={fmtUSDc(withdraw?.availableWithdraw)} />
                    <LightTile label="Unclaimed Tokens" value={fmtTok(withdraw?.availableWithdrawTokens)} />
                    <LightTile label="Realized" currency="USDT" value={fmtUSDc(withdraw?.totalWithdrawn)} />
                    <LightTile label="Realized Tokens" value={fmtTok(withdraw?.totalTokensWithdrawn)} />
                </div>

                <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center md:text-left">Last Liquidation</span>
                        <span className="text-sm font-black text-center md:text-left">{fmtDate(withdraw?.lastReferralClaimAt)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center md:text-right">Withdrawal Readiness</span>
                        <div className="text-sm font-black text-center md:text-right">
                            {cd.due ? (
                                canClaim ? <span className="text-green-600">Liquid ready</span> : <span className="text-muted-foreground/50">Insufficient balance</span>
                            ) : (
                                <span className="tabular-nums">{cd.d}d {cd.h}h {cd.m}m {cd.s}s</span>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function LightTile({ label, value, currency }) {
    return (
        <div className="p-4 bg-accent/50 rounded-xl border border-border">
            <div className="flex justify-between items-center mb-1">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</div>
                {currency && <div className="text-sm font-black text-popover-foreground">{currency}</div>}
            </div>
            <div className="text-xl font-black text-popover-foreground">{value}</div>
        </div>
    );
}
