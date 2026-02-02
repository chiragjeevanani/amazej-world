import * as React from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { Check, Crown, Star, Target, Users, Zap, Award, Info, ChevronRight } from "lucide-react";

function fmtUSD(usd) { return "USDT " + usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtUSDCents(c) { return "USDT " + (Number(c ?? 0n) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function numUSDCents(c) { return (Number(c ?? 0n) / 100); }

export default function VipScreen() {
    const { data, actions } = useProtocol();
    const currentLevel = Number(data.vip?.currentLevel ?? 0);
    const pendingVipTokens = (data.claimVip?.amountUSDT || 0n);
    const canClaim = pendingVipTokens > 0n;

    const getTableVal = (arr, lvl) => numUSDCents(arr ? arr[lvl] : 0n);

    const nextLevel = Math.min(7, currentLevel + 1);
    const { vipTables } = data;
    const progress = React.useMemo(() => {
        if (!vipTables || !data.user) return null;
        const self = Number(data.user.baseUSDCents || 0n) / 100;
        const directs = Number(data.referral?.directReferrals || 0);
        const team = Number(data.referral?.teamMembers || 0);

        const tSelf = getTableVal(vipTables.selfCents, nextLevel);
        const tDirects = Number(vipTables.directsVip1Min?.[nextLevel] || vipTables.directsMin?.[nextLevel] || 0);
        const tTeam = Number(vipTables.teamMin?.[nextLevel] || 0);

        return { self, directs, team, tSelf, tDirects, tTeam };
    }, [vipTables, data.user, data.referral, nextLevel]);

    return (
        <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8">
            {/* VIP Status & Header */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-card/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Crown size={200} className="text-yellow-500 -rotate-12" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-500">
                                <Star size={14} className="animate-pulse fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">VIP Protocol Status</span>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-4">
                                    Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">VIP Tiers</span>
                                </h1>
                                <p className="text-lg font-bold text-muted-foreground max-w-md">
                                    Unlock massive rewards, monthly salaries, and one-time bonuses as you scale the protocol.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center lg:items-end gap-6">
                            <div className="text-center lg:text-right bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Current Standing</p>
                                <div className="text-3xl font-black text-yellow-500">Level {currentLevel}</div>
                            </div>
                            <div className="text-center lg:text-right">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Accumulated Bonuses</p>
                                <div className="text-4xl font-black tabular-nums tracking-tight mb-4">
                                    USDT {(Number(pendingVipTokens) / 100).toFixed(2)}
                                </div>
                                <button
                                    disabled={!canClaim || actions.loading.claimVIP}
                                    onClick={() => actions.claimVIP()}
                                    className={`
                                        group relative w-full lg:w-auto h-14 min-w-[200px] rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl overflow-hidden
                                        ${canClaim
                                            ? "bg-yellow-500 text-black shadow-yellow-500/40 hover:scale-105"
                                            : "bg-white/5 border border-white/10 text-muted-foreground opacity-50 cursor-not-allowed"}
                                    `}
                                >
                                    {canClaim && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
                                    <span className="relative z-10">
                                        {actions.loading.claimVIP ? "Syncing..." : canClaim ? "Claim Rewards" : "No Rewards"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Next Level Requirements */}
            {progress && nextLevel <= 7 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                            <Target size={18} />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">Your Path to VIP {nextLevel}</h2>
                    </div>

                    <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-8">
                                <RequirementItem
                                    label="Self Stake"
                                    current={progress.self}
                                    target={progress.tSelf}
                                    icon={<Award size={18} />}
                                    prefix="USDT "
                                />
                                <RequirementItem
                                    label={nextLevel > 1 ? "Directs with VIP1" : "Direct Referrals"}
                                    current={progress.directs}
                                    target={progress.tDirects}
                                    icon={<Users size={18} />}
                                />
                                <RequirementItem
                                    label="Team Members"
                                    current={progress.team}
                                    target={progress.tTeam}
                                    icon={<Zap size={18} />}
                                />
                            </div>
                            <div className="space-y-6">
                                <div className="p-6 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                                        <Info size={40} className="text-yellow-500" />
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-yellow-500 mb-2">Protocol Note</h4>
                                    <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">
                                        Reach all milestones above to qualify for VIP {nextLevel} rewards. Self stake is based on your current active plan.
                                    </p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Est. Reward Increase</span>
                                        <span className="text-emerald-500 font-black">+25%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full">
                                        <div className="h-full bg-emerald-500 w-1/4 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* VIP Tiers Roadmap */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Award size={18} />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">VIP Rewards Roadmap</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7].map(lvl => (
                        <LevelCard
                            key={lvl}
                            level={lvl}
                            vipTables={vipTables}
                            currentLevel={currentLevel}
                            redeProgress={data.redeProgress}
                            nextClaimAt={data.vipProg?.[lvl]?.nextClaimAt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function RequirementItem({ label, current, target, icon, prefix = "" }) {
    const ok = current >= target;
    const pct = Math.min(100, Math.max(2, (Number(current) / Number(target || 1)) * 100));

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${ok ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-white/5 text-muted-foreground border border-white/10'}`}>
                        {ok ? <Check size={20} strokeWidth={3} /> : icon}
                    </div>
                    <div className="min-w-0">
                        <span className="text-lg font-black text-foreground tracking-tight block truncate">{label}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {ok ? 'Target Reached' : 'In Progress'}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] sm:hidden">Value</span>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black tabular-nums">{prefix}{current.toLocaleString()}</span>
                        <span className="text-muted-foreground/40 text-sm font-black">/</span>
                        <span className="text-muted-foreground text-sm font-bold">{prefix}{target.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                    className={`absolute inset-0 h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${ok ? 'bg-yellow-400' : 'bg-yellow-400/30'}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

function LevelCard({ level, vipTables, currentLevel, redeProgress, nextClaimAt }) {
    if (!vipTables) return null;

    const self = numUSDCents(vipTables.selfCents[level]);
    const salary = numUSDCents(vipTables.vipPerClaimCents[level]);
    const oneTime = numUSDCents(vipTables.oneTimeCents?.[level]);
    const dMin = Number(vipTables.directsMin?.[level] || 0);
    const dv1Min = Number(vipTables.directsVip1Min?.[level] || 0);
    const tMin = Number(vipTables.teamMin?.[level] || 0);

    const isUnlocked = currentLevel >= level;
    const isEligible = !isUnlocked && (currentLevel + 1 === level);
    const redeCount = redeProgress ? Number(redeProgress[level] || 0) : 0;

    const { data } = useProtocol();
    const teamCount = Number(data.referral?.teamMembers || 0);
    const directCount = Number(data.referral?.directReferrals || 0);

    return (
        <div className={`relative group transition-all duration-500 ${isUnlocked ? 'scale-[1.01]' : ''}`}>
            {isUnlocked && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/40 to-amber-500/20 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            )}
            <div className={`relative bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl overflow-hidden transition-all group-hover:border-white/20`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border transition-all duration-500 ${isUnlocked ? 'bg-yellow-500 border-yellow-400 text-black shadow-lg shadow-yellow-500/20' : 'bg-white/5 border-white/10 text-muted-foreground group-hover:scale-110'}`}>
                            {level}
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-foreground">VIP {level} Status</h3>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Protocol Tier Explorer</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black border ${isUnlocked ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' :
                        isEligible ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                            'bg-white/5 text-muted-foreground/40 border-white/10'
                        }`}>
                        {isUnlocked ? 'Active Phase' : isEligible ? 'Eligible for Activation' : 'Tier Locked'}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                    <LevelStat label="Self Stake" value={`$${self.toLocaleString()}`} />
                    <LevelStat label={level > 1 ? "VIP1 Directs" : "Directs"} value={`${directCount} / ${level > 1 ? dv1Min : dMin}`} />
                    <LevelStat label="Team" value={`${teamCount} / ${tMin}`} />
                    <LevelStat label="One-Time Bonus" value={`$${oneTime}`} highlight={!isUnlocked} />
                    <LevelStat label="Monthly Salary" value={`$${salary}/mo`} />
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest block">Next Payout</span>
                        <div className="text-sm font-black truncate tabular-nums">
                            {nextClaimAt && nextClaimAt > 0n ? new Date(Number(nextClaimAt) * 1000).toLocaleDateString() : "—"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LevelStat({ label, value, highlight }) {
    return (
        <div className="space-y-1">
            <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest block">{label}</span>
            <div className={`text-xl font-black tabular-nums tracking-tight ${highlight ? 'text-yellow-500' : 'text-foreground'}`}>
                {value}
            </div>
        </div>
    );
}

