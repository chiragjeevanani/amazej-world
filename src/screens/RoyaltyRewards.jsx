import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useProtocol } from "@/contexts/ProtocolContext";
import { ClaimCountdown } from "@/components/Countdown";

function fmtUSDT(x) { return x === undefined ? "—" : "USDT " + (Number(x) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtTok(x) { return x === undefined ? "—" : (Number(x) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 }); }
function fmtDate(s) { return !s || s === 0n ? "—" : new Date(Number(s) * 1000).toLocaleString(); }

export default function RoyaltyRewardsComponent() {
    const { t } = useTranslation();
    const { data, actions } = useProtocol();
    const { royalty } = data;

    return (
        <div className="space-y-6">
            <section className="bg-card rounded-2xl border border-border p-6 shadow-2xl transition-colors">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-black text-card-foreground">{t('royalty.title')}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{t('royalty.subtitle')}</p>
                    </div>
                    <button
                        disabled={!data?.royalty?.canClaim || actions.loading.claimRoyalty}
                        onClick={() => actions.claimRoyalty()}
                        className={`font-black text-xs uppercase tracking-widest h-10 px-6 rounded-lg transition-all ${data?.royalty?.canClaim
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-secondary text-muted-foreground/50 cursor-not-allowed border border-border"
                            }`}
                    >
                        {actions.loading.claimRoyalty ? t('royalty.claiming') : data?.royalty?.canClaim ? t('royalty.claim_royalty') : t('royalty.window_locked')}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DarkTile label={t('royalty.active_tier')} value={royalty?.activeLevel > 0 ? `VIP ${royalty.activeLevel}` : t('royalty.none')} />
                    <DarkTile label={t('royalty.pool_participants')} value={Number(royalty?.activeMembersCount || 0)} />
                    <DarkTile label={t('royalty.tenure')} value={Number(royalty?.claimDaysUsed || 0)} highlight={Number(royalty?.claimDaysUsed) > 0} />
                    <DarkTile label={t('royalty.available_reward')} value={fmtUSDT(royalty?.usdt)} highlight={royalty?.canClaim} />
                </div>

                <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{t('royalty.last_distribution')}</span>
                        <span className="text-sm font-black text-card-foreground">{fmtDate(royalty?.lastClaimDate)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{t('royalty.next_window')}</span>
                        <div className="text-sm font-black text-card-foreground">
                            {royalty?.lastClaimDate ? (
                                <ClaimCountdown nextClaimAtSec={(royalty?.lastClaimDate + (data?.claimPeriod || 0n))} />
                            ) : t('royalty.not_scheduled')}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{t('royalty.rewards_status')}</span>
                        <span className={`text-sm font-black ${royalty?.isPermanent ? 'text-green-500' : 'text-yellow-500'}`}>
                            {royalty?.isPermanent ? t('royalty.permanent') : t('royalty.standard')}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}

function DarkTile({ label, value, highlight }) {
    return (
        <div className="p-4 bg-secondary/50 rounded-xl border border-border">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{label}</div>
            <div className={`text-xl font-black ${highlight ? 'text-card-foreground' : 'text-card-foreground/90'}`}>{value}</div>
        </div>
    );
}
