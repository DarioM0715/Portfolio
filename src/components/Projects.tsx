import { FaReact } from "react-icons/fa";
import portfolioPicture from "../assets/images/Captura de pantalla 2026-03-16 001904.png";
import { Button } from "./Button";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { BsTypescript } from "react-icons/bs";
import { SiTailwindcss } from "react-icons/si";
import { useState } from "react";
import type { Project } from "../types";
import { Dialog } from "./Dialog";

const Card = ({ project }: { project: Project }) => {
    const { id, title, description, image, altImage, urlProd, urlGithub, technologies } = project;

    return (
        <div id={String(id)} className="bg-gray-950 rounded-lg relative">
            <div>
                <div className="overflow-hidden rounded-lg">
                    <img
                        alt={altImage}
                        className="transition-transform duration-300 hover:scale-110 hover:-rotate-2 transform-gpu cursor-pointer"
                        src={image}
                    />
                </div>
                <div className="flex items-center gap-4 absolute top-0 bottom-6 right-4">
                    <Button icon className="border border-gray-600 p-2 rounded-full">
                        <a href={urlGithub}>
                            <FiGithub size={24} />
                        </a>
                    </Button>

                    <Button icon className="border border-gray-600 p-2 rounded-full">
                        <a href={urlProd}>
                            <FiLinkedin size={24} />
                        </a>
                    </Button>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="font-semibold">{description}</p>
                <ul className="flex gap-4 items-center">
                    {technologies.map((tech) => (
                        <li className="flex items-center gap-1">
                            {tech.icon}
                            {tech.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Projects = () => {
    const [open, setOpen] = useState(false);

    const projects: Project[] = [
        {
            id: 1,
            title: "My portfolio",
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
            title: "My portfolio",
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
            id: 3,
            title: "My portfolio",
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
            id: 4,
            title: "My portfolio",
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
            id: 5,
            title: "My portfolio",
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
            id: 6,
            title: "My portfolio",
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
        <div className="flex items-center flex-col gap-8 p-4">
            <div className="flex items-center flex-col gap-2">
                <h2 className="text-4xl text-violet-600 font-bold">My Recent Work</h2>
                <p className="text-lg font-semibold">Here is a selection of projects I have developed</p>
            </div>

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <li onClick={() => setOpen(true)}>
                            <Card project={project} />
                        </li>
                    ))}
                </ul>
            </div>

            <Button className="flex items-center gap-4 p-4 rounded-md bg-gray-700 shadow-md shadow-gray-700">
                <span>View more projects on GitHub</span>
                <FiGithub size={24} />
            </Button>

            <Dialog title="Titulo del proyecto" open={open} onClose={() => setOpen(false)}>
                Elemento de ejemplo
            </Dialog>
        </div>
    );
};

export default Projects;
