import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext({
    theme: "dark" as Theme,
    toggle: () => {},
});

export const ThemeProvider = ({ children }: any) => {
    const getInitial = (): Theme => {
        try {
            const saved = localStorage.getItem("theme");
            if (saved === "light" || saved === "dark") return saved;
        } catch (e) {}

        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
        return "dark";
    };

    const [theme, setTheme] = useState<Theme>(getInitial);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {}
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
