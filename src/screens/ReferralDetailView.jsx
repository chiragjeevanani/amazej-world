import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProtocol } from '@/contexts/ProtocolContext';
import { useTranslation } from 'react-i18next';
import {
    ArrowLeft,
    Copy,
    Check,
    Search,
    Users,
    ExternalLink,
    Filter,
    Clock,
    UserCheck,
    UserMinus
} from 'lucide-react';
import { toast } from 'react-hot-toast';

function fmtAddress(addr) {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function ReferralDetailView() {
    const { filter } = useParams(); // 'active' or 'inactive'
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, actions } = useProtocol();
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedAddress, setCopiedAddress] = useState(null);

    const referrals = useMemo(() => {
        if (!data.directsList) return [];

        const isTargetActive = filter === 'active';
        return data.directsList.filter(item => {
            const matchesStatus = item.hasPlan === isTargetActive;
            const matchesSearch = item.address.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [data.directsList, filter, searchQuery]);

    const isListTrulyEmpty = !data.referralsLoading && referrals.length === 0;

    const copyToClipboard = (addr) => {
        navigator.clipboard.writeText(addr);
        setCopiedAddress(addr);
        toast.success(t('common.copied_to_clipboard') || 'Address copied!');
        setTimeout(() => setCopiedAddress(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <button
                    onClick={() => navigate('/referrals')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t('common.back') || 'Back'}</span>
                </button>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                            <Users size={14} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                {filter === 'active' ? t('referrals.active') : t('referrals.inactive')} {t('referrals.direct_referrals')}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
                            {filter === 'active' ? 'Active' : 'Inactive'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">Network</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Search and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3 relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by wallet address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                </div>
                <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Results</span>
                    <span className="text-xl font-black text-foreground">{referrals.length}</span>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-3">
                {data.referralsLoading ? (
                    <div className="py-24 flex flex-col items-center justify-center space-y-4 bg-card/20 backdrop-blur-xl border border-dashed border-white/10 rounded-[2.5rem]">
                        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                        <div className="space-y-1 text-center">
                            <h3 className="text-xl font-black text-foreground">Syncing Data</h3>
                            <p className="text-sm font-medium text-muted-foreground">Reading referral logs from BSC blockchain...</p>
                        </div>
                    </div>
                ) : referrals.length > 0 ? (
                    referrals.map((item, idx) => (
                        <div
                            key={item.address}
                            className="group relative bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${item.hasPlan ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                                        {item.hasPlan ? <UserCheck size={24} /> : <UserMinus size={24} />}
                                    </div>
                                    <div className="space-y-0.5 min-w-0 overflow-hidden">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm md:text-base font-black tracking-tight font-mono truncate">
                                                {item.address}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(item.address)}
                                                className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                                            >
                                                {copiedAddress === item.address ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${item.hasPlan ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {item.hasPlan ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="text-muted-foreground/30">•</span>
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                                Staked: ${(Number(item.baseUSDCents || 0n) / 100).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:shrink-0">
                                    <a
                                        href={`https://bscscan.com/address/${item.address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                                    >
                                        BSCScan <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-card/20 backdrop-blur-xl border border-dashed border-white/10 rounded-[2.5rem]">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground/40">
                                <Users size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-foreground">Individual Addresses Unavailable</h3>
                                <p className="text-sm font-medium text-muted-foreground max-w-xs mx-auto">
                                    {searchQuery
                                        ? "No addresses match your search query."
                                        : "Individual wallet addresses can't be listed due to mobile RPC limitations, but your referral counts on the dashboard are accurate."}
                                </p>
                            </div>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>

                        {/* Fallback Info */}
                        {!searchQuery && (
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <ExternalLink size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black uppercase tracking-wider">Blockchain Fallback</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            If the list is empty but your dashboard shows counts, check your internal transactions directly on BSCScan.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <a
                                        href={`https://bscscan.com/address/${data.main}#internaltx`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20"
                                    >
                                        View on BSCScan Explorer <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        <span>Referrer:</span>
                                        <span className="font-mono text-foreground">{fmtAddress(data.user?.address)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        <span>Contract:</span>
                                        <span className="font-mono text-foreground">{fmtAddress(data.main)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
