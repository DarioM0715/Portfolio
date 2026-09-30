import { Button } from "./Button";
import { useLanguage } from "../context/LanguageContext";
import { useIsDesktop } from "./useIsDestop";

const Home = () => {
    const { t } = useLanguage();
    const isDesktop = useIsDesktop(1024);

    return (
        <section id="home" className="flex justify-between min-h-screen items-center border-b border-violet-500/10 px-[6vw]">
            <div className="flex flex-col gap-10">
                <div className="flex flex-col">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
                        {t("home_title")}
                        <br />
                        {t("home_subtitle1")}
                        <br />
                        <span className="title-glow">{t("home_subtitle2")}</span>
                    </h1>
                </div>

                <div>
                    <p className="font-semibold text-xl lg:text-2xl">{t("home_description")}</p>
                </div>

                <div className="flex items-center gap-4">
                    <Button className="btn-primary transform transition-all duration-150 p-4 hover:-translate-y-1">
                        <a href="#projects">{t("home_viewProjects")}</a>
                    </Button>

                    <Button className="btn-ghost transform transition-all duration-150 p-4 hover:-translate-y-1">
                        <a href="#contact">{t("home_contact")}</a>
                    </Button>
                </div>
            </div>

            {/* ANIMATED ASSETS */}
            {isDesktop && 
                <div className="hidden lg:flex lg:flex-1 lottie-holder">
                    {/* Replace the src with any Lottie JSON URL you like from LottieFiles */}
                    <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_tfb3estd.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                        style={{ width: "700px", height: "700px" }}
                    ></lottie-player>
                </div>}
        </section>
    );
};

export default Home;
