import React from 'react';
import Chart from './Chart';

export default function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    showChart = true,
    chartColor = "#FFFFFF",
    className = ""
}) {
    return (
        <div className={`p-6 rounded-2xl bg-card border border-border hover:border-muted-foreground/30 transition-all group ${className}`}>
            <div className="flex items-start justify-between mb-2">
                <div className="space-y-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</h3>
                    <div className="text-2xl font-black text-card-foreground">{value}</div>
                    {subtitle && (
                        <p className="text-[10px] font-bold text-muted-foreground/60">{subtitle}</p>
                    )}
                </div>
                {Icon && (
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary transition-all">
                        <Icon size={20} />
                    </div>
                )}
            </div>

            {showChart && (
                <div className="mt-4 h-12 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Chart className="h-full" color={chartColor} />
                </div>
            )}
        </div>
    );
}
