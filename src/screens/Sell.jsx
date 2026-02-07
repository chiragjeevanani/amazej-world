import React, { useState } from "react";
import { Banknote, DollarSign, ArrowRightLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProtocol } from "@/contexts/ProtocolContext";
import { roundWithFormat } from "@/blockchain/roundsNumber";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther } from "viem";
import HistoryTabs from "@/components/History";

function SellComponent() {
    const { t } = useTranslation();
    const { data, actions } = useProtocol();
    const { address } = useAccount();
    const [amountIn, setAmountIn] = useState(0);

    return (
        <div className="md:p-6 p-2 w-full space-y-6">
            <div className="grid gap-6 sm:grid-cols-12">
                <div className="col-span-12">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <StatCard
                            title={t('sell.total_balance')}
                            value={roundWithFormat(data.tokenBalance)}
                            unit="AMA"
                            extraContent={`≈ USDT ${(Number(roundWithFormat(data.tokenBalance)) * Number(data.priceUSD || 0)).toFixed(2)}`}
                            icon={<Banknote className="text-secondary-foreground" size={20} />}
                        />
                        <StatCard
                            title={t('sell.usdt_balance')}
                            value={roundWithFormat(data.usdtBalance)}
                            unit="USDT"
                            icon={<Banknote className="text-green-500" size={20} />}
                        />
                        <StatCard
                            title={t('sell.ama_price')}
                            value={data.priceUSD || '0'}
                            unit="USDT"
                            icon={<DollarSign className="text-yellow-500" size={20} />}
                        />
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5">
                    <div className="bg-card border border-border text-card-foreground shadow-2xl rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-black">{t('sell.swap_tokens')}</h2>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('sell.balance')}</p>
                                    <p className="font-mono text-sm">{roundWithFormat(data.tokenBalance)} AMA</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <label>{t('sell.amount_in')}</label>
                                    <button
                                        type="button"
                                        onClick={() => setAmountIn(Number(roundWithFormat(data.tokenBalance)) * 0.99)}
                                        className="text-primary hover:text-primary/80 underline decoration-primary/20 underline-offset-4"
                                    >
                                        {t('sell.max')}
                                    </button>
                                </div>

                                <div className="bg-secondary/30 border border-border rounded-xl p-4 flex items-center gap-4 transition-colors focus-within:border-primary/50 hover:border-border/80">
                                    <input
                                        onChange={(e) => setAmountIn(Number(e.target.value))}
                                        value={amountIn}
                                        placeholder="0.00"
                                        type="number"
                                        className="w-full bg-transparent text-2xl font-black outline-none text-foreground placeholder-muted-foreground/30"
                                    />
                                    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5 border border-border">
                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">A</div>
                                        <span className="font-bold text-sm">AMA</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs font-medium px-1">
                                    <span className="text-muted-foreground">{t('sell.value')}</span>
                                    <span className="text-foreground">≈ USDT {(Number(data.priceUSD) * amountIn).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-center -my-2 relative z-10">
                                <div className="bg-card p-2 rounded-xl border border-border shadow-lg">
                                    <ArrowRightLeft className="w-5 h-5 text-muted-foreground rotate-90" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('sell.receive_estimated')}</label>
                                <div className="bg-secondary/30 border border-border rounded-xl p-4 flex items-center gap-4 opacity-80 cursor-not-allowed">
                                    <div className="w-full text-2xl font-black text-muted-foreground">
                                        {(amountIn * Number(data.priceUSD) * 0.8).toFixed(2)}
                                    </div>
                                    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5 border border-border">
                                        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[8px] font-bold text-white">$</span>
                                        <span className="font-bold text-sm">USDT</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                {!address ? (
                                    <div className="w-full flex justify-center p-4 bg-secondary/10 rounded-xl border border-border">
                                        <ConnectButton />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => actions.sell(parseEther(String(amountIn)))}
                                        disabled={actions.loading.sell || !amountIn}
                                        className="w-full h-14 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest rounded-xl shadow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                                    >
                                        {actions.loading.sell ? t('sell.processing') : t('sell.confirm_swap')}
                                    </button>
                                )}
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] text-muted-foreground italic">
                                    {t('sell.fee_note')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-7">
                    <HistoryTabs onlyShow={'sells'} />
                </div>
            </div>
        </div>
    );
};

export default SellComponent;

function StatCard({ title, value, unit, icon, extraContent }) {
    return (
        <div className="relative group transition-all duration-500 hover:-translate-y-1">
            {/* Colored Light Glow (Emitting from behind) */}
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-indigo-500/10 to-primary/30 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-80 transition-opacity duration-700" />

            {/* Sharp Neon Border Accent */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/60 via-indigo-400/30 to-primary/60 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 bg-card/90 rounded-2xl border border-border p-6 shadow-xl flex items-center justify-between group-hover:border-primary/50 transition-all duration-500 backdrop-blur-sm">
                <div className="space-y-2 text-card-foreground min-w-0 flex-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{title}</h3>
                    <div className="flex flex-col gap-1.5">
                        <div className="text-2xl font-black flex items-baseline gap-1 tracking-tight group-hover:text-primary transition-colors">
                            {value}
                            <span className="text-xs font-black text-muted-foreground/80">{unit}</span>
                        </div>
                        {extraContent && (
                            <div className="flex">
                                <span className="text-[14px] font-black text-emerald-500 bg-emerald-500/15 px-3.5 py-1.5 rounded-lg whitespace-nowrap border border-emerald-500/20 shadow-sm transition-all group-hover:scale-105 group-hover:bg-emerald-500/25">
                                    {extraContent}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform group-hover:bg-primary/20 ml-4">
                    {icon}
                </div>
            </div>
        </div>
    );
}
