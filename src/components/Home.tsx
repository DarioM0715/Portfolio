import { useLanguage } from "../context/LanguageContext";

const Home = () => {
    const { t } = useLanguage();

    return (
        <section id="home" className="flex justify-between min-h-screen items-center border-b border-white/10 px-[6vw] pt-20 zz-background-pattern-animation">
            <div className="flex flex-col gap-10 min-w-0 w-full lg:max-w-2xl">
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
                        <span className="">{t("home_subtitle2")}</span>
                    </h1>
                </div>

                <div>
                    <p className="font-semibold text-xl 2xl:text-2xl text-(--text-secondary) drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t("home_description")}</p>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                    <a className="btn-ghost px-6 py-2" href="#projects">{t("home_viewProjects")}</a>
                    <a className="btn-ghost px-6 py-2" href="#contact">{t("home_contact")}</a>
                </div>
            </div>
        </section>
    );
};

export default Home;
