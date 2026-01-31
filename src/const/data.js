import {
    Home,
    Gift,
    ShoppingBag,
    DollarSign,
    Droplets,
    RotateCcw,
    TrendingUp,
    History,
    Users,
    Crown,
} from "lucide-react";

export const transactions = [
    {
        type: "TOPUP",
        amount: 25.0,
        username: "0x12..cdef",
        hash: "0x12..cdef",
        timestamp: "2025-08-14 14:35",
    },
    {
        type: "TOPUP",
        amount: 25.0,
        username: "0xabcdef..321",
        hash: "0xabcdef..321",
        timestamp: "2025-08-14 13:20",
    },
];

export const sampleData = [
    { time: "10:00", amount: 120 },
    { time: "10:05", amount: 132 },
    { time: "10:10", amount: 101 },
    { time: "10:15", amount: 134 },
    { time: "10:20", amount: 90 },
    { time: "10:25", amount: 230 },
    { time: "10:30", amount: 210 },
];

export const depositData = [
    { id: 1, name: "Total Deposit", price: "USDT 2,450.00", value: "+2.5%", icon: DollarSign },
    { id: 2, name: "Active Users", price: "1,234", value: "+12%", icon: TrendingUp },
    { id: 3, name: "New Signups", price: "45", value: "+5%", icon: Gift },
    { id: 4, name: "AMA Price", price: "USDT 7.44", value: "+1.2%", icon: Droplets },
];

export const rewardData = [
    {
        amountUsdt: 150.00,
        amountAmz: 21.5,
        deductionAmz: 2.1,
        rate: 7.44,
        username: "0x7a..9f21",
        hash: "0x99..11aa",
        timestamp: "10 mins ago"
    },
    {
        amountUsdt: 45.00,
        amountAmz: 6.2,
        deductionAmz: 0.6,
        rate: 7.42,
        username: "0xbb..22cc",
        hash: "0xdd..44ee",
        timestamp: "15 mins ago"
    },
];

export const menuItems = [
    { id: "Home", label: "Home", icon: Home, herf: "/" },
    {
        id: "Refer & Earn",
        label: "Refer & Earn",
        icon: Gift,
        herf: "/refer-earn",
    },
    { id: "Sell", label: "Sell", icon: ShoppingBag, herf: "/sell" },
    { id: "LP Claim", label: "LP Claim", icon: Droplets, herf: "/lp-claim" },
    {
        id: "Royalty Rewards",
        label: "Royalty Rewards",
        icon: TrendingUp,
        herf: "/royalty-rewards",
    },
    {
        id: "Withdraw Earnings",
        label: "Withdraw Earnings",
        icon: DollarSign,
        herf: "/withdraw-earnings",
    },
    {
        id: "History",
        label: "History",
        icon: History,
        herf: "/history",
    },
    {
        id: "Referrals",
        label: "Referrals",
        icon: Users,
        herf: "/referrals",
    },
    {
        id: "VIP",
        label: "VIP",
        icon: Crown,
        herf: "/vip",
    },
];

export const bottomItems = [];
