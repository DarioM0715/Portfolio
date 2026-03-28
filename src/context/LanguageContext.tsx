import React, { createContext, useContext, useEffect, useState } from "react";
import es from "../translations/es.json";
import en from "../translations/en.json";

type Translations = Record<string, string>;
type Language = "es" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, variables?: Record<string, string>) => string;
}

const translations: Record<Language, Translations> = { es, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem("language") as Language;
        return saved && (saved === "es" || saved === "en") ? saved : "es";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const t = (key: string, variables?: Record<string, string>): string => {
        let text = translations[language][key] || key;
        if (variables) {
            Object.entries(variables).forEach(([varKey, value]) => {
                text = text.replace(new RegExp(`{{${varKey}}}`, "g"), value);
            });
        }
        return text;
    };

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
