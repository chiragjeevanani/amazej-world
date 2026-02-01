import * as React from "react";
import { formatEther } from "viem";
import { useProtocol } from "@/contexts/ProtocolContext";

function fmtToken18(x) { return (Number(x) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 }); }
function fmtUSDc(c) { return "USDT " + (Number(formatEther(c))).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtWad(w) { return (Number(w) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 }); }
function fmtDate(s) {
    return s && s > 0n ? new Date(Number(s) * 1000).toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }) : "—";
}

const TABS = [
    { key: "deposits", label: "Deposits" },
    { key: "claims", label: "LP Rewards" },
    { key: "refAccr", label: "Referral" },
    { key: "vip", label: "Salary Rewards" },
    { key: "withdraws", label: "Withdrawals" },
    { key: "sells", label: "Sells" },
    { key: "royalty", label: "Global Royalty" },
];

function Pager({ page, setPage, total, pageSize, className = "" }) {
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const prev = () => setPage(Math.max(0, page - 1));
    const next = () => setPage(Math.min(Math.max(0, pages - 1), page + 1));
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                className="h-8 px-4 rounded-lg bg-secondary/30 border border-white/5 hover:bg-secondary/50 disabled:opacity-20 transition-all font-black text-[10px] uppercase tracking-widest text-foreground"
                disabled={page <= 0}
                onClick={prev}
            >
                Prev
            </button>
            <div className="h-8 min-w-[32px] flex items-center justify-center font-black text-xs tabular-nums text-foreground/60 px-2">
                {pages === 0 ? "0/0" : `${page + 1}/${pages}`}
            </div>
            <button
                className="h-8 px-4 rounded-lg bg-secondary/30 border border-white/5 hover:bg-secondary/50 disabled:opacity-20 transition-all font-black text-[10px] uppercase tracking-widest text-foreground"
                disabled={page + 1 >= pages}
                onClick={next}
            >
                Next
            </button>
        </div>
    );
}

function HistorySection({ title, total, page, setPage, pageSize, children }) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 px-2">
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-foreground">{title}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#d946ef]">Total: {total}</span>
                </div>
                <Pager page={page} setPage={setPage} total={total} pageSize={pageSize} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children}
            </div>
        </div>
    );
}

