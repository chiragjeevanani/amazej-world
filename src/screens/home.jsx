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
import { DollarSign, Droplets, RotateCcw, TrendingUp } from "lucide-react";

const HomeComponet = () => {
    return (
        <div className="space-y-6">
            <div className="md:px-6 p-2">
                <ProtocolHeader />
            </div>

            <div className="p-2 md:px-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard
                        title="Token Price"
                        value="$7.44"
                        subtitle="per AMA token"
                        icon={DollarSign}
                        chartColor="#8884d8"
                    />

                    <StatCard
                        title="Market Cap"
                        value="$15,423.47"
                        subtitle="Total valuation in dollar"
                        icon={TrendingUp}
                        chartColor="#4ade80"
                    />

                    <StatCard
                        title="Total Liquidity"
                        value="$175,979.21"
                        subtitle="Total funds available in liquidity pools"
                        icon={Droplets}
                        chartColor="#60a5fa"
                    />

                    <StatCard
                        title="Circulating Supply"
                        value="2,074,223.19"
                        subtitle="Tokens in circulation"
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
                                        {card.name}
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
                    <GlobalReward title="Global Rewards" transactions={rewardData} />
                    <GlobalReward title="Global Referral Rewards" transactions={rewardData} />
                </div>
            </div>

            <div className="md:px-6 p-2">
                <SocialMediaAndContracts />
            </div>
        </div>
    );
};

export default HomeComponet;
