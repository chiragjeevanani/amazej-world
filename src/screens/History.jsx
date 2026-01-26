import React from "react";
import HistoryTabs from "@/components/History";

export default function HistoryScreen() {
    return (
        <div className="space-y-8">
            <div className="stat-card">
                <HistoryTabs />
            </div>
        </div>
    );
}
