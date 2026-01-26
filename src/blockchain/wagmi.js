import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc, bscTestnet } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'AMA',
    projectId: '86c1477cb3972aabb9c6b57f6e500584',
    chains: [
        {
            ...bsc,
            rpcUrls: {
                default: { http: ['https://bsc-dataseed4.binance.org/'] }
            }
        },
        bscTestnet,
    ],
    ssr: false,
});
