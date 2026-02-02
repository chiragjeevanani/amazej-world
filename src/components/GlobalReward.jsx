import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Copy } from "lucide-react";
import Pagination from "./Pagination";

function GlobalReward({
    transactions,
    onSearch,
    onExportCSV,
    title,
    initialItemsPerPage = 5,
    showItemsPerPageSelector = true,
    itemsPerPageOptions = [5, 10, 25, 50],
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();

    const filteredTransactions = useMemo(() => {
        if (!searchQuery) return transactions;
        return transactions.filter(
            (tx) =>
                tx.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.amountUsdt.toString().includes(searchQuery) ||
                tx.amountAmz.toString().includes(searchQuery)
        );
    }, [transactions, searchQuery]);

    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    return (
        <div className="stat-card h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black">{title}</h2>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">{t('home.global_distribution_log')}</p>
                </div>
            </div>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                    <thead className="bg-secondary/30 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">USDT</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">AMA</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('home.rate')}</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('home.user')}</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('home.time')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {currentTransactions.map((tx, i) => (
                            <tr key={i} className="hover:bg-muted/10 transition-colors">
                                <td className="px-6 py-4 text-sm font-black">USDT {tx.amountUsdt}</td>
                                <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{tx.amountAmz}</td>
                                <td className="px-6 py-4 text-xs font-bold text-muted-foreground/60">USDT {tx.rate}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="truncate text-xs font-mono max-w-[100px]">{tx.username}</span>
                                        <button onClick={() => navigator.clipboard.writeText(tx.username)} className="hover:text-foreground transition-colors">
                                            <Copy size={12} />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-muted-foreground/60 whitespace-nowrap">{tx.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalItems > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={showItemsPerPageSelector ? handleItemsPerPageChange : undefined}
                    itemsPerPageOptions={itemsPerPageOptions}
                    showItemsPerPage={showItemsPerPageSelector}
                />
            )}
        </div>
    );
};

export default GlobalReward;
