import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Menu, Zap, Crown } from "lucide-react";
import { useProtocol } from "@/contexts/ProtocolContext";

function Header({ onToggleSidebar }) {
    const { theme, toggleTheme } = useTheme();
    const { data } = useProtocol();
    const currentVip = Number(data.vip?.currentLevel ?? 0);

    return (
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300 w-full">
            <div className="px-3 md:px-6 h-16 flex items-center justify-between gap-2">

                {/* Left Side: Toggle & Branding */}
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 -ml-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors lg:hidden shrink-0"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Compact Branding for Mobile */}
                    <div className="flex items-center gap-1.5 lg:hidden shrink-0">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                            <Zap size={16} fill="currentColor" />
                        </div>
                        <span className="font-black text-sm sm:text-lg tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                            AMAZEJ WORLD
                        </span>
                    </div>
                </div>

                {/* Right Side: Theme & Connect */}
                <div className="flex-1 flex justify-end items-center gap-2 md:gap-3 min-w-0">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:text-primary transition-all border border-border shrink-0"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            const ready = mounted && authenticationStatus !== 'loading';
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');

                            return (
                                <div
                                    {...(!ready && {
                                        'aria-hidden': true,
                                        'style': {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        },
                                    })}
                                    className="shrink-0"
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <button
                                                    onClick={openConnectModal}
                                                    type="button"
                                                    className="bg-primary text-primary-foreground font-black text-xs md:text-sm px-3 md:px-4 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                                                >
                                                    <span className="sm:hidden">Connect</span>
                                                    <span className="hidden sm:inline">Connect Wallet</span>
                                                </button>
                                            );
                                        }

                                        if (chain.unsupported) {
                                            return (
                                                <button
                                                    onClick={openChainModal}
                                                    type="button"
                                                    className="bg-red-500 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl hover:bg-red-600 transition-all shadow-lg whitespace-nowrap"
                                                >
                                                    Wrong Net
                                                </button>
                                            );
                                        }

                                        return (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={openChainModal}
                                                    type="button"
                                                    className="hidden md:flex items-center gap-2 bg-secondary/50 hover:bg-secondary border border-border rounded-xl px-3 py-2 transition-all font-bold text-sm"
                                                >
                                                    {chain.hasIcon && (
                                                        <div
                                                            className="w-5 h-5 rounded-full overflow-hidden"
                                                            style={{ background: chain.iconBackground }}
                                                        >
                                                            {chain.iconUrl && (
                                                                <img
                                                                    alt={chain.name ?? 'Chain icon'}
                                                                    src={chain.iconUrl}
                                                                    className="w-5 h-5"
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                    {chain.name}
                                                </button>

                                                {currentVip > 0 && (
                                                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary animate-in fade-in zoom-in duration-500">
                                                        <Crown size={14} className="fill-current" />
                                                        <span className="text-xs font-black uppercase tracking-wider">VIP {currentVip}</span>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={openAccountModal}
                                                    type="button"
                                                    className="bg-secondary/50 hover:bg-secondary border border-border rounded-xl px-3 py-2 transition-all font-black text-sm flex items-center gap-2"
                                                >
                                                    {account.displayName}
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                </div>
            </div>
        </header>
    );
};

export default Header;
