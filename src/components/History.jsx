import * as React from "react";
import { formatEther } from "viem";
import { useProtocol } from "@/contexts/ProtocolContext";

const fmtToken18 = (x) => (Number(x) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 });
const fmtUSDc = (c) => (Number(formatEther(c))).toLocaleString(undefined, { style: "currency", currency: "USD" });
const fmtWad = (w) => (Number(w) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 });
const fmtDate = (s) => s && s > 0n ? new Date(Number(s) * 1000).toLocaleString() : "—";

function Pager({ page, setPage, total, pageSize, className = "" }) {
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const prev = () => setPage(Math.max(0, page - 1));
    const next = () => setPage(Math.min(Math.max(0, pages - 1), page + 1));
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 disabled:opacity-30 transition-all font-bold text-lg text-foreground"
                disabled={page <= 0}
                onClick={prev}
            >
                ‹
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground tabular-nums">
                {pages === 0 ? "0/0" : `${page + 1} / ${pages}`}
            </span>
            <button
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 disabled:opacity-30 transition-all font-bold text-lg text-foreground"
                disabled={page + 1 >= pages}
                onClick={next}
            >
                ›
            </button>
        </div>
    );
}

function Line({ label, value }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
            <span className="text-sm font-black text-foreground tabular-nums">{value}</span>
        </div>
    );
}

const TABS = [
    { key: "deposits", label: "Deposits" },
    { key: "claims", label: "Staking" },
    { key: "refAccr", label: "Referral" },
    { key: "vip", label: "VIP" },
    { key: "withdraws", label: "Withdrawals" },
    { key: "sells", label: "Sells" },
    { key: "royalty", label: "Royalty" },
];

