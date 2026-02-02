import React from "react";
import StatCard from "../components/StateCard";
import SocialMediaAndContracts from "../components/socialMedia";
import DepositTransactionsTable from "../components/depositTranscation";
import ProtocolHeader from "../components/ProtocolCom";
import LiveDepositsGraph from "../components/LiveDepositGraph";
import GlobalReward from "../components/GlobalReward";
import {
    depositData,
    rewardData,
    sampleData,
    transactions,
} from "@/const/data";
import { DollarSign, Droplets, RotateCcw, TrendingUp, Wallet, ArrowUpCircle } from "lucide-react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { useAccount } from "wagmi";
import { ClaimCountdown } from "@/components/Countdown";
import { roundWithFormat } from "@/blockchain/roundsNumber";
import { useTranslation } from "react-i18next";

function fmtUSDc(cents) {
    if (cents === undefined) return "-";
    const c = typeof cents === "number" ? BigInt(cents) : cents;
    const s = (Number(c) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `USDT ${s}`;
}

function PersonalStat({ label, value, subValue }) {
    return (
        <div className="bg-card border border-border p-5 rounded-2xl shadow-lg hover:shadow-primary/5 transition-all text-card-foreground">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
            <div className="text-2xl font-black mb-1">{value}</div>
            <div className="text-xs font-black text-muted-foreground/80 uppercase tracking-wider">{subValue}</div>
        </div>
    );
}

function HomeComponet() {
    const { t } = useTranslation();
    const { data, actions } = useProtocol();
    const { isConnected } = useAccount();
    const { loading } = actions;

    const nextPhase = data.user?.nextPhase ?? 0;
    const baseCents = data.user?.baseUSDCents ?? 0n;

    const nextRequiredDepositCents = React.useMemo(() => {
        if (!data?.user?.hasPlan) return 0n;
        if (nextPhase === 0) return baseCents + 1000n;
        if (nextPhase === 1) return baseCents / 2n;
        if (nextPhase === 2) return baseCents / 4n;
        return 0n;
    }, [data.user, baseCents, nextPhase]);

    const topUpSection = React.useMemo(() => {
        if (!data.user?.hasPlan) return null;
        const win = data.depositWindow;
        const eligible = Boolean(win?.allowed);

        const fmtTSLocal = (n) => !n ? "—" : new Date(Number(n) * 1000).toLocaleString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        const eta = (at) => {
            if (!at) return "";
            const now = Math.floor(Date.now() / 1000);
            const target = Number(at);
            const s = Math.max(0, target - now);
            const sec = s % 60;
            const m = Math.floor(s / 60) % 60;
            const h = Math.floor(s / 3600) % 24;
            const d = Math.floor(s / 86400);
            return d > 0 ? `${d}d ${h}h` : h > 0 ? `${h}h ${m}m` : `${m}m ${sec}s`;
        };

        const lockHint = !eligible
            ? t('home.locked_until', { time: fmtTSLocal(win?.earlyOpenAt), left: eta(win?.earlyOpenAt) })
            : win?.early
                ? t('home.early_deposit', { time: fmtTSLocal(win?.startsAt) })
                : t('home.deposit_allowed', { time: fmtTSLocal(win?.startsAt) });

        return (
            <div className="relative group overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-2xl transition-all hover:shadow-primary/5">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ArrowUpCircle size={120} className="text-primary rotate-12" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{t('home.active_plan_info')}</span>
                        </div>
                        <h3 className="text-3xl font-black tracking-tight">{t('home.next_required_topup')}</h3>
                        <div className="flex flex-col">
                            <span className="text-5xl font-black text-foreground drop-shadow-sm">{fmtUSDc(nextRequiredDepositCents)}</span>
                            <p className={`mt-3 text-sm font-bold flex items-center gap-2 ${eligible ? "text-primary/80" : "text-amber-500"}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {lockHint}
                            </p>
                        </div>
                    </div>

                    <button
                        disabled={loading.deposit || loading.approveUsdt || nextRequiredDepositCents <= 0n || !eligible}
                        onClick={async () => {
                            await actions.approveUsdtIfNeeded(nextRequiredDepositCents);
                            await actions.deposit(nextRequiredDepositCents);
                            actions.refetch();
                        }}
                        className="group relative h-16 min-w-[240px] rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 disabled:opacity-20 disabled:scale-100"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10">
                            {loading.deposit || loading.approveUsdt ? t('home.processing') : eligible ? `${t('home.deposit')} ${fmtUSDc(nextRequiredDepositCents)}` : t('home.deposit_locked')}
                        </span>
                    </button>
                </div>
            </div>
        );
    }, [data.user, data.depositWindow, nextRequiredDepositCents, actions, loading]);

    return (
        <div className="space-y-8">
            <div className="md:px-6 p-2">
                <ProtocolHeader />
            </div>

            <div className="p-2 md:px-6 space-y-8">
                {/* Personal Dashboard Section */}
                {isConnected && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Wallet size={18} />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight">{t('home.personal_dashboard')}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <PersonalStat label={t('home.ama_balance')} value={data.tokenBalanceFmt ?? "—"} subValue={data.tokenBalanceFmt ? `USDT ${(Number(data.tokenBalanceFmt) * Number(data.priceUSD || 0)).toFixed(4)}` : t('home.estimated_value')} />
                            <PersonalStat label={t('home.usdt_balance')} value={data.usdtBalanceFmt ?? "—"} subValue={t('home.available_deposit')} />
                            <PersonalStat label={t('home.accumulated_rewards')} value={data.pending?.total !== undefined ? `USDT ${roundWithFormat(data.pending.total * BigInt(Math.floor(Number(data.priceUSD || 0) * 1e18)) / BigInt(1e18))}` : "—"} subValue={t('home.pending_claim')} />
                            <PersonalStat label={t('home.next_claim_window')} value={data?.user?.nextClaimAt ? <ClaimCountdown nextClaimAtSec={data?.user?.nextClaimAt} /> : "—"} subValue={t('home.approximate_time')} />
                        </div>

                        {topUpSection}
                    </div>
                )}

                <div className="pt-4 space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <TrendingUp size={18} />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">{t('home.protocol_analytics')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatCard
                            title={t('home.token_price')}
                            value={data.priceUSD ? `USDT ${data.priceUSD}` : "USDT ——"}
                            subtitle={t('home.per_token')}
                            icon={DollarSign}
                            chartColor="#8884d8"
                        />

                        <StatCard
                            title={t('home.market_cap')}
                            value="USDT 15,423.47"
                            subtitle={t('home.total_valuation')}
                            icon={TrendingUp}
                            chartColor="#4ade80"
                        />

                        <StatCard
                            title={t('home.total_liquidity')}
                            value="USDT 175,979.21"
                            subtitle={t('home.total_funds')}
                            icon={Droplets}
                            chartColor="#60a5fa"
                        />

                        <StatCard
                            title={t('home.circulating_supply')}
                            value="2,074,223.19"
                            subtitle={t('home.tokens_circulation')}
                            icon={RotateCcw}
                            showChart={true}
                            chartColor="#f472b6"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {depositData.map((card) => {
                            const IconComponent = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className="p-6 rounded-2xl bg-card border border-border hover:border-muted-foreground/30 text-card-foreground shadow-xl transition-all"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                            {t(card.name)}
                                        </h3>
                                        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            <IconComponent size={14} />
                                        </div>
                                    </div>
                                    <p className="font-black text-3xl mb-1">
                                        {card.price}
                                    </p>
                                    <p className="font-bold text-[10px] uppercase tracking-widest opacity-40">{card.value}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DepositTransactionsTable
                            transactions={transactions}
                            onSearch={(query) => console.log("Searching:", query)}
                            onExportCSV={() => console.log("Exporting CSV")}
                        />
                        <LiveDepositsGraph totalDeposits={5618} data={sampleData} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GlobalReward title={t('home.global_rewards')} transactions={rewardData} />
                        <GlobalReward title={t('home.global_referral_rewards')} transactions={rewardData} />
                    </div>
                </div>

                <div className="md:px-6 p-2">
                    <SocialMediaAndContracts />
                </div>
            </div>
        </div>
    );
};


export default HomeComponet;
