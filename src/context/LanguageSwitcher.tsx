import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex gap-2">
            {language === "en" && (
                <Button
                    onClick={() => setLanguage("es")}
                    className={`transition-transform hover:scale-110 ${
                        language === "en" ? "opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                >
                    <div className="flex items-center gap-1">
                        <span className="fi fi-us"></span>
                        <span>EN</span>
                    </div>
                </Button>
            )}

            {language === "es" && (
                <Button
                    onClick={() => setLanguage("en")}
                    className={`transition-transform hover:scale-110 ${
                        language === "es" ? "opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                >
                    <div className="flex items-center gap-1">
                        <span className="fi fi-es"></span>
                        <span>ES</span>
                    </div>
                </Button>
            )}
        </div>
    );
};
