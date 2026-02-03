import React from 'react';
import Chart from './Chart';

export default function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    showChart = true,
    chartColor = "#7c3aed",
    className = ""
}) {
    return (
        <div className={`relative group transition-all duration-500 hover:-translate-y-1 ${className}`}>
            {/* Colored Light Glow (Emitting) */}
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-indigo-500/10 to-primary/30 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-80 transition-opacity duration-700" />

            {/* Sharp Neon Border Accent */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/60 via-indigo-400/30 to-primary/60 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 h-full p-6 bg-card/90 border border-border rounded-2xl transition-all duration-500 group-hover:border-primary/50 shadow-xl backdrop-blur-sm">
                <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</h3>
                        <div className="text-2xl font-black text-foreground tracking-tight">{value}</div>
                        {subtitle && (
                            <p className="text-[10px] font-bold text-muted-foreground/60">{subtitle}</p>
                        )}
                    </div>
                    {Icon && (
                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
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
        </div>
    );
}
