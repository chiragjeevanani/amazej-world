import React, { useEffect, useState } from "react";
import { menuItems } from "@/const/data";
import { Globe, Search, X, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ne', name: 'नेपाली' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'ar', name: 'العربية' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'th', name: 'ไทย' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'ms', name: 'Bahasa Melayu' },
    { code: 'fil', name: 'Filipino' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'ur', name: 'اردو' },
    { code: 'fa', name: 'فارسی' },
];

function Sidebar({
    activeItem = "Home",
    onItemClick,
    isOpen,
    onClose,
}) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [isMobile, setIsMobile] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentLang, setCurrentLang] = useState(languages.find(l => l.code === i18n.language) || languages[0]);

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        const isActive = item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    navigate(item.href);
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
                                    {t(item.label)}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                <div className="space-y-4">
                    <button
                        onClick={() => setShowLanguages(true)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <Globe size={16} className="text-[var(--sidebar-fg)]/60 group-hover:text-[var(--sidebar-fg)]" />
                            <span className="text-xs font-bold text-[var(--sidebar-fg)]/80 group-hover:text-[var(--sidebar-fg)]">
                                {currentLang.name}
                            </span>
                        </div>
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-[var(--sidebar-fg)]/40 group-hover:text-[var(--sidebar-fg)]">
                            {currentLang.code.toUpperCase()}
                        </span>
                    </button>

                    <p className="text-[10px] text-[var(--sidebar-fg)]/20 text-center font-bold uppercase tracking-widest">
                        Protocol v1.0
                    </p>
                </div>
            </div>

            {/* Language Selection Modal */}
            {
                showLanguages && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <div className="w-full max-w-sm bg-[#1a1b1e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                            <div className="p-4 border-b border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black tracking-tight text-white">{t('dashboard.select_language')}</h3>
                                    <button onClick={() => setShowLanguages(false)} className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="text"
                                        placeholder={t('dashboard.search_language')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 pl-9 pr-4 bg-black/20 border border-white/10 rounded-xl text-sm font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                                {filteredLanguages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setCurrentLang(lang);
                                            i18n.changeLanguage(lang.code);
                                            setShowLanguages(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${currentLang.code === lang.code
                                            ? "bg-violet-500/10 text-violet-400"
                                            : "text-white/60 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        <span className="text-sm font-bold">{lang.name}</span>
                                        {currentLang.code === lang.code && (
                                            <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-[10px]">
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Sidebar;
