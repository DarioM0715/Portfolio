import { BsJavascript, BsTypescript } from "react-icons/bs";
import { FaCss3, FaHtml5, FaPython, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiDjango, SiExpress, SiOdoo } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Skills = () => {
    const { t } = useLanguage();
    const technologies = [
        { id: 1, icon: <FaHtml5 size={32} />, name: "HTML5" },
        { id: 2, icon: <FaCss3 size={32} />, name: "CSS3" },
        { id: 3, icon: <RiTailwindCssFill size={32} />, name: "Tailwind CSS" },
        { id: 4, icon: <BsJavascript size={32} />, name: "JavaScript" },
        { id: 5, icon: <BsTypescript size={32} />, name: "TypeScript" },
        { id: 6, icon: <FaPython size={32} />, name: "Python" },
        { id: 7, icon: <FaReact size={32} />, name: "React" },
        { id: 8, icon: <SiDjango size={32} />, name: "Django" },
        { id: 9, icon: <SiExpress size={32} />, name: "Express" },
        { id: 10, icon: <SiOdoo size={32} />, name: "Odoo" },
    ];

    return (
        <section id="skills" className="min-h-screen flex flex-col justify-center gap-16 w-full mx-auto text-center">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl text-violet-600 font-bold">{t("skills_title")}</h2>
                <p className="text-lg font-semibold text-center">{t("skills_description")}</p>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {technologies.map((tech) => (
                    <li className="border border-gray-600 rounded-md flex items-center justify-center gap-4 p-4 transition-transform hover:translate-y-0.5">
                        {tech.icon}
                        <span className="text-2xl font-semibold text-nowrap">{tech.name}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;
