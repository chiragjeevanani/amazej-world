'use client';

import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

import { config } from './wagmi';
import { ProtocolProvider } from "@/contexts/ProtocolContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

function RainbowKitWrapper({ children }) {
    const { theme } = useTheme();
    return (
        <RainbowKitProvider theme={theme === 'dark' ? darkTheme() : lightTheme()}>
            {children}
        </RainbowKitProvider>
    );
}

export function AppProviders({ children }) {
    const queryClient = useMemo(() => new QueryClient(), []);

    // NOTE: ProtocolProvider is purposely nested inside the Wagmi/Query providers
    // because it depends on their context hooks (useAccount, etc).

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
