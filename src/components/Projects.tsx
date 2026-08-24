import { FaReact } from "react-icons/fa";
import { Button } from "./Button";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { BsTypescript } from "react-icons/bs";
import { SiTailwindcss } from "react-icons/si";
import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Dialog } from "./Dialog";
import { useLanguage } from "../context/LanguageContext";

import portfolioPicture from "../assets/images/Captura de pantalla 2026-03-16 001904.png";

const Card = ({ project }: { project: Project }) => {
    const { id, title, image, altImage, technologies } = project;

    return (
        <div id={String(id)} className="border border-gray-700 rounded-lg relative h-full">
            <div className="overflow-hidden rounded-t-lg h-44">
                <img
                    alt={altImage}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 hover:-rotate-2 transform-gpu cursor-pointer"
                    src={image}
                />
            </div>

            <div className="p-4 flex flex-col gap-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <ul className="flex flex-col sm:flex-row gap-4">
                    {technologies.map((tech) => (
                        <li className="flex items-center gap-1" key={tech.id}>
                            {tech.icon}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Projects = () => {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState<Project | null>();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    const handleOpen = (project: any) => {
        setOpen(true);
        setProject(project);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const projects: Project[] = [
        {
            id: 1,
            title: "Dario.Portfolio",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, odit dolore voluptatibus soluta minima placeat",
            image: portfolioPicture,
            altImage: "",
            urlProd: "",
            urlGithub: "",
            technologies: [
                { id: 1, name: "React", icon: <FaReact /> },
                { id: 2, name: "TypeScript", icon: <BsTypescript /> },
                { id: 3, name: "TailwindCSS", icon: <SiTailwindcss /> },
            ],
        },
        {
            id: 2,
            title: "Produceos",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, odit dolore voluptatibus soluta minima placeat",
            image: portfolioPicture,
            altImage: "",
            urlProd: "https://produceos.agrileaf.com/",
            urlGithub: "",
            technologies: [
                { id: 1, name: "React", icon: <FaReact /> },
                { id: 2, name: "TypeScript", icon: <BsTypescript /> },
                { id: 3, name: "TailwindCSS", icon: <SiTailwindcss /> },
            ],
        },
        {
            id: 3,
            title: "Sapiens",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, odit dolore voluptatibus soluta minima placeat",
            image: portfolioPicture,
            altImage: "",
            urlProd: "",
            urlGithub: "",
            technologies: [
                { id: 1, name: "React", icon: <FaReact /> },
                { id: 2, name: "TypeScript", icon: <BsTypescript /> },
                { id: 3, name: "TailwindCSS", icon: <SiTailwindcss /> },
            ],
        },
    ];

    return (
        <div
            id="projects"
            className="py-16 lg:h-screen lg:py-0 flex items-center justify-center flex-col gap-8 border-b border-gray-800 px-[6vw]"
        >
            <div className="flex items-center flex-col gap-2 ">
                <h2 className="text-4xl text-violet-600 font-bold">{t("projects_title")}</h2>
                <p className="text-lg font-semibold">{t("projects_description")}</p>
            </div>

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
                    {projects.map((project) => (
                        <li key={project.id} onClick={() => handleOpen(project)} className="h-full">
                            <Card project={project} />
                        </li>
                    ))}
                </ul>
            </div>

            <Button className="flex text-nowrap items-center gap-4 0 transform transition-all duration-150 p-4 hover:translate-y-1 rounded-md bg-violet-700 hover:bg-violet-600 shadow-md shadow-violet-700 text-white">
                <span>View more projects on GitHub</span>
                <FiGithub size={24} />
            </Button>

            <Dialog title={project?.title || ""} open={open} onClose={() => handleClose()}>
                <div id={String(project?.id)} className="rounded-lg relative">
                    <div className="overflow-hidden rounded-lg">
                        <img alt={project?.altImage} src={project?.image} />
                    </div>

                    <div className="p-4 flex flex-col gap-4">
                        <p className="font-semibold">{project?.description}</p>
                        <ul className="flex flex-col sm:flex-row gap-4">
                            {project?.technologies.map((tech) => (
                                <li className="flex items-center gap-1">
                                    {tech.icon}
                                    {tech.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Projects;