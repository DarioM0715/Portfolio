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
        <div className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
            <img
                alt={altImage}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-5">
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    {title}
                </h3>

                <div className="flex flex-wrap items-center justify-between gap-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <div className="flex flex-wrap items-center gap-2">
                        {urlGithub && (
                            <a
                                href={urlGithub}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={t("projects_code_label", { name: title })}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs border border-white/40 text-white transition-all duration-200 hover:border-white hover:bg-white/10"
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
                                className="flex items-center gap-2 px-3 py-1.5 text-xs border border-white/40 text-white transition-all duration-200 hover:border-white hover:bg-white/10"
                            >
                                <FiExternalLink size={14} />
                                {t("projects_live")}
                            </a>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {technologies.map((technology) => (
                            <span key={technology.id} className="text-white/80">
                                {technology.icon}
                            </span>
                        ))}
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
        <div id="projects" className="projects-section page-gutter py-20 flex items-center justify-center flex-col gap-10">
            <div className="projects-section-heading mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-3">
                    <span className="projects-eyebrow">{t("projects_eyebrow")}</span>
                    <h2 className="text-4xl font-black tracking-tight sm:text-5xl">{t("projects_title")}</h2>
                    <p className="max-w-2xl text-base font-semibold leading-relaxed text-(--text-secondary) sm:text-lg">{t("projects_description")}</p>
                </div>
                <div className="projects-count" aria-label={`${projects.length} ${t("projects_count_label")}`}>
                    <span>{String(projects.length).padStart(2, "0")}</span>
                    <span>{t("projects_count_label")}</span>
                </div>
            </div>

            <div className="w-full max-w-7xl">
                <ul className="projects-grid">
                    {projects.map((project, index) => (
                        <li
                            key={project.id}
                            onClick={() => handleOpen(index)}
                            className={`projects-grid-item projects-grid-item-${index + 1}`}
                        >
                            <Card project={project} />
                        </li>
                    ))}
                </ul>
            </div>

            <a className="flex text-nowrap gap-4 btn-ghost px-6 py-2 transition duration-300 hover:scale-105" href="https://github.com/DarioM0715">
                <span>{t("projects_more_software")}</span>
                <FiGithub size={24} />
            </a>

            <ProjectsModal projects={projects} isOpen={open} onClose={handleClose} index={activeIndex} />
        </div>
    );
};

export default Projects;
