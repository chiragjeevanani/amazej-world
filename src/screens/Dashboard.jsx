import ProtocolHeader from "@/components/ProtocolCom";

function DashboardComponent() {
    return (
        <div className="space-y-6">
            <div className="md:px-6 p-2">
                <ProtocolHeader />
            </div>

            <div className="p-2 md:px-6 w-full">
                <div className="bg-card border border-border text-card-foreground shadow-2xl rounded-2xl overflow-hidden">
                    <div className="flex flex-col space-y-4 p-8 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
                        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                            Start Earning with AmazejProtocol!
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl font-medium">
                            Deposit USDT today and unlock up to <span className="text-foreground font-bold">150% rewards</span> in AMA.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="space-y-6">
                            <FeatureItem
                                icon="💰"
                                title="Reward System"
                                text={<>Earn up to <strong className="text-foreground">150% rewards</strong> in 12 steps.</>}
                                color="bg-blue-500/20 text-blue-500"
                            />
                            <FeatureItem
                                icon="👥"
                                title="Community Growth"
                                text={<>Get <strong className="text-foreground">referral bonuses</strong> for inviting friends.</>}
                                color="bg-green-500/20 text-green-500"
                            />
                            <FeatureItem
                                icon="🔒"
                                title="Security First"
                                text={<>Part of your deposits goes into a <strong className="text-foreground">insurance lock</strong> for safety.</>}
                                color="bg-yellow-500/20 text-yellow-500"
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center p-8 bg-secondary/20 rounded-2xl border border-secondary/50">
                            <button
                                type="button"
                                className="w-full md:w-auto min-w-[200px] h-12 px-8 rounded-lg bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest hover:bg-primary/90 active:scale-95 transition-all shadow-lg"
                            >
                                Connect Wallet
                            </button>
                            <p className="text-xs font-bold text-muted-foreground/60 mt-4 uppercase tracking-widest">
                                Fast, Secure, and Rewarding!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function FeatureItem({ icon, title, text, color }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-none transition-transform group-hover:scale-110 ${color}`}>
                {icon}
            </div>
            <div>
                <h3 className="text-foreground font-bold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
}

export default DashboardComponent;
