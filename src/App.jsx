import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

const PlansComponent = lazy(() => import('@/screens/Plans'))
const HomeComponent = lazy(() => import('@/screens/home'))
const ReferEarnComponent = lazy(() => import('@/screens/ReferEarn'))
const SellComponent = lazy(() => import('@/screens/Sell'))
const LPClaimComponent = lazy(() => import('@/screens/LPClaim'))
const RoyaltyRewardsComponent = lazy(() => import('@/screens/RoyaltyRewards'))
const WithdrawEarningsComponent = lazy(() => import('@/screens/WithdrawEarnings'))
const HistoryScreen = lazy(() => import('@/screens/History'))
const ReferralsComponent = lazy(() => import('@/screens/Referrals'))
const VipScreen = lazy(() => import('@/screens/VIP'))

function LoadingScreen() {
    return (
        <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );
}

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
                        <Suspense fallback={<LoadingScreen />}>
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
                        </Suspense>
                    </main>
                </div>
            </div>
        </Router>
    )
}

export default App
