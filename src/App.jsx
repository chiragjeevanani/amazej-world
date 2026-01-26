import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import PlansComponent from '@/screens/Plans'
import HomeComponent from '@/screens/home'
import ReferEarnComponent from '@/screens/ReferEarn'
import SellComponent from '@/screens/Sell'
import LPClaimComponent from '@/screens/LPClaim'
import RoyaltyRewardsComponent from '@/screens/RoyaltyRewards'
import WithdrawEarningsComponent from '@/screens/WithdrawEarnings'
import HistoryScreen from '@/screens/History'
import ReferralsComponent from '@/screens/Referrals'
import VipScreen from '@/screens/VIP'

function App() {
    const [activeItem, setActiveItem] = useState("Home");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <Router>
            <div className="flex bg-background text-foreground min-h-screen overflow-hidden font-sans selection:bg-primary/20 transition-colors duration-300">
                <Sidebar
                    activeItem={activeItem}
                    onItemClick={setActiveItem}
                    isOpen={isSidebarOpen}
                    onClose={closeSidebar}
                />
                <div
                    className={`relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 h-screen`}
                >
                    <Header onToggleSidebar={toggleSidebar} />
                    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8">
                        <Routes>
                            <Route path="/" element={<PlansComponent />} />
                            <Route path="/dashboard" element={<HomeComponent />} />
                            <Route path="/refer-earn" element={<ReferEarnComponent />} />
                            <Route path="/sell" element={<SellComponent />} />
                            <Route path="/lp-claim" element={<LPClaimComponent />} />
                            <Route path="/royalty-rewards" element={<RoyaltyRewardsComponent />} />
                            <Route path="/withdraw-earnings" element={<WithdrawEarningsComponent />} />
                            <Route path="/history" element={<HistoryScreen />} />
                            <Route path="/referrals" element={<ReferralsComponent />} />
                            <Route path="/vip" element={<VipScreen />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    )
}

export default App
