import { Button } from "./Button";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
    const { t } = useLanguage();
    return (
        <section id="home" className="flex min-h-screen items-center ">
            <div className="flex flex-col gap-10">
                <div className="flex flex-col">
                    <h1 className="text-5xl lg:text-8xl font-bold">
                        {t("home_title")}
                        <br />
                        <span className="text-violet-600">{t("home_subtitle")}</span>
                    </h1>
                </div>

                <div>
                    <p className="font-semibold text-xl">{t("home_description")}</p>
                </div>

                <div className="flex items-center gap-4">
                    <Button className="transform transition-all duration-150 p-4 hover:translate-y-1 rounded-md bg-violet-700 hover:bg-violet-600 shadow-md shadow-violet-700">
                        <a href="#projects">{t("home_viewProjects")}</a>
                    </Button>

                    <Button className="transform transition-all duration-150 p-4 hover:translate-y-1 rounded-md bg-gray-800 hover:bg-gray-700 shadow-md shadow-gray-800">
                        <a href="#contact">{t("home_contact")}</a>
                    </Button>
                </div>
            </div>

            <div>{/* Aqui deberia poner una imagen o animacion en este espacio vacio */}</div>
        </section>
    );
};

export default Home;
