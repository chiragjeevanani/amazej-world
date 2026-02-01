'use client';

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

import { config } from './wagmi';
import { getQueryVar } from "./query";
import { DEFAULT_REFERRER } from "./contracts";
import { ProtocolProvider } from "@/contexts/ProtocolContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";



// Create a wrapper component to access the theme context
function RainbowKitWrapper({ children }) {
    const { theme } = useTheme();
    return (
        <RainbowKitProvider theme={theme === 'dark' ? darkTheme() : lightTheme()}>
            {children}
        </RainbowKitProvider>
    );
}

export function Providers({ children }) {
    const [mounted, setMounted] = React.useState(false);
    const queryClient = React.useMemo(() => new QueryClient(), []);
    useEffect(() => {
        setMounted(true);
        if (typeof window === 'undefined') return;
        localStorage?.setItem('ref_id', getQueryVar('ref_id') || DEFAULT_REFERRER)
    }, [])

    if (!mounted) return null;

    return (
        <ThemeProvider>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <ProtocolProvider>
                        <RainbowKitWrapper>
                            {children}
                        </RainbowKitWrapper>
                    </ProtocolProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    );
}
