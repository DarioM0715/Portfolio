import { useLanguage } from "../context/LanguageContext";
import { BiFlag } from "react-icons/bi";

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div>
            {language === "es" ? (
                <button onClick={() => setLanguage("en")} disabled={language === "en"}>
                    <BiFlag className="text-blue-600" />
                </button>
            ) : (
                <button onClick={() => setLanguage("es")} disabled={language === "es"}>
                    <BiFlag className="text-red-600" />
                </button>
            )}
        </div>
    );
};
