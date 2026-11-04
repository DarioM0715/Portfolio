import { useLanguage } from "../context/LanguageContext";
import { Code2 } from "lucide-react";
import { FaReact, FaPython } from "react-icons/fa";
import { BsTypescript } from "react-icons/bs";

const Home = () => {
    const { t } = useLanguage();

    return (
        <section id="home" className="home-gradient page-gutter flex min-h-screen items-center pt-20 zz-background-pattern-animation">
            <div className="home-content mx-auto flex w-full max-w-7xl items-center justify-between gap-10">
                <div className="flex min-w-0 w-full flex-col gap-10 lg:max-w-2xl">
                    <div className="flex flex-col">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight">
                            <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                                {t("home_title")}
                            </span>
                            <br />
                            <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                                {t("home_subtitle1")}
                            </span>
                            <br />
                            <span>{t("home_subtitle2")}</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                        <a className="btn-primary px-6 py-2 transition duration-300 hover:scale-105" href="#projects">{t("home_viewProjects")}</a>
                        <a className="btn-ghost px-6 py-2 transition duration-300 hover:scale-105" href="#contact">{t("home_contact")}</a>
                    </div>
                </div>

                <div className="home-visual hidden md:flex" aria-hidden="true">
                    <div className="home-orbit home-orbit-outer" />
                    <div className="home-orbit home-orbit-inner" />
                    <div className="home-visual-glow" />
                    <div className="home-code-emblem">
                        <Code2 className="home-code-icon transition duration-300 hover:scale-110" strokeWidth={1.4} />
                    </div>
                    <div className="home-floating-icon home-floating-react transition duration-300 hover:scale-110">
                        <FaReact />
                    </div>
                    <span className="home-floating-icon home-floating-label-top transition duration-300 hover:scale-110">
                        <FaPython/>
                    </span>
                    <span className="home-floating-icon home-floating-label-bottom transition duration-300 hover:scale-110">
                        <BsTypescript/>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Home;
