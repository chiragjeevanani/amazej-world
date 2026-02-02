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
            <section className="bg-popover rounded-2xl border border-border p-6 shadow-2xl text-popover-foreground transition-colors">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-black">{t('withdraw.title')}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{t('withdraw.subtitle')}</p>
                    </div>
                    <button
                        disabled={!canClaim || actions.loading.claimReferral}
                        onClick={onClaim}
                        className="bg-foreground text-background font-black text-xs uppercase tracking-widest h-10 px-6 rounded-lg hover:opacity-90 transition-all disabled:opacity-10"
                    >
                        {actions.loading.claimReferral ? t('home.processing') : cd.due ? t('withdraw.withdraw_now') : t('withdraw.window_locked')}
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <GreenTile label={t('withdraw.available_usd')} value={`$${fmtUSDc(withdraw?.availableWithdraw)}`} />
                    <GreenTile label={t('withdraw.available_ama')} value={fmtTok(withdraw?.availableWithdrawTokens)} />
                    <GreenTile label={t('withdraw.total_withdrawn_usd')} value={`$${fmtUSDc(withdraw?.totalWithdrawn)}`} />
                    <GreenTile label={t('withdraw.total_withdrawn_ama')} value={fmtTok(withdraw?.totalTokensWithdrawn)} />
                    <GreenTile label={t('withdraw.last_claimed')} value={fmtDate(withdraw?.lastReferralClaimAt)} />
                    <GreenTile label={t('withdraw.next_claim')} value={nextRefAt === 0n || cd.due ? t('withdraw.not_available') : fmtDate(nextRefAt)} />
                </div>
            </section>
        </div>
    );
}

function GreenTile({ label, value }) {
    return (
        <div className="p-5 bg-emerald-50 border border-emerald-100/50 rounded-2xl shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-[13px] font-bold text-emerald-800 mb-2">{label}</div>
            <div className="text-2xl font-black text-emerald-900 tracking-tight">{value}</div>
        </div>
    );
}