export default function HistoryTabs({ onlyShow }) {
    const { data: { history }, actions: { refetch } } = useProtocol();
    const {
        enabled, loading, pageSize, depTotal, clmTotal, refTotal, vipTotal, wdTotal, sellTotal, royaltyTotal,
        depPage, setDepPage, clmPage, setClmPage, refPage, setRefPage, vipPage, setVipPage, wdPage, setWdPage,
        sellPage, setSellPage, royaltyPage, setRoyaltyPage, deposits, claims, refAccr, vipClms, withdraws, sells, royalty,
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
                <div className="flex flex-wrap gap-2 px-2">
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            )}

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
                {currentTab === "deposits" && (
                    <HistorySection title="Incoming Deposits" total={depTotal} page={depPage} setPage={setDepPage} pageSize={pageSize}>
                        <Table headers={["Time", "Amount (USD)", "Price"]}>
                            {deposits.map((d, i) => (
                                <tr key={i} className="hover:bg-muted/10 transition-colors border-b border-border last:border-0">
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtDate(d.depositedAt)}</td>
                                    <td className="px-6 py-4 text-sm font-black text-foreground">{fmtUSDc(d.depositAmount)}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground tabular-nums">{fmtWad(d.tokenPrice)}</td>
                                </tr>
                            ))}
                        </Table>
                        <MobileCards data={deposits} emptyMsg="No deposits yet">
                            {(d) => (
                                <>
                                    <Line label="Time" value={fmtDate(d.depositedAt)} />
                                    <Line label="Amount" value={fmtUSDc(d.depositAmount)} />
                                    <Line label="Price" value={fmtWad(d.tokenPrice)} />
                                </>
                            )}
                        </MobileCards>
                    </HistorySection>
                )}

                {currentTab === "claims" && (
                    <HistorySection title="LP Claims" total={clmTotal} page={clmPage} setPage={setClmPage} pageSize={pageSize}>
                        <Table headers={["Time", "LP (USD)", "Tokens (AMA)", "Periods"]}>
                            {claims.map((c, i) => (
                                <tr key={i} className="hover:bg-muted/10 transition-colors border-b border-border last:border-0">
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtDate(c.claimedAt)}</td>
                                    <td className="px-6 py-4 text-sm font-black text-foreground">{fmtUSDc(c.claimAmount)}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtWad(c.netTokens + c.feeTokens)}</td>
                                    <td className="px-6 py-4 text-xs font-black text-foreground">{Number(c.periods)}</td>
                                </tr>
                            ))}
                        </Table>
                        <MobileCards data={claims} emptyMsg="No claims yet">
                            {(c) => (
                                <>
                                    <Line label="Time" value={fmtDate(c.claimedAt)} />
                                    <Line label="Amount" value={fmtUSDc(c.claimAmount)} />
                                    <Line label="Tokens" value={fmtWad(c.netTokens + c.feeTokens)} />
                                    <Line label="Periods" value={Number(c.periods)} />
                                </>
                            )}
                        </MobileCards>
                    </HistorySection>
                )}

                {currentTab === "refAccr" && (
                    <HistorySection title="Referral Growth" total={refTotal} page={refPage} setPage={setRefPage} pageSize={pageSize}>
                        <Table headers={["Time", "Accrued (USD)", "Level"]}>
                            {refAccr.map((r, i) => (
                                <tr key={i} className="hover:bg-muted/10 transition-colors border-b border-border last:border-0">
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtDate(r.claimedAt)}</td>
                                    <td className="px-6 py-4 text-sm font-black text-foreground">{fmtUSDc(r.claimAmount)}</td>
                                    <td className="px-6 py-4 text-xs font-black text-foreground">LVL {Number(r.level) + 1}</td>
                                </tr>
                            ))}
                        </Table>
                        <MobileCards data={refAccr} emptyMsg="No referral data">
                            {(r) => (
                                <>
                                    <Line label="Time" value={fmtDate(r.claimedAt)} />
                                    <Line label="Reward" value={fmtUSDc(r.claimAmount)} />
                                    <Line label="Level" value={Number(r.level) + 1} />
                                </>
                            )}
                        </MobileCards>
                    </HistorySection>
                )}

                {currentTab === "withdraws" && (
                    <HistorySection title="Withdrawal History" total={wdTotal} page={wdPage} setPage={setWdPage} pageSize={pageSize}>
                        <Table headers={["Time", "USD", "Net AMA", "Fee AMA"]}>
                            {withdraws.map((w, i) => (
                                <tr key={i} className="hover:bg-muted/10 transition-colors border-b border-border last:border-0">
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtDate(w.claimedAt)}</td>
                                    <td className="px-6 py-4 text-sm font-black text-foreground">{fmtUSDc(w.claimAmount)}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtToken18(w.netTokens)}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtToken18(w.feeTokens)}</td>
                                </tr>
                            ))}
                        </Table>
                        <MobileCards data={withdraws} emptyMsg="No withdrawals">
                            {(w) => (
                                <>
                                    <Line label="Time" value={fmtDate(w.claimedAt)} />
                                    <Line label="USD" value={fmtUSDc(w.claimAmount)} />
                                    <Line label="Net" value={fmtToken18(w.netTokens)} />
                                    <Line label="Fee" value={fmtToken18(w.feeTokens)} />
                                </>
                            )}
                        </MobileCards>
                    </HistorySection>
                )}

                {currentTab === "sells" && (
                    <HistorySection title="Sale Records" total={sellTotal} page={sellPage} setPage={setSellPage} pageSize={pageSize}>
                        <Table headers={["Time", "USDT Extracted", "AMA Sold"]}>
                            {sells.map((w, i) => (
                                <tr key={i} className="hover:bg-muted/10 transition-colors border-b border-border last:border-0">
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtDate(w.soldAt)}</td>
                                    <td className="px-6 py-4 text-sm font-black text-foreground">{fmtUSDc(w.sellAmount)}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{fmtToken18(w.netTokens + w.feeTokens)}</td>
                                </tr>
                            ))}
                        </Table>
                        <MobileCards data={sells} emptyMsg="No sales executed">
                            {(w) => (
                                <>
                                    <Line label="Time" value={fmtDate(w.soldAt)} />
                                    <Line label="USDT" value={fmtUSDc(w.sellAmount)} />
                                    <Line label="Tokens" value={fmtToken18(w.netTokens + w.feeTokens)} />
                                </>
                            )}
                        </MobileCards>
                    </HistorySection>
                )}
            </div>
        </section>
    );
}

function Table({ headers, children }) {
    return (
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-secondary/30 border-b border-border">
                    <tr>
                        {headers.map((h) => (
                            <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {children}
                </tbody>
            </table>
        </div>
    );
}

function MobileCards({ data, emptyMsg, children }) {
    if (data.length === 0) {
        return <div className="md:hidden px-6 py-12 text-center text-muted-foreground text-xs font-bold uppercase tracking-widest">{emptyMsg}</div>;
    }
    return (
        <div className="md:hidden divide-y divide-border">
            {data.map((item, i) => (
                <div key={i} className="p-6">
                    {children(item)}
                </div>
            ))}
        </div>
    );
}

function HistorySection({ title, total, page, setPage, pageSize, children }) {
    return (
        <div className="flex flex-col">
            <div className="px-6 py-4 bg-secondary/10 flex items-center justify-between border-b border-border">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{title}</span>
                <Pager page={page} setPage={setPage} total={total} pageSize={pageSize} />
            </div>
            {children}
        </div>
    );
}
