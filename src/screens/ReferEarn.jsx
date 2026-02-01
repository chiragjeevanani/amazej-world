import { Currency, Gift, Handshake, UsersRound } from "lucide-react";
import React, { useMemo } from "react";
import { useProtocol } from "@/contexts/ProtocolContext";
import { roundWithFormat, shortAddress } from "@/blockchain/roundsNumber";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import VipScreen from "@/screens/VIP";
import WithdrawStatsCard from "@/components/WithdrawStatsCard";

function ReferEarnComponent() {
    const { data } = useProtocol();
    const { isConnected, address } = useAccount();

    const referralLink = useMemo(() => {
        if (typeof window === 'undefined') return;
        const demo = window?.location?.pathname?.includes("/amazejworld");
        const test = window?.location?.pathname?.includes("/test");
        return `${window.location.origin}${test ? '/test' : demo ? '/amazejworld' : ''}/plans?ref_id=${address}`
    }, [address])

    const referralLinkDisplay = useMemo(() => {
        if (typeof window === 'undefined') return;
        const demo = window?.location?.pathname?.includes("/amazejworld");
        const test = window?.location?.pathname?.includes("/test");
        return `${window.location.origin}${test ? '/test' : demo ? '/amazejworld' : ''}?ref_id=${shortAddress(address || '')}`
    }, [address])

    return (
        <div className="space-y-8 p-2 md:p-6">
            <div className="w-full space-y-8">
                <div className="space-y-6">
                    <div className="bg-card border border-border text-card-foreground shadow-2xl rounded-2xl overflow-hidden p-6 md:p-8">
                        <div className="flex flex-col space-y-1.5 mb-6">
                            <h2 className="text-2xl font-black text-foreground">Referral Mechanics</h2>
                            <p className="text-muted-foreground text-sm">Grow your network and earnings</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid gap-4">
                                <MechanicCard title="LP Reward" desc={<>Earn <strong>14%</strong> rewards on a <strong>10-day cycle</strong>.</>} />
                                <MechanicCard title="Referral Reward" desc={<>Flat <strong>5%</strong> referral reward on direct referrals.</>} />
                                <MechanicCard title="Fastrack Reward" desc={<>Unlock by completing <strong>7 direct first deposits within 30 days</strong> and earn <strong>additional 9 level rewards for lifetime</strong>.</>} />
                                <MechanicCard title="Salary Reward" desc={<>Earn salaries ranging from <strong>USDT 15 to USDT 3,300</strong> every <strong>10 days</strong> based on performance.</>} />
                                <MechanicCard title="Team Reward" desc={<>One-time team reward between <strong>USDT 7 to USDT 2,500</strong>.</>} />
                                <MechanicCard title="Global Royalty Reward" desc={<>Earn a share of the global royalty pool by achieving VIP levels. Rewards are distributed over fixed periods, with <strong>VIP 7 offering lifetime benefits</strong>.</>} />

                                <div className="pt-4">
                                    {isConnected ? (
                                        <div
                                            onClick={() => navigator.clipboard.writeText(referralLink || '')}
                                            className="bg-secondary/30 border border-border hover:bg-secondary/50 rounded-xl flex justify-between items-center px-4 py-4 cursor-pointer transition-all group"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Your Referral Link</span>
                                                <p className="text-foreground font-mono text-sm truncate pr-2">
                                                    {referralLinkDisplay}
                                                </p>
                                            </div>
                                            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                                            <ConnectButton />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <RewardTable
                                    title="Fastrack Reward"
                                    headers={["S.No", "Level", "Referral Reward"]}
                                    rows={[
                                        ["1", "Level 1", "5%"],
                                        ["2", "Level 2", "0.5%"],
                                        ["3", "Level 3", "0.5%"],
                                        ["4", "Level 4", "0.5%"],
                                        ["5", "Level 5", "0.5%"],
                                        ["6", "Level 6", "0.5%"],
                                        ["7", "Level 7", "0.5%"],
                                        ["8", "Level 8", "0.5%"],
                                        ["9", "Level 9", "0.5%"],
                                    ]}
                                />

                                <RewardTable
                                    title="Global Royalty Reward"
                                    headers={["VIP Level", "Reward", "Duration"]}
                                    rows={[
                                        ["VIP 1", "30%", "40 Days"],
                                        ["VIP 2", "10%", "40 Days"],
                                        ["VIP 3", "10%", "40 Days"],
                                        ["VIP 4", "10%", "40 Days"],
                                        ["VIP 5", "10%", "40 Days"],
                                        ["VIP 6", "10%", "40 Days"],
                                        ["VIP 7", "20%", "Lifetime"],
                                    ]}
                                />

                                <RewardTable
                                    title="Salary Reward"
                                    headers={["Rank", "LP Package", "Qualification", "Reward"]}
                                    rows={[
                                        ["VIP 1", "—", "Direct 7 People", "USDT 15 / 10 Days"],
                                        ["VIP 2", "—", "2 Direct VIP1 / Team 25", "USDT 50 / 10 Days"],
                                        ["VIP 3", "—", "3 Direct VIP1 / Team 124", "USDT 150 / 10 Days"],
                                        ["VIP 4", "USDT 810", "4 Direct VIP1 / Team 502", "USDT 400 / 10 Days"],
                                        ["VIP 5", "USDT 1610", "5 Direct VIP1 / Team 1501", "USDT 800 / 10 Days"],
                                        ["VIP 6", "USDT 3210", "6 Direct VIP1 / Team 3400", "USDT 1600 / 10 Days"],
                                        ["VIP 7", "USDT 6410", "9 Direct VIP1 / Team 5002", "USDT 3300 / 10 Days"],
                                    ]}
                                    footer="Complete The Target & Get Unlimited Profit."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <VipScreen />
                </div>
            </div>
        </div>
    );
};

function MechanicCard({ title, desc }) {
    return (
        <div className="bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-xl border border-border p-4">
            <h3 className="text-foreground font-bold mb-2 text-sm">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal break-words">
                {desc}
            </p>
        </div>
    );
}

function RewardTable({ title, headers, rows, footer }) {
    return (
        <div className="bg-secondary/20 rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/10">
                <h3 className="text-foreground font-bold text-sm">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50">
                        <tr>
                            {headers.map((h, i) => (
                                <th key={i} className="px-6 py-3 font-black text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {rows.map((row, i) => (
                            <tr key={i} className="hover:bg-muted/10 transition-colors">
                                {row.map((cell, j) => (
                                    <td key={j} className="px-6 py-3 text-foreground font-medium whitespace-nowrap">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {footer && (
                <div className="px-6 py-3 bg-primary/10 border-t border-border">
                    <p className="text-[10px] font-black uppercase tracking-widest text-center text-primary italic">
                        {footer}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ReferEarnComponent;
