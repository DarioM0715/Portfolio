import { BsJavascript, BsTypescript } from "react-icons/bs";
import { FaCss3, FaGit, FaGithub, FaHtml5, FaPython, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiDjango, SiExpress } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const Skills = () => {
    const { t } = useLanguage();
    
    const skills = [
        { id: 1, icon: <FaHtml5 />, name: "HTML5" },
        { id: 2, icon: <FaCss3 />, name: "CSS3" },
        { id: 3, icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
        { id: 4, icon: <BsJavascript />, name: "JavaScript" },
        { id: 5, icon: <BsTypescript />, name: "TypeScript" },
        { id: 6, icon: <FaPython />, name: "Python" },
        { id: 7, icon: <FaReact />, name: "React" },
        { id: 8, icon: <SiDjango />, name: "Django" },
        { id: 9, icon: <SiExpress />, name: "Express" },
        { id: 10, icon: <FaGit />, name: "Git" },
        { id: 11, icon: <FaGithub />, name: "Github" },
    ];

    const row1 = [...skills, ...skills];
    const row2 = [...skills.slice(6), ...skills.slice(0, 6), ...skills.slice(6), ...skills.slice(0, 6)];
    const row3 = [...skills.slice(3), ...skills.slice(0, 3), ...skills.slice(3), ...skills.slice(0, 3)];

    return (
        <section
            id="skills"
            className="py-16 lg:min-h-screen lg:py-0 flex flex-col justify-center gap-6 w-full mx-auto border-b border-white/10 overflow-hidden"
        >
            <div className="page-gutter w-full">
                <div className="mx-auto w-full max-w-7xl">
                    <h2 className="text-4xl title-glow font-black tracking-tight">{t("skills_title")}</h2>
                </div>
            </div>

            <div className="relative w-full flex flex-col gap-4">
                <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-(--bg) to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-(--bg) to-transparent z-10 pointer-events-none" />
                
                <div className="flex animate-marquee hover:[animation-play-state:paused]">
                    {row1.map((tech, index) => (
                        <div
                            key={`row1-${tech.id}-${index}`}
                            className="flex items-center justify-center mx-6 text-white/80 transition-all hover:text-white hover:scale-110"
                        >
                            <div className="text-5xl md:text-6xl lg:text-7xl">{tech.icon}</div>
                        </div>
                    ))}
                </div>
                
                <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
                    {row2.map((tech, index) => (
                        <div
                            key={`row2-${tech.id}-${index}`}
                            className="flex items-center justify-center mx-6 text-white/70 transition-all hover:text-white hover:scale-110"
                        >
                            <div className="text-5xl md:text-6xl lg:text-7xl">{tech.icon}</div>
                        </div>
                    ))}
                </div>
                
                <div className="flex animate-marquee hover:[animation-play-state:paused]">
                    {row3.map((tech, index) => (
                        <div
                            key={`row3-${tech.id}-${index}`}
                            className="flex items-center justify-center mx-6 text-white/75 transition-all hover:text-white hover:scale-110"
                        >
                            <div className="text-5xl md:text-6xl lg:text-7xl">{tech.icon}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
