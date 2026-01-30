import * as React from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { Check } from "lucide-react";

const fmtUSD = (usd) => usd.toLocaleString(undefined, { style: "currency", currency: "USD" });
const fmtUSDCents = (c) => (Number(c ?? 0n) / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
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
        <div className="space-y-6 max-w-2xl mx-auto md:max-w-none p-4 md:p-8 bg-[#1a2b5d] rounded-3xl min-h-screen">
            {/* VIP Pending Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-black">VIP</span>
                    <span className="text-sm font-medium text-gray-500">Pending:</span>
                    <span className="text-xl font-bold text-black">${(Number(pendingVipTokens) / 100).toFixed(2)}</span>
                </div>
                <button
                    disabled={!canClaim || actions.loading.claimVIP}
                    onClick={() => actions.claimVIP()}
                    className="py-3 px-6 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-base font-medium text-black transition-all shadow-sm active:scale-95 text-center min-w-[140px]"
                >
                    {actions.loading.claimVIP ? "Wait…" : "Claim VIP Rewards"}
                </button>
            </div>

            {/* VIP Progress Card */}
            <div className="bg-[#ebf3ff] rounded-2xl p-6 border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#1a4b8d]">Progress to VIP {nextLevel}</h3>
                    <span className="text-xs font-bold text-blue-500">Current: VIP {currentLevel}</span>
                </div>

                {progress && (
                    <div className="space-y-6">
                        <RequirementItem
                            label="Self Stake"
                            current={progress.self}
                            target={progress.tSelf}
                            subValue={`$${progress.self.toLocaleString()} / $${progress.tSelf.toLocaleString()}`}
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

                        <div className="pt-4 text-xs font-semibold text-[#1a4b8d]/60 leading-relaxed">
                            Hit all checks above to unlock VIP {nextLevel}. Self stake shown is your current base plan amount.
                        </div>
                    </div>
                )}
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
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${ok ? 'bg-[#4caf50] text-white' : 'bg-gray-100 text-gray-300'}`}>
                        {ok ? <Check size={14} strokeWidth={4} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <span className="text-[17px] font-bold text-[#1a4b8d]">{label}</span>
                </div>
                <span className="text-[15px] font-bold text-blue-500/80">
                    {subValue}
                </span>
            </div>
            <div className="h-3.5 w-full bg-white rounded-full overflow-hidden shadow-inner border border-blue-50">
                <div
                    className={`h-full rounded-full transition-all duration-700 ${ok ? 'bg-[#ffcc00]' : 'bg-[#ffcc00]/20'}`}
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
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <span className="text-2xl font-bold text-black">VIP {level}</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${isUnlocked ? 'bg-green-50 text-green-600' :
                    isEligible ? 'bg-green-50 text-green-600' :
                        'bg-orange-50 text-orange-600'
                    }`}>
                    {isUnlocked ? 'Active' : isEligible ? 'Eligible' : 'Not yet'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-y-6">
                <div>
                    <span className="text-[15px] font-medium text-gray-500 block mb-1">Self Stake</span>
                    <div className="text-base font-bold text-black">${self.toLocaleString()}</div>
                </div>
                <div>
                    <span className="text-[15px] font-medium text-gray-500 block mb-1">{level > 1 ? "VIP1 Directs" : "Directs"}</span>
                    <div className="text-base font-bold text-black">{directCount} / {level > 1 ? dv1Min : dMin}</div>
                </div>

                <div>
                    <span className="text-[15px] font-medium text-gray-500 block mb-1">Team</span>
                    <div className="text-base font-bold text-black">{teamCount} / {tMin}</div>
                </div>
                <div>
                    <span className="text-[15px] font-medium text-gray-500 block mb-1">One-Time</span>
                    <div className="text-base font-bold text-black">
                        {isUnlocked ? "Claimed" : "Unclaimed"} ({oneTime})
                    </div>
                </div>

                <div>
                    <span className="text-[15px] font-medium text-gray-500 block mb-1">Salary</span>
                    <div className="text-base font-bold text-black">
                        {redeCount}/4 (${salary}/claim)
                    </div>
                </div>
                {isUnlocked && nextClaimAt && (
                    <div>
                        <span className="text-[15px] font-medium text-gray-500 block mb-1">Next Salary</span>
                        <div className="text-xs font-bold text-black leading-tight">
                            {new Date(Number(nextClaimAt) * 1000).toLocaleString('en-GB', {
                                day: '2-digit', month: '2-digit', year: 'numeric',
                                hour: '2-digit', minute: '2-digit', second: '2-digit',
                                hour12: true
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
