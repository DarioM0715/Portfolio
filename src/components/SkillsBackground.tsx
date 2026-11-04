import { BsJavascript, BsTypescript } from "react-icons/bs";
import { FaCss3, FaGit, FaGithub, FaHtml5, FaPython, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiDjango, SiExpress } from "react-icons/si";

const SkillsBackground = () => {
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

    const row1 = [...skills, ...skills, ...skills];
    const row2 = [...skills.slice(5), ...skills.slice(0, 5), ...skills.slice(5), ...skills.slice(0, 5), ...skills.slice(5)];
    const row3 = [...skills.slice(8), ...skills.slice(0, 8), ...skills.slice(8), ...skills.slice(0, 8)];
    const row4 = [...skills.slice(3), ...skills.slice(0, 3), ...skills.slice(3), ...skills.slice(0, 3), ...skills.slice(3)];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
            <div className="absolute inset-0 bg-linear-to-b from-(--bg)/40 via-(--bg)/50 to-(--bg)" />
            
            <div className="absolute top-0 left-0 w-[300%] h-full -rotate-12 origin-top-left">
                <div className="flex flex-col gap-12 absolute -top-48 -left-48">
                    <div className="flex animate-marquee-diagonal">
                        {row1.map((tech, index) => (
                            <div
                                key={`d1-${tech.id}-${index}`}
                                className="flex items-center justify-center mx-10 opacity-15 text-white hover:scale-110"
                            >
                                <div className="text-6xl lg:text-7xl xl:text-8xl">{tech.icon}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex animate-marquee-diagonal-reverse hover:[animation-play-state:paused]">
                        {row2.map((tech, index) => (
                            <div
                                key={`d2-${tech.id}-${index}`}
                                className="flex items-center justify-center mx-10 opacity-12 text-white hover:scale-110"
                            >
                                <div className="text-6xl lg:text-7xl xl:text-8xl">{tech.icon}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex animate-marquee-diagonal hover:[animation-play-state:paused]">
                        {row3.map((tech, index) => (
                            <div
                                key={`d3-${tech.id}-${index}`}
                                className="flex items-center justify-center mx-10 opacity-16 text-white hover:scale-110"
                            >
                                <div className="text-6xl lg:text-7xl xl:text-8xl">{tech.icon}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex animate-marquee-diagonal-reverse hover:[animation-play-state:paused]">
                        {row4.map((tech, index) => (
                            <div
                                key={`d4-${tech.id}-${index}`}
                                className="flex items-center justify-center mx-10 opacity-14 text-white hover:scale-110"
                            >
                                <div className="text-6xl lg:text-7xl xl:text-8xl">{tech.icon}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex animate-marquee-diagonal hover:[animation-play-state:paused]">
                        {row1.map((tech, index) => (
                            <div
                                key={`d5-${tech.id}-${index}`}
                                className="flex items-center justify-center mx-10 opacity-13 text-white hover:scale-110"
                            >
                                <div className="text-6xl lg:text-7xl xl:text-8xl">{tech.icon}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsBackground;