function DataCard({ children }) {
    return (
        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:border-white/20 transition-all">
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

function DataLine({ label, value, highlight }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#d946ef] opacity-80">{label}</span>
            <span className={`text-sm font-black tabular-nums ${highlight ? 'text-foreground' : 'text-foreground/80'}`}>{value}</span>
        </div>
    );
}

export default function HistoryTabs({ onlyShow }) {
    const { data: { history }, actions: { refetch } } = useProtocol();
    const {
        enabled, loading, pageSize, depTotal, clmTotal, refTotal, salaryTotal, wdTotal, sellTotal, globalRoyaltyTotal,
        depPage, setDepPage, clmPage, setClmPage, refPage, setRefPage, salaryPage, setSalaryPage, wdPage, setWdPage,
        sellPage, setSellPage, globalRoyaltyPage, setGlobalRoyaltyPage, deposits, claims, refAccr, salaryClms, withdraws, sells, globalRoyalty,
    } = history;

    const [tab, setTab] = React.useState("deposits");

    if (!enabled) {
        return (
            <div className="p-8 rounded-2xl bg-card border border-border text-center">
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Connect wallet to view history</p>
            </div>
        );
    }

    const currentTab = onlyShow || tab;

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-2xl font-black text-foreground px-2">
                    {onlyShow ? TABS.find(a => a.key === onlyShow)?.label : 'Transaction Log'}
                </h3>
                <button
                    onClick={() => refetch()}
                    className="h-10 px-6 rounded-lg bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-all"
                    disabled={loading}
                >
                    {loading ? "Syncing..." : "Refresh"}
                </button>
            </div>

            {!onlyShow && (
                <div className="flex flex-wrap gap-3 px-2">
                    {TABS.map((t) => {
                        const count =
                            t.key === "deposits" ? depTotal :
                                t.key === "claims" ? clmTotal :
                                    t.key === "refAccr" ? refTotal :
                                        t.key === "vip" ? salaryTotal :
                                            t.key === "withdraws" ? wdTotal :
                                                t.key === "sells" ? sellTotal :
                                                    t.key === "royalty" ? globalRoyaltyTotal : 0;
                        const isActive = tab === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`h-11 px-6 rounded-xl text-sm font-black transition-all flex items-center gap-3 border ${isActive
                                    ? "bg-yellow-400 text-black border-yellow-500 shadow-lg shadow-yellow-400/20"
                                    : "bg-secondary/30 text-muted-foreground border-white/5 hover:bg-secondary/50 hover:border-white/10"
                                    }`}
                            >
                                <span>{t.label}</span>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${isActive ? 'bg-black/10' : 'bg-white/5'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            <div>
                {currentTab === "deposits" && (
                    <HistorySection title="Deposits" total={depTotal} page={depPage} setPage={setDepPage} pageSize={pageSize}>
                        {deposits.map((d, i) => (
                            <DataCard key={i}>
                                <DataLine label="Time" value={fmtDate(d.depositedAt)} />
                                <DataLine label="Amount" value={fmtUSDc(d.depositAmount)} highlight />
                                <DataLine label="Price" value={`${fmtWad(d.tokenPrice)} $/token`} />
                            </DataCard>
                        ))}
                    </HistorySection>
                )}

                {currentTab === "claims" && (
                    <HistorySection title="LP Rewards" total={clmTotal} page={clmPage} setPage={setClmPage} pageSize={pageSize}>
                        {claims.map((c, i) => (
                            <DataCard key={i}>
                                <DataLine label="Time" value={fmtDate(c.claimedAt)} />
                                <DataLine label="LP Amount" value={fmtUSDc(c.claimAmount)} highlight />
                                <DataLine label="AMA Tokens" value={fmtWad(c.netTokens + c.feeTokens)} />
                                <DataLine label="Periods" value={Number(c.periods)} />
                            </DataCard>
                        ))}
                    </HistorySection>
                )}

                {currentTab === "refAccr" && (
                    <HistorySection title="Referral Rewards" total={refTotal} page={refPage} setPage={setRefPage} pageSize={pageSize}>
                        {refAccr.map((r, i) => (
                            <DataCard key={i}>
                                <DataLine label="Time" value={fmtDate(r.claimedAt)} />
                                <DataLine label="Reward" value={fmtUSDc(r.claimAmount)} highlight />
                                <DataLine label="Tier" value={`LVL ${Number(r.level) + 1}`} />
                            </DataCard>
                        ))}
                    </HistorySection>
                )}

                {currentTab === "vip" && (
                    <HistorySection title="Salary Rewards" total={salaryTotal} page={salaryPage} setPage={setSalaryPage} pageSize={pageSize}>
                        {salaryClms.map((s, i) => (
                            <DataCard key={i}>
                                <DataLine label="Time" value={fmtDate(s.claimedAt)} />
                                <DataLine label="Amount" value={fmtUSDc(s.claimAmount)} highlight />
                                <DataLine label="Rank" value={`VIP ${Number(s.level)}`} />
                            </DataCard>
                        ))}
                    </HistorySection>
                )}

                {currentTab === "royalty" && (
                    <HistorySection title="Global Royalty" total={globalRoyaltyTotal} page={globalRoyaltyPage} setPage={setGlobalRoyaltyPage} pageSize={pageSize}>
                        {globalRoyalty.map((r, i) => (
                            <DataCard key={i}>
                                <DataLine label="Time" value={fmtDate(r.claimedAt)} />
                                <DataLine label="Amount" value={fmtUSDc(r.claimAmount)} highlight />
                                <DataLine label="Rank" value={`VIP ${Number(r.level)}`} />
                            </DataCard>
                        ))}
                    </HistorySection>
                )}

                {currentTab === "withdraws" && (
                    <HistorySection title="Withdrawals" total={wdTotal} page={wdPage} setPage={setWdPage} pageSize={pageSize}>
                        {withdraws.map((w, i) => (
                            <DataCard key={i}>
                                <DataLine label="Time" value={fmtDate(w.claimedAt)} />
                                <DataLine label="USDT" value={fmtUSDc(w.claimAmount)} highlight />
                                <DataLine label="Net AMA" value={fmtToken18(w.netTokens)} />
                                <DataLine label="Fee AMA" value={fmtToken18(w.feeTokens)} />
                            </DataCard>
                        ))}
                    </HistorySection>
                )}

                {currentTab === "sells" && (
                    <HistorySection title="Sell History" total={sellTotal} page={sellPage} setPage={setSellPage} pageSize={pageSize}>
                        {sells.map((w, i) => (
                            <DataCard key={i}>
                                <DataLine label="Time" value={fmtDate(w.soldAt)} />
                                <DataLine label="USDT" value={fmtUSDc(w.sellAmount)} highlight />
                                <DataLine label="Tokens Sold" value={fmtToken18(w.netTokens + w.feeTokens)} />
                            </DataCard>
                        ))}
                    </HistorySection>
                )}
            </div>
            {onlyShow === undefined && deposits.length === 0 && claims.length === 0 && refAccr.length === 0 && (
                <div className="py-20 text-center opacity-30 select-none">
                    <p className="text-sm font-black uppercase tracking-[0.5em]">No Activity Logged</p>
                </div>
            )}
        </section>
    );
}

