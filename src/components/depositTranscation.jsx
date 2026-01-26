import React, { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import Pagination from "./Pagination";

const DepositTransactionsTable = ({
    transactions,
    itemsPerPageOptions = [10, 25, 50, 100],
    showItemsPerPageSelector = true,
    initialItemsPerPage = 10,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = useMemo(() => {
        if (!searchQuery) return transactions;
        return transactions.filter(
            (tx) =>
                tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.amount.toString().includes(searchQuery)
        );
    }, [transactions, searchQuery]);

    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredTransactions.slice(startIndex, endIndex);
    }, [filteredTransactions, currentPage, itemsPerPage]);

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    return (
        <div className="stat-card">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-black">Global Deposits</h2>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">Real-time inflows</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Total Value</p>
                    <p className="text-lg font-black">$708,762.50</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-secondary/30 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Type</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">User</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hash</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {currentTransactions.map((tx, i) => (
                            <tr key={i} className="hover:bg-muted/10 transition-colors">
                                <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{tx.type}</td>
                                <td className="px-6 py-4 text-sm font-black">${tx.amount.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="truncate text-xs font-mono max-w-[100px]">{tx.username}</span>
                                        <button onClick={() => navigator.clipboard.writeText(tx.username)} className="hover:text-foreground transition-colors">
                                            <Copy size={12} />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="truncate text-xs font-mono max-w-[100px]">{tx.hash}</span>
                                        <button onClick={() => navigator.clipboard.writeText(tx.hash)} className="hover:text-foreground transition-colors">
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

export default DepositTransactionsTable;
