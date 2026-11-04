import { FiBriefcase, FiCode, FiUsers } from "react-icons/fi";
import { Button } from "./Button";
import { useLanguage } from "../context/LanguageContext";
import SkillsBackground from "./SkillsBackground";
import type { ReactNode } from "react";

interface CardProps {
    infocard: {
        icon: ReactNode;
        title: string;
        description: string;
    };
}

const Card = ({ infocard }: CardProps) => {
    const { icon, title, description } = infocard;

    return (
        <div className="relative overflow-hidden flex flex-col gap-3 p-6 transition-all duration-300 hover:-translate-y-1 group border border-white/10 rounded-lg bg-linear-to-br from-[#2a2a2a] to-[#151515] backdrop-blur-sm">
            <div className="absolute inset-0 bg-linear-to-r from-[#a855f7]/0 via-[#a855f7]/5 to-[#a855f7]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative icon-pill h-12 w-12">{icon}</div>
            <h3 className="relative text-xl font-bold text-white">{title}</h3>
            <p className="relative text-sm font-medium text-(--text-secondary) leading-relaxed">{description}</p>
        </div>
    );
};

const About = () => {
    const { t } = useLanguage();
    const infocards = [
        {
            id: 1,
            icon: <FiCode size={24} />,
            title: t("about_card_freelance"),
            description: t("about_card_freelance_desc"),
        },
        {
            id: 2,
            icon: <FiBriefcase size={24} />,
            title: t("about_card_fulltime"),
            description: t("about_card_fulltime_desc"),
        },
        {
            id: 3,
            icon: <FiUsers size={24} />,
            title: t("about_card_collab"),
            description: t("about_card_collab_desc"),
        },
    ];

    return (
        <div
            id="about"
            className="page-gutter relative py-16 lg:min-h-screen overflow-hidden"
        >
            <div className="absolute inset-0 z-1">
                <SkillsBackground />
            </div>
            <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 xl:grid-cols-2 items-center min-h-[inherit] py-16 lg:py-0 z-2">
                <div className="relative flex flex-col gap-4 z-10">
                    <h2 className="font-black text-4xl tracking-tight title-glow">{t("about_title")}</h2>

                    <p className="font-semibold text-xl text-white leading-relaxed">{t("about_description")}</p>

                    <div className="mt-4 flex flex-wrap gap-4 text-white">
                        <Button className="btn-primary px-6 py-2 transition duration-300 hover:scale-110">
                            {t("nav_downloadCv")}
                        </Button>
                        <a href="#contact" className="btn-ghost px-6 py-2 transition duration-300 hover:scale-110">
                            {t("nav_contact")}
                        </a>
                    </div>
                </div>

                <div className="relative items-center grid grid-cols-1 md:grid-cols-2 gap-4">
                    {infocards.map((info, index) => (
                        <div key={info.id} className={index === 2 ? "md:col-span-2" : ""}>
                            <Card infocard={info} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
