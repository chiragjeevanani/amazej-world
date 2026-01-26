import React from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { fmtTs } from "@/screens/Plans";

const fmtUSDCents = (c) => (Number(c ?? 0n) / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });

export default function ReferralsComponent() {
    const { data } = useProtocol();

    return (
        <div className="space-y-8">
            <section className="bg-card rounded-2xl border border-border p-6 shadow-2xl transition-colors">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-black text-card-foreground">Referrals</h3>
                        <p className="text-muted-foreground text-sm mt-1">Real-time referral performance</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InfoTile label="Accumulated Rewards" value={fmtUSDCents(data.referral?.availableReferralUSDCents)} />
                    <InfoTile label="Direct Network" value={String(data.referral?.directReferrals ?? 0)} />
                    <InfoTile label="Total Organization" value={String(data.referral?.teamMembers ?? 0)} />
                    <InfoTile label="Global Volume" value={fmtUSDCents(data.referral?.teamDepositsCents)} />
                </div>

                <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Fast Track Status</span>
                        <span className={`text-sm font-black ${data.referral?.unlocked ? 'text-green-500' : 'text-yellow-500'}`}>
                            {data.referral?.unlocked ? 'Active' : 'Locked'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Window Start</span>
                        <span className="text-sm font-black text-card-foreground">{fmtTs(data.referral?.windowStart)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Window Deadline</span>
                        <span className="text-sm font-black text-card-foreground">{fmtTs(data.referral?.windowEnd)}</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

function InfoTile({ label, value }) {
    return (
        <div className="p-4 bg-secondary/30 rounded-xl border border-border">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{label}</div>
            <div className="text-xl font-black text-card-foreground">{value}</div>
        </div>
    );
}
