import { BiTag, BiSolidPencil } from "react-icons/bi";
import { useLanguage } from "../context/LanguageContext";

const Card = ({ infocard }: any) => {
    const { id, icon, title, description } = infocard;

    return (
        <div
            id={id}
            className="border border-gray-700 rounded-md flex flex-col gap-4 p-4 transition-transform hover:translate-y-0.5 h-full"
        >
            <div className="bg-gray-600 h-12 w-12 flex items-center justify-center rounded-md">{icon}</div>
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
            icon: "",
            title: t("about_card_responsive"),
            description: t("about_card_responsive_desc"),
        },
        {
            id: 3,
            icon: "",
            title: t("about_card_uiux"),
            description: t("about_card_uiux_desc"),
        },
        {
            id: 4,
            icon: <BiSolidPencil size={24} />,
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

                <p className="font-semibold text-lg">{t("about_description")}</p>

                <p className="font-semibold text-md text-violet-600">
                    {t("about_question")}{" "}
                    <a href="#contact">
                        <span className="text-violet-600 hover:underline cursor-pointer">{t("about_contactMe")}</span>
                    </a>
                </p>
            </div>

            <div className="items-center grid grid-cols-1 lg:grid-cols-2 gap-6">
                {infocards.map((info) => (
                    <Card infocard={info} />
                ))}
            </div>
        </div>
    );
};

export default About;
