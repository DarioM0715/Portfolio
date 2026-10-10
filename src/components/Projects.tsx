import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

//COMPONENTS
import { Button } from "./Button";
import { CardProject } from "./CardProject";

//ICONS
import { FiExternalLink, FiGithub } from "react-icons/fi";

//DATA
import { projectsData } from "../data/projects";
import type { Project } from "../types";

const Card = ({ project }: { project: Project }) => {
    const { id, title, description, image, altImage, urlProd, urlGithub, technologies } = project;
    const { t } = useLanguage();

    return (
        <div
            id={String(id)}
            className="card-glow group relative flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-2"
        >
            <div className="relative h-44 shrink-0 overflow-hidden">
                <img
                    alt={altImage}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 transform-gpu"
                    src={image}
                />
                <div className="absolute inset-0 from-(--surface) to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <h3 className="text-2xl font-bold transition-colors group-hover:text-violet-400">{title}</h3>
                <p className="text-sm font-medium text-(--muted) line-clamp-4 whitespace-pre-line">{description}</p>

                <ul className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <li
                            key={tech.id}
                            className="flex items-center gap-1.5 rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-xs font-semibold transition-colors group-hover:border-violet-500/40"
                        >
                            {tech.icon}
                            {tech.name}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex items-center gap-3 pt-2">
                    {urlProd && (
                        <a
                            href={urlProd}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={t("projects_live_label", { name: title })}
                            className="flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_16px_rgba(124,58,237,0.7)]"
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
                            className="flex items-center gap-2 rounded-md border border-gray-600 px-4 py-2 text-sm font-semibold transition-all hover:border-violet-400 hover:text-violet-400"
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

    const [projectId, setProjectId] = useState<number>(projects[1].id);
    const project = projects.find((p) => p.id === projectId) ?? projects[0];

    const handleOpen = (id: number) => {
        setOpen(true);
        setProjectId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            id="projects"
            className="py-16 flex items-center justify-center flex-col gap-8 border-b border-violet-500/10 px-[6vw]"
        >
            <div className="flex items-center flex-col gap-2 ">
                <h2 className="text-4xl title-glow font-bold">{t("projects_title")}</h2>
                <p className="text-lg font-semibold">{t("projects_description")}</p>
            </div>

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
                    {projects.map((project) => (
                        <li key={project.id} onClick={() => handleOpen(project.id)} className="h-full">
                            <Card project={project} />
                        </li>
                    ))}
                </ul>
            </div>

            <Button className="btn-ghost  items-center transition-transform p-4 hover:-translate-y-1 font-semibold">
                <a className="flex text-nowrap gap-4" href="https://github.com/DarioM0715">
                    <span>View more projects on GitHub</span>
                    <FiGithub size={24} />
                </a>
                
            </Button>

            <CardProject key={project.id} project={project} open={open} onClose={handleClose} />
        </div>
    );
};

export default Projects;
