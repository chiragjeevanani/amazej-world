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
        const tDirects = Number(vipTables.directsMin?.[nextLevel] || 0);
        const tTeam = Number(vipTables.teamMin?.[nextLevel] || 0);

        return { self, directs, team, tSelf, tDirects, tTeam };
    }, [vipTables, data.user, data.referral, nextLevel]);

    return (
        <div className="space-y-8 max-w-2xl mx-auto md:max-w-none">
            {/* VIP Progress Card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black uppercase tracking-wide">VIP</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-muted-foreground">Pending: {fmtUSDCents(pendingVipTokens)}</span>
                        <button
                            disabled={!canClaim || actions.loading.claimVIP}
                            onClick={() => actions.claimVIP()}
                            className="h-8 px-4 rounded border border-border bg-background hover:bg-accent text-xs font-black uppercase tracking-widest transition-colors disabled:opacity-50"
                        >
                            {canClaim ? "Claim Rewards" : "No VIP rewards"}
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-blue-900/10 rounded-xl p-6 border-2 border-blue-400 dark:border-blue-900/30">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-black dark:text-white" style={{ color: 'var(--foreground, #000)' }}>Progress to VIP {nextLevel}</h3>
                        <span className="text-xs font-bold dark:text-white" style={{ color: 'var(--foreground, #000)' }}>Current: VIP {currentLevel}</span>
                    </div>

                    {progress && (
                        <div className="space-y-4">
                            <RequirementItem label="Self Stake" current={progress.self} target={progress.tSelf} isCurrency />
                            {progress.tDirects > 0 && (
                                <RequirementItem label="Direct Team" current={progress.directs} target={progress.tDirects} />
                            )}
                            {progress.tTeam > 0 && (
                                <RequirementItem label="Total Team" current={progress.team} target={progress.tTeam} />
                            )}

                            <div className="pt-4 text-[10px] dark:text-white font-medium leading-relaxed" style={{ color: 'var(--foreground, #000)' }}>
                                Hit all checks above to unlock VIP {nextLevel}. Self stake shown is your current base plan amount.
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Redeposit Rewards */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-xl font-black">Redeposit Rewards</h3>
                    <span className="text-xs font-medium text-muted-foreground">Current Team Count: {Number(data.referral?.teamMembers ?? 0)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7].map(lvl => (
                        <LevelCard
                            key={lvl}
                            level={lvl}
                            vipTables={vipTables}
                            currentLevel={currentLevel}
                            redeProgress={data.redeProgress}
                            type="redeposit"
                        />
                    ))}
                </div>
            </div>

            {/* VIP Levels */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-xl font-black">VIP Levels</h3>
                    <span className="text-xs font-medium text-muted-foreground">Current: VIP {currentLevel}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7].map(lvl => (
                        <LevelCard
                            key={lvl}
                            level={lvl}
                            vipTables={vipTables}
                            currentLevel={currentLevel}
                            type="main"
                        />
                    ))}
                </div>

                {/* Detailed Table */}
                <div className="pt-8">
                    <h3 className="text-xl font-black mb-4 px-2">Detailed Requirements</h3>
                    <VipDetailsTable vipTables={vipTables} currentLevel={currentLevel} />
                </div>
            </div>
        </div>
    );
}

function VipDetailsTable({ vipTables, currentLevel }) {
    if (!vipTables) {
        return (
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
                <p className="text-muted-foreground text-sm">Connect your wallet to view detailed VIP requirements</p>
            </div>
        );
    }

    const getVal = (arr, i) => numUSDCents(arr?.[i]);

    return (
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-secondary/30 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Level</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Self Stake</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Directs</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Team</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">One-Time</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Salary</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {[1, 2, 3, 4, 5, 6, 7].map((lvl) => {
                            const isReached = currentLevel >= lvl;
                            const self = getVal(vipTables.selfCents, lvl);
                            const bonus = getVal(vipTables.oneTimeCents, lvl);
                            const salary = getVal(vipTables.vipPerClaimCents, lvl);
                            const directs = Number(vipTables.directsMin?.[lvl] || 0);
                            const team = Number(vipTables.teamMin?.[lvl] || 0);

                            return (
                                <tr key={lvl} className={`transition-colors hover:bg-muted/10 ${isReached ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                                    <td className="px-6 py-4 text-sm font-black text-foreground">VIP {lvl}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-foreground">{fmtUSD(self)}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{directs}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{team}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600 dark:text-green-400">{fmtUSD(bonus)}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400">{fmtUSD(salary)}</td>
                                    <td className="px-6 py-4">
                                        {isReached ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                                                Locked
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function RequirementItem({ label, current, target, isCurrency }) {
    const ok = current >= target;
    const pct = Math.min(100, Math.max(0, (current / target) * 100));

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${ok ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {ok ? <Check size={12} strokeWidth={4} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <span className="text-sm font-bold text-foreground">{label}</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">
                    {isCurrency ? fmtUSD(current) : current} / {isCurrency ? fmtUSD(target || 0) : target}
                </span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function LevelCard({ level, vipTables, currentLevel, redeProgress, type }) {
    if (!vipTables) return null;

    const self = numUSDCents(vipTables.selfCents[level]);
    const salary = numUSDCents(vipTables.vipPerClaimCents[level]);
    const oneTime = numUSDCents(vipTables.oneTimeCents?.[level]);

    const isUnlocked = currentLevel >= level;
    const redeCount = redeProgress ? Number(redeProgress[level] || 0) : 0;

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <span className="text-xl font-black text-foreground">VIP {level}</span>
                <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${isUnlocked ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                    {isUnlocked ? 'Active' : 'Not yet'}
                </span>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-foreground font-medium">Self Stake</span>
                        <span className="text-base font-medium text-foreground">{fmtUSD(self)}</span>
                    </div>

                    {type === 'main' ? (
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-foreground font-medium">One-Time</span>
                            <span className="text-base font-medium text-foreground">Unclaimed ({isUnlocked ? '0' : '0'})</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-foreground font-medium">Status</span>
                            <span className="text-base font-medium text-foreground">{isUnlocked ? 'Active' : 'Locked'}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm text-foreground font-medium">Salary</span>
                    <div className="text-base font-medium text-foreground">
                        {type === 'redeposit' ? `${redeCount}/4` : '0/4'} ({fmtUSD(salary)}/claim)
                    </div>
                </div>
            </div>
        </div>
    );
}
