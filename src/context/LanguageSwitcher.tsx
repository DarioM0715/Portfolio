import { useLanguage } from "../context/LanguageContext";

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex gap-2">
            <button
                onClick={() => setLanguage("en")}
                disabled={language === "en"}
                className={`text-2xl transition-transform hover:scale-110 ${
                    language === "en" ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                title="English"
            >
                🇺🇸
            </button>
            <button
                onClick={() => setLanguage("es")}
                disabled={language === "es"}
                className={`text-2xl transition-transform hover:scale-110 ${
                    language === "es" ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                title="Español"
            >
                🇪🇸
            </button>
        </div>
    );
};
