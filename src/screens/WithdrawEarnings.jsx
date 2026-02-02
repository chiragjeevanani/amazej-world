import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useProtocol } from "@/contexts/ProtocolContext";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
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
            toast.success(t('withdraw.success_msg'));
            actions.refetch();
        } catch (e) { }
    };

    return (
        <div className="space-y-6">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-card/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div>
                            <h3 className="text-3xl font-black tracking-tight">{t('withdraw.title')}</h3>
                            <p className="text-muted-foreground/60 font-bold mt-2">{t('withdraw.subtitle')}</p>
                        </div>
                        <button
                            disabled={!canClaim || actions.loading.claimReferral}
                            onClick={onClaim}
                            className={`h-16 min-w-[240px] rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-20 disabled:scale-100 ${canClaim ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-primary text-primary-foreground shadow-primary/40'}`}
                        >
                            {actions.loading.claimReferral ? t('home.processing') : cd.due ? t('withdraw.withdraw_now') : t('withdraw.window_locked')}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GreenTile label={t('withdraw.available_usd')} value={`$${fmtUSDc(withdraw?.availableWithdraw)}`} />
                        <GreenTile label={t('withdraw.available_ama')} value={fmtTok(withdraw?.availableWithdrawTokens)} />
                        <GreenTile label={t('withdraw.total_withdrawn_usd')} value={`$${fmtUSDc(withdraw?.totalWithdrawn)}`} />
                        <GreenTile label={t('withdraw.total_withdrawn_ama')} value={fmtTok(withdraw?.totalTokensWithdrawn)} />
                        <GreenTile label={t('withdraw.last_claimed')} value={fmtDate(withdraw?.lastReferralClaimAt)} />
                        <GreenTile label={t('withdraw.next_claim')} value={nextRefAt === 0n || cd.due ? t('withdraw.not_available') : fmtDate(nextRefAt)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function GreenTile({ label, value }) {
    return (
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl transition-all hover:bg-white/10 hover:scale-[1.02] group/tile">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">{label}</div>
            <div className="text-2xl font-black text-emerald-400 tracking-tighter group-hover/tile:text-emerald-300 transition-colors">{value}</div>
        </div>
    );
}
