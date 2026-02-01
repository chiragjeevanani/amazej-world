import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";

function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    itemsPerPageOptions = [5, 10, 25, 50],
    showItemsPerPage = true,
}) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage <= 4) {
                for (let i = 2; i <= 4; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col py-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                {showItemsPerPage && onItemsPerPageChange && (
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Visible Rows</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="bg-secondary/30 border border-border rounded-lg px-2 py-1 text-xs font-black text-foreground focus:outline-none"
                        >
                            {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option} className="bg-popover text-popover-foreground">{option}</option>
                            ))}
                        </select>
                    </div>
                )}

                <nav className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="h-8 px-3 rounded-lg bg-secondary/30 border border-border text-muted-foreground disabled:opacity-30 hover:bg-secondary/50 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                        Prev
                    </button>

                    <div className="flex items-center gap-1">
                        {pageNumbers.map((page, index) => (
                            <React.Fragment key={index}>
                                {page === "..." ? (
                                    <span className="px-2 text-muted-foreground/40"><MoreHorizontal size={14} /></span>
                                ) : (
                                    <button
                                        onClick={() => onPageChange(page)}
                                        disabled={page === currentPage}
                                        className={`h-8 w-8 rounded-lg text-[10px] font-black transition-all ${page === currentPage ? "bg-primary text-primary-foreground" : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="h-8 px-3 rounded-lg bg-secondary/30 border border-border text-muted-foreground disabled:opacity-30 hover:bg-secondary/50 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                        Next
                    </button>
                </nav>
            </div>

            <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest italic">
                * Displaying index {startItem} to {endItem} of {totalItems} verified entries
            </p>
        </div>
    );
};

export default Pagination;
