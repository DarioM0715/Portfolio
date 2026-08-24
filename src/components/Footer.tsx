import { Button } from "./Button";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="flex flex-col md:flex-row items-start md:items-center justify-between px-[6vw] py-[4vw] mt-[6vw] border-t border-gray-800 gap-6">
            <div className="flex flex-col gap-4 max-w-lg">
                <a href="/" className="text-xl font-bold">
                    <span className="text-violet-600">Dario.</span>
                    portfolio
                </a>

                <p>{t("footer_description")}</p>

                <p>{t("footer_copyright")}</p>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <Button icon className="border border-gray-700 rounded-full p-3 flex items-center hover:-rotate-4">
                    <FiGithub size={24} />
                </Button>

                <Button icon className="border border-gray-700 rounded-full p-3 flex items-center hover:-rotate-4">
                    <FiLinkedin size={24} />
                </Button>
            </div>
        </footer>
    );
};

export default Footer;
