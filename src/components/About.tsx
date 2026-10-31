import { BiTag } from "react-icons/bi";
import { FaMobileAlt, FaPaintBrush, FaTachometerAlt } from "react-icons/fa";
import { Button } from "./Button";
import { useLanguage } from "../context/LanguageContext";

const Card = ({ infocard }: any) => {
    const { id, icon, title, description } = infocard;

    return (
        <div id={id} className="card-glow flex flex-col gap-4 p-5 transition-transform hover:-translate-y-1 h-full"
        >
            <div className="icon-pill h-12 w-12">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-lg font-semibold text-(--text-secondary)">{description}</p>
        </div>
    );
};

const About = () => {
    const { t } = useLanguage();
    const infocards = [
        {
            id: 1,
            icon: <BiTag size={24} />,
            title: t("about_card_developer"),
            description: t("about_card_dev_desc"),
        },
        {
            id: 2,
            icon: <FaMobileAlt size={24} />,
            title: t("about_card_responsive"),
            description: t("about_card_responsive_desc"),
        },
        {
            id: 3,
            icon: <FaPaintBrush size={24} />,
            title: t("about_card_uiux"),
            description: t("about_card_uiux_desc"),
        },
        {
            id: 4,
            icon: <FaTachometerAlt size={24} />,
            title: t("about_card_performance"),
            description: t("about_card_performance_desc"),
        },
    ];

    return (
        <div
            id="about"
            className="py-16 lg:min-h-screen grid grid-cols-1 gap-8 xl:grid-cols-2 items-center border-b border-white/10 px-[6vw]"
        >
            <div className="flex flex-col gap-2">
                <h2 className="font-black text-4xl tracking-tight">{t("about_title")}</h2>

                <p className="font-semibold text-2xl text-white">{t("about_description")}</p>

                <p className="font-semibold text-xl">
                    {t("about_question")}{" "}
                    <a href="#contact">
                        <span className="hover:underline cursor-pointer">{t("about_contactMe")}</span>
                    </a>
                </p>

                <div className="mt-4 flex gap-4 text-white">
                    <Button className="btn-ghost px-6 py-2">
                        {t("nav_downloadCv")}
                    </Button>
                    <a href="#contact" className="btn-ghost px-6 py-2">
                        Contact
                    </a>
                </div>
            </div>

            <div className="items-center grid grid-cols-1 lg:grid-cols-2 gap-6">
                {infocards.map((info) => (
                    <Card key={info.id} infocard={info} />
                ))}
            </div>
        </div>
    );
};

export default About;
