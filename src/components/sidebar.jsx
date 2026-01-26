import React, { useEffect, useState } from "react";
import { menuItems } from "@/const/data";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({
    activeItem = "Home",
    onItemClick,
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = document.getElementById("sidebar");
            if (sidebar && !sidebar.contains(event.target) && isMobile && isOpen) {
                onClose();
            }
        };
        if (isOpen && isMobile) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, isMobile]);

    return (
        <>
            {isOpen && isMobile && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />
            )}
            <div
                id="sidebar"
                className={`
                    w-64 p-4 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] flex flex-col z-50
                    transition-transform duration-300 ease-in-out shadow-2xl
                    ${isMobile
                        ? `fixed h-full top-0 left-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
                        : `relative min-h-screen ${isOpen ? "translate-x-0" : "-translate-x-full"}`
                    }
                `}
            >
                <div className="mb-8 px-2 flex items-center justify-center">
                    <div className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 drop-shadow-sm">
                        AMAZEJ WORLD
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.herf === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.herf);

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    navigate(item.herf);
                                    if (isMobile) setTimeout(() => onClose(), 150);
                                }}
                                className={`
                                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                                    transition-all duration-300 group relative overflow-hidden
                                    ${isActive
                                        ? "bg-[var(--sidebar-active-bg)] text-white font-bold shadow-lg shadow-violet-500/20"
                                        : "text-[var(--sidebar-fg)]/60 hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-fg)]"
                                    }
                                `}
                            >
                                <Icon
                                    size={20}
                                    className={`${isActive ? "text-white" : "text-[var(--sidebar-fg)]/40 group-hover:text-[var(--sidebar-fg)] transition-colors"}`}
                                />
                                <span className="flex-1 text-sm text-left uppercase tracking-widest text-[11px] font-bold z-10 relative">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-auto px-4 py-6 border-t border-[var(--sidebar-border)]">
                    <p className="text-[10px] text-[var(--sidebar-fg)]/20 text-center font-bold uppercase tracking-widest">
                        Protocol v1.0
                    </p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
