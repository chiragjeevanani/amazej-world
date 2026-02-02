import React from "react";
import { useTranslation } from "react-i18next";
import { Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { RiTelegramFill } from "react-icons/ri";
import GridBackground from "./GridBackground";

function ProtocolHeader() {
    const { t } = useTranslation();
    return (
        <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-card rounded-3xl border border-border shadow-2xl overflow-hidden min-h-[320px] mb-8">
            <div className="relative z-10 space-y-6 max-w-2xl text-card-foreground">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">{t('dashboard.protocol_title')}</h1>
                    <p className="text-lg md:text-xl font-bold opacity-60 italic">
                        {t('dashboard.protocol_slogan')}
                    </p>
                </div>

                <div className="flex flex-col gap-3 font-bold text-sm">
                    <a href="#" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        {t('dashboard.protocol_intro')}
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        {t('dashboard.protocol_tools')}
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <SocialIcon icon={<Instagram size={20} />} href="#" />
                    <SocialIcon icon={<FaXTwitter size={20} />} href="#" />
                    <SocialIcon icon={<RiTelegramFill size={20} />} href="#" />
                </div>
            </div>

            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none stroke-foreground fill-foreground">
                <GridBackground />
            </div>
        </div>
    );
}

function SocialIcon({ icon, href }) {
    return (
        <a
            href={href}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:scale-110 active:scale-95 transition-all shadow-lg"
        >
            {icon}
        </a>
    );
}

export default ProtocolHeader;
