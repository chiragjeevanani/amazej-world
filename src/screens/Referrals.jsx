import React from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { fmtTs } from "@/screens/Plans";
import { Users, TrendingUp, Coins, Activity, Rocket, Clock, ShieldCheck, ShieldAlert } from "lucide-react";

function fmtUSDCents(c) { return "USDT " + (Number(c ?? 0n) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function ReferralsComponent() {
    const { data } = useProtocol();

    return (
        <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Users size={24} />
                        </div>
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Affiliate Program</h2>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Network</span>
                    </h1>
                </div>
                <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-xl">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Network Strength</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xl font-black">Active Protocol</span>
                    </div>
                </div>
            </div>

            {/* Performance Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <PerformanceCard
                    label="Total Rewards"
                    value={fmtUSDCents(data.referral?.availableReferralUSDCents)}
                    icon={<Coins className="text-yellow-400" />}
                    trend="+12.5%"
                    description="Accumulated earnings"
                />
                <PerformanceCard
                    label="Direct Network"
                    value={String(data.referral?.directReferrals ?? 0)}
                    icon={<Users className="text-blue-400" />}
                    description="Directly referred users"
                />
                <PerformanceCard
                    label="Total Team"
                    value={String(data.referral?.teamMembers ?? 0)}
                    icon={<Activity className="text-emerald-400" />}
                    description="Total downline members"
                />
                <PerformanceCard
                    label="Team Volume"
                    value={fmtUSDCents(data.referral?.teamDepositsCents)}
                    icon={<TrendingUp className="text-purple-400" />}
                    description="Total network volume"
                />
            </div>

            {/* Fast Track & Windows Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Fast Track Status Card */}
                <div className="lg:col-span-2 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-indigo-500/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-card/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Rocket size={160} className="text-primary -rotate-12" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black tracking-tight">Fast Track Status</h3>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enhanced Rewards Qualification</p>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] border ${data.referral?.unlocked ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-orange-500/20 text-orange-500 border-orange-500/30'}`}>
                                    {data.referral?.unlocked ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
                                    {data.referral?.unlocked ? 'Active' : 'Locked'}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3 text-muted-foreground mb-4">
                                        <Clock size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Window Start</span>
                                    </div>
                                    <div className="text-lg font-black">{fmtTs(data.referral?.windowStart)}</div>
                                </div>
                                <div className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3 text-muted-foreground mb-4">
                                        <Clock size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Window Deadline</span>
                                    </div>
                                    <div className="text-lg font-black">{fmtTs(data.referral?.windowEnd)}</div>
                                </div>
                            </div>

                            <div className="pt-4 text-xs font-medium text-muted-foreground/60 leading-relaxed italic">
                                * Fast Track rewards are calculated based on your network performance within the specified window end date. Ensure all criteria are met before the deadline.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 flex flex-col justify-center space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 mb-2">
                        <TrendingUp size={32} />
                    </div>
                    <h3 className="text-2xl font-black leading-tight">Scale Your <br /> Earnings</h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        Refer new users to the Amazej Protocol and earn a percentage of their staking rewards. The more active your network, the higher your tier.
                    </p>
                    <button className="w-full py-4 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-95 shadow-xl">
                        View Guidelines
                    </button>
                </div>
            </div>
        </div>
    );
}

function PerformanceCard({ label, value, icon, description, trend }) {
    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
            <div className="relative bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                        {icon}
                    </div>
                    {trend && (
                        <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg uppercase tracking-widest">
                            {trend}
                        </span>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
                    <h3 className="text-2xl font-black text-foreground tabular-nums tracking-tighter">{value}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider pt-2">{description}</p>
                </div>
            </div>
        </div>
    );
}

