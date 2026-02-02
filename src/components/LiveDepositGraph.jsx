import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function LiveDepositsGraph({
    title,
    totalDeposits,
    data,
}) {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const chartTitle = title || t('home.live_activity');

    return (
        <div className="stat-card h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black">{chartTitle}</h2>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">{t('home.transaction_velocity')}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('home.total_volume')}</p>
                    <p className="text-lg font-black">{totalDeposits}</p>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 10, fill: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", fontWeight: 700 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                            contentStyle={{
                                background: isDark ? '#000' : '#fff',
                                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                            itemStyle={{
                                color: isDark ? '#fff' : '#000',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                            labelStyle={{
                                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                marginBottom: '4px',
                                textTransform: 'uppercase'
                            }}
                        />
                        <Bar
                            dataKey="amount"
                            fill={isDark ? "#fff" : "#000"}
                            barSize={4}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
