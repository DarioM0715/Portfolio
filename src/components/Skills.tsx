import { BsJavascript, BsTypescript } from "react-icons/bs";
import { FaCss3, FaGit, FaGithub, FaHtml5, FaPython, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiDjango, SiExpress } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Skills = () => {
    const { t } = useLanguage();
    
    const skills = [
        { id: 1, icon: <FaHtml5 size={32} />, name: "HTML5" },
        { id: 2, icon: <FaCss3 size={32} />, name: "CSS3" },
        { id: 3, icon: <RiTailwindCssFill size={32} />, name: "Tailwind CSS" },
        { id: 4, icon: <BsJavascript size={32} />, name: "JavaScript" },
        { id: 5, icon: <BsTypescript size={32} />, name: "TypeScript" },
        { id: 6, icon: <FaPython size={32} />, name: "Python" },
        { id: 7, icon: <FaReact size={32} />, name: "React" },
        { id: 8, icon: <SiDjango size={32} />, name: "Django" },
        { id: 9, icon: <SiExpress size={32} />, name: "Express" },
        { id: 10, icon: <FaGit size={32} />, name: "Git" },
        { id: 11, icon: <FaGithub size={32} />, name: "Github" },
    ];

    return (
        <section
            id="skills"
            className="py-16 lg:min-h-screen lg:py-0 flex flex-col justify-center gap-16 w-full mx-auto text-center border-b border-violet-500/10 px-[6vw]"
        >
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl title-glow font-bold">{t("skills_title")}</h2>
                <p className="text-lg font-semibold text-center">{t("skills_description")}</p>
            </div>

            <div className="gap-8 w-full">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
                    {skills.map((tech) => (
                        <li key={tech.id} className="card-glow flex flex-col items-center justify-center gap-2 p-4 hover:-translate-y-1 hover:scale-105 text-(--muted) hover:text-violet-400">
                            {tech.icon}
                            <span className="text-lg font-semibold">{tech.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Skills;
