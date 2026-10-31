import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

//COMPONENTS
import { Button } from "./Button";

//ICONS
import { FiExternalLink, FiGithub } from "react-icons/fi";

//DATA
import { projectsData } from "../data/projects";
import type { Project } from "../types";
import { ProjectsModal } from "./Project/ProjectModal";

const Card = ({ project }: { project: Project }) => {
    const { id, title, description, image, altImage, urlProd, urlGithub } = project;
    const { t } = useLanguage();

    return (
        <div
            id={String(id)}
            className="card-glow group relative flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-2"
        >
            <div className="relative h-44 shrink-0 overflow-hidden">
                <img
                    alt={altImage}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 transform-gpu"
                    src={image}
                />
                <div className="absolute inset-0 from-(--surface) to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-sm font-medium text-(--text-secondary) line-clamp-3 whitespace-pre-line">{description}</p>

                <div className="project-tags">
                    {project.technologies.map((technology) => (
                      <span className="project-tag flex items-center gap-4" key={technology.id}>
                        {technology.icon}
                        {technology.name}
                      </span>
                    ))}
                </div>

                <div className="mt-auto flex items-center gap-3 pt-2">
                    {urlProd && (
                        <a
                            href={urlProd}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={t("projects_live_label", { name: title })}
                            className="flex items-center gap-2 btn-ghost px-6 py-2"
                        >
                            <FiExternalLink size={16} />
                            {t("projects_live")}
                        </a>
                    )}
                    {urlGithub && (
                        <a
                            href={urlGithub}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={t("projects_code_label", { name: title })}
                            className="flex items-center gap-2 btn-ghost px-6 py-2"
                        >
                            <FiGithub size={16} />
                            {t("projects_code")}
                        </a>
                    )}
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
        <div
            id="projects"
            className="py-16 flex items-center justify-center flex-col gap-8 border-b border-white/10 px-[6vw] bg-window"
        >
            <div className="flex items-center flex-col gap-2 ">
                <h2 className="text-4xl font-black tracking-tight">{t("projects_title")}</h2>
                <p className="text-lg font-semibold text-(--text-secondary)">{t("projects_description")}</p>
            </div>

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
                    {projects.map((project, index) => (
                        <li key={project.id} onClick={() => handleOpen(index)} className="h-full">
                            <Card project={project} />
                        </li>
                    ))}
                </ul>
            </div>

            <a className="flex text-nowrap gap-4 btn-ghost px-6 py-2" href="https://github.com/DarioM0715">
                <span>View more projects on GitHub</span>
                <FiGithub size={24} />
            </a>

            <ProjectsModal projects={projects} isOpen={open} onClose={handleClose} index={activeIndex} />
        </div>
    );
};

export default Projects;
