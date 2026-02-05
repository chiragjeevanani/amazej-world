import * as React from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { useTranslation } from "react-i18next";
import { Check, Crown, Star, Target, Users, Zap, Award, Info, ChevronRight, RotateCcw } from "lucide-react";

function fmtUSD(usd) { return "USDT " + usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtUSDCents(c) { return "USDT " + (Number(c ?? 0n) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function numUSDCents(c) { return (Number(c ?? 0n) / 100); }

const VIP_THEMES = [
    {
        outer: "bg-sky-400/90",
        inner: "bg-blue-800/20",
        accent: "border-yellow-400/50",
        text: "text-white",
        muted: "text-white/60"
    },
    {
        outer: "bg-teal-500/90",
        inner: "bg-teal-900/30",
        accent: "border-teal-200/20",
        text: "text-white",
        muted: "text-white/60"
    },
    {
        outer: "bg-yellow-400",
        inner: "bg-yellow-600/20",
        accent: "border-white/80",
        text: "text-slate-900",
        muted: "text-slate-900/60"
    },
    {
        outer: "bg-emerald-500",
        inner: "bg-green-900/30",
        accent: "border-sky-300/40",
        text: "text-white",
        muted: "text-white/60"
    },
    {
        outer: "bg-[#008B8B]",
        inner: "bg-[#004c4c]/40",
        accent: "border-yellow-400/30",
        text: "text-white",
        muted: "text-white/60"
    },
    {
        outer: "bg-orange-400",
        inner: "bg-orange-800/20",
        accent: "border-stone-100/50",
        text: "text-white",
        muted: "text-white/60"
    },
    {
        outer: "bg-indigo-700",
        inner: "bg-indigo-950/40",
        accent: "border-slate-300/40",
        text: "text-white",
        muted: "text-white/60"
    }
];

export default function VipScreen() {
    const { t } = useTranslation();
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

        // Use directsVip1 for level > 1, total directs for level 1
        const directs = nextLevel > 1
            ? Number(data.vip?.directsVip1 || 0)
            : Number(data.referral?.directReferrals || 0);

        const team = Number(data.referral?.teamMembers || 0);

        const tSelf = getTableVal(vipTables.selfCents, nextLevel);
        const tDirects = Number(vipTables.directsVip1Min?.[nextLevel] || vipTables.directsMin?.[nextLevel] || 0);
        const tTeam = Number(vipTables.teamMin?.[nextLevel] || 0);

        return { self, directs, team, tSelf, tDirects, tTeam };
    }, [vipTables, data.user, data.referral, data.vip, nextLevel]);

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
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('vip.status_label')}</span>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-4">
                                    {t('vip.exclusive')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">{t('vip.tiers')}</span>
                                </h1>
                                <p className="text-lg font-bold text-muted-foreground max-w-md">
                                    {t('vip.subtitle')}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center lg:items-end gap-6">
                            <div className="text-center lg:text-right bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('vip.current_standing')}</p>
                                <div className="text-3xl font-black text-yellow-500">{t('vip.level', { level: currentLevel })}</div>
                            </div>
                            <div className="text-center lg:text-right">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('vip.accumulated_bonuses')}</p>
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
                                        {actions.loading.claimVIP ? t('vip.syncing') : canClaim ? t('vip.claim_rewards') : t('vip.no_rewards')}
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
                        <h2 className="text-2xl font-black tracking-tight">{t('vip.path_to', { level: nextLevel })}</h2>
                    </div>

                    <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-8">
                                <RequirementItem
                                    label={t('vip.self_stake')}
                                    current={progress.self}
                                    target={progress.tSelf}
                                    icon={<Award size={18} />}
                                    prefix="USDT "
                                />
                                <RequirementItem
                                    label={nextLevel > 1 ? t('vip.directs_vip1') : t('vip.direct_referrals')}
                                    current={progress.directs}
                                    target={progress.tDirects}
                                    icon={<Users size={18} />}
                                />
                                <RequirementItem
                                    label={t('vip.team_members')}
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
                                    <h4 className="text-sm font-black uppercase tracking-widest text-yellow-500 mb-2">{t('vip.protocol_note')}</h4>
                                    <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">
                                        {t('vip.note_text', { level: nextLevel })}
                                    </p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('vip.est_increase')}</span>
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
                        <h2 className="text-2xl font-black tracking-tight">{t('vip.roadmap_title')}</h2>
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

            {/* Redeposit Rewards Section */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-inner">
                            <RotateCcw size={22} />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">{t('vip.redeposit_rewards')}</h2>
                    </div>
                    <div className="bg-orange-500/5 backdrop-blur-md border border-orange-500/20 px-6 py-3 rounded-2xl shadow-sm flex flex-col items-center sm:items-end group hover:border-orange-500/40 transition-all duration-300">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{t('vip.current_team_count')}</span>
                        <div className="text-2xl font-black text-orange-500 tabular-nums leading-none">
                            {data.vip?.rede?.redeTeamCount ? Number(data.vip.rede.redeTeamCount) : 0}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7].map(lvl => (
                        <RedeCard
                            key={lvl}
                            level={lvl}
                            vipTables={vipTables}
                            userRede={data.redeProgress}
                            teamRedeCount={data.vip?.vip?.redeTeamCount}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function RedeCard({ level, vipTables, userRede, teamRedeCount }) {
    const { t } = useTranslation();
    if (!vipTables) return null;

    const self = numUSDCents(vipTables.selfCents[level]);
    const salaryPerClaim = numUSDCents(vipTables.vipPerClaimCents[level]);
    const tMin = Number(vipTables.teamMin?.[level] || 0);
    const maxClaims = Number(vipTables.redeAllowed?.[level - 1] || 4); // Index level-1 for redeAllowed array

    const claimsMade = userRede?.level === level ? Number(userRede.claimsMade) : 0;
    const isLevelActive = (userRede?.level === level && userRede?.open);
    const theme = VIP_THEMES[(level - 1) % VIP_THEMES.length];

    return (
        <div className={`backdrop-blur-md border-[1.5px] rounded-2xl p-5 group transition-all ${theme.outer} ${theme.text} ${theme.accent} shadow-xl hover:scale-[1.01]`}>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col gap-1 min-w-[100px]">
                    <h4 className="text-xl font-black italic">VIP {level}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${theme.muted}`}>
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        {t('vip.qualification')}
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 flex-1 gap-6">
                    <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>{t('vip.self_stake')}</span>
                        <div className="text-sm font-black">${self.toLocaleString()}</div>
                    </div>
                    <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>{t('vip.team')}</span>
                        <div className="text-sm font-black">
                            {teamRedeCount ?? 0} <span className="opacity-40">/</span> {tMin}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>{t('vip.salary')}</span>
                        <div className="text-sm font-black">
                            {claimsMade}/{maxClaims} ({t('vip.salary_frequency', { amount: salaryPerClaim })})
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${isLevelActive
                        ? "bg-white/20 text-white border-white/40 animate-pulse"
                        : "bg-black/10 text-white/40 border-white/10"
                        }`}>
                        {isLevelActive ? t('vip.qualified') : t('vip.not_yet')}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RequirementItem({ label, current, target, icon, prefix = "" }) {
    const { t } = useTranslation();
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
                            {ok ? t('vip.target_reached') : t('vip.in_progress')}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] sm:hidden">{t('vip.value')}</span>
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
    const { t } = useTranslation();
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
    const directVip1Count = Number(data.vip?.directsVip1 || 0);
    const theme = VIP_THEMES[(level - 1) % VIP_THEMES.length];

    return (
        <div className={`relative group transition-all duration-500 ${isUnlocked ? 'scale-[1.01]' : ''}`}>
            {isUnlocked && (
                <div className={`absolute -inset-0.5 opacity-20 group-hover:opacity-40 transition duration-1000 blur rounded-[2rem] ${theme.outer}`}></div>
            )}
            <div className={`relative backdrop-blur-xl border-2 rounded-[2rem] p-6 md:p-8 shadow-2xl overflow-hidden transition-all group-hover:border-white/40 ${theme.outer} ${theme.text} ${theme.accent}`}>
                <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-white/10`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border transition-all duration-500 ${theme.inner} ${theme.accent} group-hover:scale-110 shadow-lg`}>
                            {level}
                        </div>
                        <div>
                            <h3 className="text-2xl font-black italic">{t('vip.status_card', { level: level })}</h3>
                            <p className={`text-xs font-bold uppercase tracking-widest ${theme.muted}`}>{t('vip.tier_explorer')}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black border ${isUnlocked ? 'bg-white/20 text-white border-white/30' :
                        isEligible ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                            'bg-black/20 text-white/40 border-white/10'
                        }`}>
                        {isUnlocked ? t('vip.active_phase') : isEligible ? t('vip.eligible') : t('vip.locked')}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                    <LevelStat label={t('vip.self_stake')} value={`$${self.toLocaleString()}`} theme={theme} />
                    <LevelStat label={level > 1 ? t('vip.directs_vip1') : t('vip.direct_referrals')} value={`${level > 1 ? directVip1Count : directCount} / ${level > 1 ? dv1Min : dMin}`} theme={theme} />
                    <LevelStat label={t('vip.team')} value={`${teamCount} / ${tMin}`} theme={theme} />
                    <LevelStat
                        label={t('vip.one_time_bonus')}
                        value={data.vip?.oneTimeClaimed?.[level - 1] ? `Claimed (${oneTime})` : `$${oneTime}`}
                        highlight={!isUnlocked && !data.vip?.oneTimeClaimed?.[level - 1]}
                        theme={theme}
                    />
                    <LevelStat
                        label={t('vip.salary')}
                        value={`${data.vipProgress?.[0] === level ? (Number(data.vipProgress?.[1] || 0)) : (data.vip?.currentLevel >= level ? (vipTables.redeAllowed?.[level - 1] || 4) : 0)} / ${vipTables.redeAllowed?.[level - 1] || 4} (${t('vip.salary_frequency', { amount: salary })})`}
                        theme={theme}
                    />
                    <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest block ${theme.muted}`}>{t('vip.next_payout')}</span>
                        <div className="text-sm font-black tabular-nums">
                            {nextClaimAt && nextClaimAt > 0n ? new Date(Number(nextClaimAt) * 1000).toLocaleString(undefined, { hour12: true }) : "—"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LevelStat({ label, value, highlight, theme }) {
    return (
        <div className="space-y-1">
            <span className={`text-[10px] font-black uppercase tracking-widest block ${theme.muted}`}>{label}</span>
            <div className={`text-xl font-black tabular-nums tracking-tight ${highlight ? 'text-yellow-400 drop-shadow-md' : ''}`}>
                {value}
            </div>
        </div>
    );
}

