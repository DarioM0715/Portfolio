import { BiTag } from "react-icons/bi";
import { FaMobileAlt, FaPaintBrush, FaTachometerAlt, FaReact } from "react-icons/fa";
import { BsTypescript } from "react-icons/bs";
import { SiTailwindcss } from "react-icons/si";
import { Button } from "./Button";
import { useLanguage } from "../context/LanguageContext";

const Card = ({ infocard }: any) => {
    const { id, icon, title, description } = infocard;

    return (
        <div
            id={id}
            className="border border-gray-700 rounded-md flex flex-col gap-4 p-4 transition-transform hover:translate-y-0.5 h-full"
        >
            <div className="bg-gray-600 text-white h-12 w-12 flex items-center justify-center rounded-md">{icon}</div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-lg font-semibold">{description}</p>
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
            className="py-16 lg:min-h-screen grid grid-cols-1 gap-8 xl:grid-cols-2 items-center border-b border-gray-800 px-[6vw]"
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-violet-600 font-bold text-4xl">{t("about_title")}</h2>

                <p className="font-semibold text-2xl">{t("about_description")}</p>

                {/* <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm text-muted">Stack:</span>
                    <div className="flex items-center gap-2">
                        <FaReact className="text-cyan-400" />
                        <BsTypescript className="text-sky-500" />
                        <SiTailwindcss className="text-teal-400" />
                    </div>
                </div> */}

                <p className="font-semibold text-md text-violet-600 text-xl">
                    {t("about_question")}{" "}
                    <a href="#contact">
                        <span className="text-violet-600 hover:underline cursor-pointer">{t("about_contactMe")}</span>
                    </a>
                </p>

                <div className="mt-4 flex gap-4 text-white">
                    <Button className="transform transition-all duration-150 p-4 hover:translate-y-1 rounded-md bg-violet-700 hover:bg-violet-600 shadow-md shadow-violet-700 text-white">
                        {t("nav_downloadCv")}
                    </Button>
                    <a href="#contact" className="transform transition-all duration-150 p-4 hover:translate-y-1 rounded-md bg-gray-800 hover:bg-gray-700 shadow-md shadow-gray-800 text-white font-semibold">
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
