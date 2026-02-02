import {
    Gift,
    Users,
    TrendingUp,
    Shield,
    DollarSign,
    Zap,
    Copy,
    CheckCircle2,
    Share2,
    Crown,
    Star,
    Award,
    Activity,
    ChevronRight,
    Search
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { shortAddress } from "@/blockchain/roundsNumber";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import VipScreen from "@/screens/VIP";

export default function ReferEarnComponent() {
    const { data } = useProtocol();
    const { isConnected, address } = useAccount();
    const [copied, setCopied] = useState(false);

    const referralLink = useMemo(() => {
        if (typeof window === 'undefined') return '';
        const demo = window?.location?.pathname?.includes("/amazejworld");
        return `${window.location.origin}${demo ? '/amazejworld' : ''}/?ref_id=${address}`;
    }, [address]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 p-4 md:p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Gift size={24} />
                        </div>
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Affiliate Center</h2>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
                        Refer & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Earn</span>
                    </h1>
                </div>
                <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-xl">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xl font-black">Agent Network Active</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Left Column: Mechanics */}
                <div className="lg:col-span-2 space-y-10 min-w-0">
                    <section className="space-y-6">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="text-2xl font-black tracking-tight">Referral Mechanics</h2>
                            <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Core Rules</span>
                        </div>

                        <div className="grid gap-4">
                            <MechanicCard
                                icon={<Activity className="text-blue-400" />}
                                title="LP Reward"
                                desc={<>Earn <span className="text-foreground font-black">14%</span> rewards on a <span className="text-foreground font-black">10-day cycle</span>.</>}
                            />
                            <MechanicCard
                                icon={<Share2 className="text-emerald-400" />}
                                title="Referral Reward"
                                desc={<>Flat <span className="text-foreground font-black">5%</span> referral reward on direct referrals.</>}
                            />
                            <MechanicCard
                                icon={<Zap className="text-yellow-400" />}
                                title="Fastrack Reward"
                                desc={<>Unlock <span className="text-foreground font-black">7 direct first deposits within 30 days</span> and earn <span className="text-foreground font-black">additional 9 levels</span> of rewards for lifetime.</>}
                            />
                            <MechanicCard
                                icon={<DollarSign className="text-purple-400" />}
                                title="Salary Reward"
                                desc={<>Earn salaries from <span className="text-foreground font-black">USDT 15 to USDT 3,300</span> every <span className="text-foreground font-black">10 days</span> based on performance.</>}
                            />
                            <MechanicCard
                                icon={<Award className="text-orange-400" />}
                                title="Team Reward"
                                desc={<>One-time team reward bonus between <span className="text-foreground font-black">USDT 7 to USDT 2,500</span>.</>}
                            />
                            <MechanicCard
                                icon={<Crown className="text-indigo-400" />}
                                title="Global Royalty Reward"
                                desc={<>Earn a share of the global royalty pool by achieving VIP levels. <span className="text-foreground font-black">VIP 7</span> offers lifetime benefits.</>}
                            />
                        </div>
                    </section>

                    {/* Referral Link Card */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative bg-card/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Share2 size={120} className="text-primary rotate-12" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight">Your Network Link</h3>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Growth Accelerator</p>
                                </div>

                                {isConnected ? (
                                    <div className="space-y-4">
                                        <div className="bg-black/20 border border-white/5 rounded-2xl p-4 font-mono text-sm text-primary break-all flex items-center min-w-0">
                                            <span className="truncate">{referralLink}</span>
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="w-full h-14 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
                                        >
                                            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                            {copied ? "Link Copied!" : "Copy Your Link"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4 py-4">
                                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Shield size={32} />
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground text-center">Connect your wallet to generate your unique referral link.</p>
                                        <ConnectButton />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Tables */}
                <div className="lg:col-span-3 space-y-8 min-w-0 overflow-hidden">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="text-2xl font-black tracking-tight">Reward Tables</h2>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Detailed breakdown</span>
                    </div>

                    <div className="grid gap-8">
                        <RewardTable
                            title="Fastrack Levels"
                            headers={["Level", "Reward %", "Accumulated"]}
                            rows={[
                                ["Level 1", "5.0%", "5.0%"],
                                ["Level 2", "0.5%", "5.5%"],
                                ["Level 3", "0.5%", "6.0%"],
                                ["Level 4", "0.5%", "6.5%"],
                                ["Level 5", "0.5%", "7.0%"],
                                ["Level 6", "0.5%", "7.5%"],
                                ["Level 7", "0.5%", "8.0%"],
                                ["Level 8", "0.5%", "8.5%"],
                                ["Level 9", "0.5%", "9.0%"],
                            ]}
                        />

                        <RewardTable
                            title="Global Royalty Pool"
                            headers={["Tier", "Share %", "Cycle Duration"]}
                            rows={[
                                ["VIP 1", "30%", "40 Days Window"],
                                ["VIP 2", "10%", "40 Days Window"],
                                ["VIP 3", "10%", "40 Days Window"],
                                ["VIP 4", "10%", "40 Days Window"],
                                ["VIP 5", "10%", "40 Days Window"],
                                ["VIP 6", "10%", "40 Days Window"],
                                ["VIP 7", "20%", "Lifetime Benefit"],
                            ]}
                        />

                        <RewardTable
                            title="Performance Salary Scales"
                            headers={["Rank", "LP Pack", "Criteria", "Reward / 10d"]}
                            rows={[
                                ["VIP 1", "—", "Direct 7 Agents", "USDT 15"],
                                ["VIP 2", "—", "2 VIP1 + Team 25", "USDT 50"],
                                ["VIP 3", "—", "3 VIP1 + Team 124", "USDT 150"],
                                ["VIP 4", "810", "4 VIP1 + Team 502", "USDT 400"],
                                ["VIP 5", "1610", "5 VIP1 + Team 1501", "USDT 800"],
                                ["VIP 6", "3210", "6 VIP1 + Team 3400", "USDT 1600"],
                                ["VIP 7", "6410", "9 VIP1 + Team 5002", "USDT 3300"],
                            ]}
                            footer="Achievement unlock results in immediate allocation."
                        />
                    </div>
                </div>
            </div>

            {/* VIP Screen Integration */}
            <div className="pt-12 border-t border-white/5">
                <div className="flex flex-col items-center mb-10 text-center space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-primary/40">
                        <Star size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">Network Progression</h2>
                        <p className="text-muted-foreground font-medium max-w-lg">Track your journey through the ranks and unlock premium protocol benefits as your team grows.</p>
                    </div>
                </div>
                <VipScreen />
            </div>
        </div>
    );
}

function MechanicCard({ title, desc, icon }) {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:translate-x-1 hover:border-white/20">
                <div className="flex gap-5 items-start">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 transition-transform">
                        {icon}
                    </div>
                    <div className="space-y-1 min-w-0">
                        <h3 className="text-sm font-black text-foreground uppercase tracking-wider">{title}</h3>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                            {desc}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RewardTable({ title, headers, rows, footer }) {
    return (
        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] italic">{title}</h3>
                <div className="h-2 w-2 rounded-full bg-primary/40" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            {headers.map((h, i) => (
                                <th key={i} className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-muted-foreground/60">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {rows.map((row, i) => (
                            <tr key={i} className="group hover:bg-white/5 transition-colors">
                                {row.map((cell, j) => (
                                    <td key={j} className="px-8 py-4 text-foreground font-bold whitespace-nowrap group-hover:text-primary transition-colors">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {footer && (
                <div className="px-8 py-4 bg-primary/5 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-center text-primary/80 italic flex items-center justify-center gap-2">
                        <Zap size={12} /> {footer}
                    </p>
                </div>
            )}
        </div>
    );
}

