import * as React from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { Check } from "lucide-react";

const fmtUSD = (usd) => "USDT " + usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtUSDCents = (c) => "USDT " + (Number(c ?? 0n) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const numUSDCents = (c) => (Number(c ?? 0n) / 100);

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
        <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-8">
            {/* VIP Status & Progress Card */}
            <div className="bg-card/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Header: VIP + Pending + Action */}
                <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <h2 className="text-3xl font-black text-foreground">VIP</h2>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pending Rewards</span>
                            <span className="text-xl font-bold text-foreground">USDT {(Number(pendingVipTokens) / 100).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        disabled={!canClaim || actions.loading.claimVIP}
                        onClick={() => actions.claimVIP()}
                        className={`
                            w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all active:scale-95
                            ${canClaim
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                                : "bg-white/5 text-muted-foreground border border-white/10 cursor-not-allowed"}
                        `}
                    >
                        {actions.loading.claimVIP ? "Processing..." : canClaim ? "Claim Rewards" : "No VIP rewards"}
                    </button>
                </div>

                {/* Progress Section */}
                <div className="p-6 md:p-8 bg-primary/5">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-black text-foreground">Progress to VIP {nextLevel}</h3>
                            <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mt-1">Unlock next tier benefits</p>
                        </div>
                        <div className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/30">
                            Current: VIP {currentLevel}
                        </div>
                    </div>

                    {progress && (
                        <div className="space-y-8">
                            <RequirementItem
                                label="Self Stake"
                                current={progress.self}
                                target={progress.tSelf}
                                subValue={`USDT ${progress.self.toLocaleString()} / USDT ${progress.tSelf.toLocaleString()}`}
                            />
                            <RequirementItem
                                label={nextLevel > 1 ? "Directs with VIP1" : "Direct Referrals"}
                                current={progress.directs}
                                target={progress.tDirects}
                                subValue={`${progress.directs} / ${progress.tDirects}`}
                            />
                            <RequirementItem
                                label="Your Team Members"
                                current={progress.team}
                                target={progress.tTeam}
                                subValue={`${progress.team} / ${progress.tTeam}`}
                            />

                            <div className="mt-8 p-5 bg-background/50 rounded-2xl border border-white/5 text-xs font-medium text-muted-foreground leading-relaxed italic">
                                Hit all checks above to unlock VIP {nextLevel}. Self stake shown is your current base plan amount.
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* VIP Levels Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">VIP Levels</h3>
                    <span className="text-sm font-medium text-white/60">Current: VIP {currentLevel}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
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



function RequirementItem({ label, current, target, subValue }) {
    const ok = current >= target;
    const pct = Math.min(100, Math.max(2, (Number(current) / Number(target || 1)) * 100));

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${ok ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/10 text-white/20 border border-white/10'}`}>
                        {ok ? <Check size={16} strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                    <span className="text-lg font-black text-foreground tracking-tight">{label}</span>
                </div>
                <span className="text-base font-black text-foreground/80 tabular-nums">
                    {subValue}
                </span>
            </div>
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${ok ? 'bg-yellow-400' : 'bg-yellow-400/30'}`}
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
        <div className={`relative group transition-all duration-300 ${isUnlocked ? 'scale-[1.02]' : ''}`}>
            {isUnlocked && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            )}
            <div className={`relative bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl overflow-hidden`}>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border ${isUnlocked ? 'bg-primary border-primary/50 text-white' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>
                            {level}
                        </div>
                        <span className="text-2xl font-black text-foreground">VIP {level}</span>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black border ${isUnlocked ? 'bg-primary/20 text-primary border-primary/30' :
                        isEligible ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' :
                            'bg-orange-500/20 text-orange-500 border-orange-500/30'
                        }`}>
                        {isUnlocked ? 'Active' : isEligible ? 'Eligible' : 'Locked'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {/* Row 1 */}
                    <div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Self Stake</span>
                        <div className="text-xl font-black text-foreground">${self.toLocaleString()}</div>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">{level > 1 ? "VIP1 Directs" : "Directs"}</span>
                        <div className="text-xl font-black text-foreground">{directCount} / {level > 1 ? dv1Min : dMin}</div>
                    </div>

                    {/* Row 2 */}
                    <div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Team</span>
                        <div className="text-xl font-black text-foreground">{teamCount} / {tMin}</div>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">One-Time</span>
                        <div className="text-xl font-black text-foreground">
                            {isUnlocked ? "Claimed" : `Unclaimed (${oneTime})`}
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Salary</span>
                        <div className="text-xl font-black text-foreground">
                            {redeCount}/4 (${salary}/claim)
                        </div>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Next Salary</span>
                        <div className="text-sm font-black text-foreground tabular-nums leading-tight">
                            {nextClaimAt && nextClaimAt > 0n ? new Date(Number(nextClaimAt) * 1000).toLocaleString(undefined, {
                                year: 'numeric', month: 'numeric', day: 'numeric',
                                hour: '2-digit', minute: '2-digit', second: '2-digit',
                                hour12: true
                            }) : "—"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
