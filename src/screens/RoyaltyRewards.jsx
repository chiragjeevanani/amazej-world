import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useProtocol } from "@/contexts/ProtocolContext";
import { ClaimCountdown } from "@/components/Countdown";

const fmtUSDc = (c) => c === undefined ? "—" : (Number(c) / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
const fmtTok = (x) => x === undefined ? "—" : (Number(x) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 });
const fmtDate = (s) => !s || s === 0n ? "—" : new Date(Number(s) * 1000).toLocaleString();

export default function RoyaltyRewardsComponent() {
    const { data, actions } = useProtocol();
    const { royalty } = data;

    return (
        <div className="space-y-6">
            <section className="bg-card rounded-2xl border border-border p-6 shadow-2xl transition-colors">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-black text-card-foreground">Royalty Rewards</h3>
                        <p className="text-muted-foreground text-sm mt-1">Tier-based performance rewards</p>
                    </div>
                    {data?.royalty?.canClaim && (
                        <button
                            onClick={() => actions.claimRoyalty()}
                            className="bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest h-10 px-6 rounded-lg hover:bg-primary/90 transition-all"
                        >
                            {actions.loading.claimRoyalty ? "Claiming…" : "Claim Royalty"}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DarkTile label="Active Tier" value={`VIP ${Number(royalty?.activeLevel || 0)}`} />
                    <DarkTile label="Pool Participants" value={Number(royalty?.activeMembersCount || 0)} />
                    <DarkTile label="Tenure (Days)" value={Number(royalty?.claimDaysUsed || 0)} />
                    <DarkTile label="Available Reward" value={fmtTok(royalty?.usdt)} highlight />
                </div>

                <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Last Distribution</span>
                        <span className="text-sm font-black text-card-foreground">{fmtDate(royalty?.lastClaimDate)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Next Window</span>
                        <div className="text-sm font-black text-card-foreground">
                            {royalty?.lastClaimDate ? (
                                <ClaimCountdown nextClaimAtSec={(royalty?.lastClaimDate + (data?.claimPeriod || 0n))} />
                            ) : "Not scheduled"}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Rewards Status</span>
                        <span className={`text-sm font-black ${royalty?.isPermanent ? 'text-green-500' : 'text-yellow-500'}`}>
                            {royalty?.isPermanent ? 'Permanent' : 'Standard'}
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
