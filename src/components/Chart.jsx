import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";

function generateData(points = 30) {
    const data = [];
    let value = Math.random() * 100 + 50;
    const now = new Date();

    for (let i = 0; i < points; i++) {
        value += (Math.random() - 0.5) * 20;
        value = Math.max(10, Math.min(200, value));
        const date = new Date(now.getTime() - (points - i) * 60 * 60 * 1000);
        data.push({
            date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }),
            value: Math.round(value * 100) / 100,
        });
    }
    return data;
}

export default function Chart({ className = "h-20", color = "#FFFFFF" }) {
    const data = generateData();

    return (
        <div className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Tooltip
                        contentStyle={{ background: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
