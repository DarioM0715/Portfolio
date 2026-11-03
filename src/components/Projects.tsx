import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

//ICONS
import { FiExternalLink, FiGithub } from "react-icons/fi";

//DATA
import { projectsData } from "../data/projects";
import type { Project } from "../types";
import { ProjectsModal } from "./Project/ProjectModal";

const Card = ({ project }: { project: Project }) => {
    const { title, image, altImage, urlProd, urlGithub, technologies } = project;
    const { t } = useLanguage();

    return (
        <div className="group relative aspect-16/10 overflow-hidden rounded-md border border-white/10 cursor-pointer">
            <img
                alt={altImage}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={image}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-between p-4">

                <div className="flex flex-col justify-end w-full">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {title}
                    </h3>

                    <div className="flex flex-wrap justify-between items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {urlGithub && (
                            <a
                                href={urlGithub}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={t("projects_code_label", { name: title })}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs border border-white/40 text-white hover:border-white hover:bg-white/10 transition-all"
                            >
                                <FiGithub size={14} />
                                {t("projects_code")}
                            </a>
                        )}
                        {urlProd && (
                            <a
                                href={urlProd}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={t("projects_live_label", { name: title })}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs border border-white/40 text-white hover:border-white hover:bg-white/10 transition-all"
                            >
                                <FiExternalLink size={14} />
                                {t("projects_live")}
                            </a>
                        )}

                        <div className="flex gap-3 justify-end">
                            {technologies.map((technology) => (
                              <span key={technology.id}>
                                {technology.icon}
                              </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    const projects: Project[] = projectsData.map((p) => ({
        id: p.id,
        image: p.image,
        altImage: p.altImage,
        images: p.images,
        urlProd: p.urlProd,
        urlGithub: p.urlGithub,
        technologies: p.technologies,
        title: t(p.titleKey),
        description: t(p.descriptionKey),
    }));

    const [activeIndex, setActiveIndex] = useState(0);

    const handleOpen = (index: number) => {
        setActiveIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div  id="projects" className="py-16 flex items-center justify-center flex-col gap-8 px-[6vw] bg-(--bg)">
            <div className="flex items-center flex-col gap-2 ">
                <h2 className="text-4xl font-black tracking-tight">{t("projects_title")}</h2>
                <p className="text-lg font-semibold text-(--text-secondary)">{t("projects_description")}</p>
            </div>

            <div className="w-full max-w-7xl">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                    {projects.map((project, index) => (
                        <li key={project.id} onClick={() => handleOpen(index)} className="h-full">
                            <Card project={project} />
                        </li>
                    ))}
                </ul>
            </div>

            <a className="flex text-nowrap gap-4 btn-ghost px-6 py-2 duration-150 hover:scale-105" href="https://github.com/DarioM0715">
                <span>View more projects on GitHub</span>
                <FiGithub size={24} />
            </a>

            <ProjectsModal projects={projects} isOpen={open} onClose={handleClose} index={activeIndex} />
        </div>
    );
};

export default Projects;
