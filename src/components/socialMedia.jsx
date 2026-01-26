import React, { useState } from "react";
import { Copy, Instagram, Link as LinkIcon, Plus } from "lucide-react";
import { RiTelegramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

const useClipboard = () => {
    const [copied, setCopied] = useState(null);
    const copy = async (text, key) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(key ?? text);
            setTimeout(() => setCopied(null), 1500);
        } catch (e) {
            console.error("Clipboard error", e);
        }
    };
    return { copied, copy };
};

async function addTokenToWallet(opts) {
    const { address, symbol, decimals, image } = opts;
    const eth = globalThis.ethereum;
    if (!eth?.request) {
        alert("No wallet found. Please install MetaMask or a compatible wallet.");
        return;
    }
    try {
        const wasAdded = await eth.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: { address, symbol, decimals, image },
            },
        });
        if (!wasAdded) console.log("User rejected token add");
    } catch (err) {
        console.error("wallet_watchAsset error", err);
    }
}

const CONTRACTS = [
    {
        title: "AMA Token",
        address: "0x240c54c51E359aDc86458ec6aa69ceDEDfEdfCd5",
        scanUrl: "https://polygonscan.com/address/0x240c54c51E359aDc86458ec6aa69ceDEDfEdfCd5",
        canAddToWallet: true,
        token: { symbol: "AMA", decimals: 18, image: undefined },
    },
    {
        title: "USDT Token",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        scanUrl: "https://polygonscan.com/address/0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        canAddToWallet: true,
        token: { symbol: "USDT", decimals: 6, image: undefined },
    },
    {
        title: "Liquidity Pool",
        address: "0x6ab8A0299495e5d076B93705EB50B161bd1ac5dc",
        scanUrl: "https://polygonscan.com/address/0x6ab8A0299495e5d076B93705EB50B161bd1ac5dc",
        canAddToWallet: false,
    },
    {
        title: "Insurance Lock",
        address: "0xE9Ba4F738460cE7f31EC95a2407f0019B117F6c6",
        scanUrl: "https://polygonscan.com/address/0xE9Ba4F738460cE7f31EC95a2407f0019B117F6c6",
        canAddToWallet: false,
    },
    {
        title: "Reward Wallet",
        address: "0x4AB88e440945410655BA63813A97ab8093b547b8",
        scanUrl: "https://polygonscan.com/address/0x4AB88e440945410655BA63813A97ab8093b547b8",
        canAddToWallet: false,
    },
];

const SOCIALS = [
    {
        name: "Instagram",
        href: "https://instagram.com/amazejprotocol",
        label: "Instagram",
        icon: <Instagram size={18} />
    },
    {
        name: "X",
        href: "https://x.com/AMZPROTOCOL",
        label: "X (Twitter)",
        icon: <FaXTwitter size={18} />,
    },
    {
        name: "Telegram",
        href: "https://t.me/amazejprotocolofficial",
        label: "Telegram",
        icon: <RiTelegramFill size={18} />
    },
];

export default function SocialMediaAndContracts() {
    const { copied, copy } = useClipboard();

    return (
        <section className="py-6 border-t mt-3 border-border">
            <div className="rounded-lg">
                <header className="flex flex-col space-y-1.5 px-6 pb-2">
                    <h5 className="text-lg font-bold text-foreground">Social Media & Public Token Contracts</h5>
                </header>

                <div className="p-0 pt-4 md:pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {CONTRACTS.map((c) => (
                        <div key={c.address} className="p-6 bg-card hover:bg-muted/50 transition-colors rounded-xl border border-border flex flex-col gap-2">
                            <p className="text-sm font-semibold text-card-foreground">{c.title}</p>
                            <p className="text-xs break-all my-2 text-muted-foreground font-mono bg-muted p-2 rounded">{c.address}</p>

                            <div className="flex gap-2 flex-col lg:flex-row items-start lg:items-center">
                                {c.canAddToWallet && (
                                    <button
                                        onClick={() =>
                                            addTokenToWallet({
                                                address: c.address,
                                                symbol: c.token.symbol,
                                                decimals: c.token.decimals,
                                                image: c.token.image,
                                            })
                                        }
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium border border-input hover:border-accent-foreground
                    bg-transparent text-foreground w-full lg:w-min hover:bg-accent h-8 rounded-lg px-3 text-xs transition-all"
                                    >
                                        <Plus className="size-4" />
                                        Add to Wallet
                                    </button>
                                )}

                                <div className="flex gap-2 w-full lg:w-auto">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={c.scanUrl}
                                        className="flex-1 lg:flex-none"
                                        aria-label={`Open ${c.title} on PolygonScan`}
                                    >
                                        <button className="inline-flex w-full lg:w-auto items-center justify-center gap-2 whitespace-nowrap font-medium border border-input hover:border-accent-foreground
                    hover:bg-accent h-8 rounded-lg px-3 text-xs transition-all text-foreground">
                                            <LinkIcon className="size-4" />
                                            <span className="lg:hidden">View Scan</span>
                                        </button>
                                    </a>

                                    <button
                                        onClick={() => copy(c.address, c.address)}
                                        className="inline-flex flex-1 lg:flex-none items-center justify-center gap-2 whitespace-nowrap font-medium border border-input hover:border-accent-foreground hover:bg-accent h-8 rounded-lg px-3 text-xs transition-all text-foreground"
                                        aria-label="Copy to clipboard"
                                    >
                                        <Copy className="size-4" />
                                        <span className="lg:hidden">Copy Address</span>
                                        <span className="sr-only">Copy</span>
                                    </button>
                                </div>
                            </div>

                            {copied === c.address && (
                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">Copied to clipboard</span>
                            )}
                        </div>
                    ))}

                    <div className="p-6 bg-primary rounded-xl border border-primary flex flex-col gap-4">
                        <p className="text-sm font-black text-primary-foreground">Connect & Engage</p>
                        <div className="flex gap-2">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={s.href}
                                    aria-label={s.label}
                                    className="flex-1"
                                >
                                    <button className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap font-bold hover:scale-105 active:scale-95 transition-all
                  bg-background text-foreground shadow-lg h-10 rounded-lg px-3 text-xs">
                                        {s.icon}
                                        <span>{s.name}</span>
                                    </button>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
