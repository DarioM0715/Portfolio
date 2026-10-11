import type { Project } from "../types";

import portfolioPicture from "../assets/images/project1_portfolio/Picture1.webp";
import produceosPicture1 from "../assets/images/project2_produceos/Picture1.webp";
import produceosPicture2 from "../assets/images/project2_produceos/Picture2.webp";
import produceosPicture3 from "../assets/images/project2_produceos/Picture3.webp";
import produceosPicture4 from "../assets/images/project2_produceos/Picture4.webp";
import produceosPicture5 from "../assets/images/project2_produceos/Picture5.webp";
import sapiensPicture from "../assets/images/project3_sapiens/Picture1.webp";
import sapiensPicture2 from "../assets/images/project3_sapiens/Picture2.webp";
import sapiensPicture3 from "../assets/images/project3_sapiens/Picture3.webp";
import myLittleHomePicture1 from "../assets/images/project4_mylittlehome/Picture1.webp";
import myLittleHomePicture2 from "../assets/images/project4_mylittlehome/Picture2.webp";
import myLittleHomePicture3 from "../assets/images/project4_mylittlehome/Picture3.webp";
import myLittleHomePicture4 from "../assets/images/project4_mylittlehome/Picture4.webp";
import myLittleHomePicture5 from "../assets/images/project4_mylittlehome/Picture5.webp";
import myLittleHomePicture6 from "../assets/images/project4_mylittlehome/Picture6.webp";

import { BsTypescript } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { SiDjango, SiExpress, SiTailwindcss } from "react-icons/si";
import { DiPython } from "react-icons/di";

export type ProjectData = Omit<Project, "title" | "description"> & {
    titleKey: string;
    descriptionKey: string;
};

const defaultTechnologies = [
    { id: 1, name: "React", icon: <FaReact /> },
    { id: 2, name: "TypeScript", icon: <BsTypescript /> },
    { id: 3, name: "TailwindCSS", icon: <SiTailwindcss /> },
];

const produceosTechnologies = [
    { id: 1, name: "React", icon: <FaReact /> },
    { id: 2, name: "TypeScript", icon: <BsTypescript /> },
    { id: 3, name: "TailwindCSS", icon: <SiTailwindcss /> },
    { id: 4, name: "Express", icon: <SiExpress/>},
    { id: 5, name: "Django", icon: <SiDjango/>},
    { id: 6, name: "Python", icon: <DiPython/>}
]

const myLittleHomeTechnologies = [
    { id: 1, name: "React", icon: <FaReact /> },
    { id: 2, name: "TypeScript", icon: <BsTypescript /> },
    { id: 3, name: "TailwindCSS", icon: <SiTailwindcss /> },
];

const sapiensTechnologies = [
    { id: 1, name: "React", icon: <FaReact /> },
    { id: 2, name: "TypeScript", icon: <BsTypescript /> },
    { id: 3, name: "TailwindCSS", icon: <SiTailwindcss /> },
    { id: 4, name: "Express", icon: <SiExpress/>},
]

export const projectsData: ProjectData[] = [
    {
        id: 1,
        titleKey: "project_produceos_title",
        descriptionKey: "project_produceos_description",
        image: produceosPicture1,
        altImage: "Captura de pantalla de Reserva Produce OS",
        images: [produceosPicture1, produceosPicture2, produceosPicture3, produceosPicture4, produceosPicture5],
        urlProd: "https://produceos.agrileaf.com/",
        urlGithub: "",
        technologies: produceosTechnologies,
    },
    {
        id: 2,
        titleKey: "project_mylittlehome_title",
        descriptionKey: "project_mylittlehome_description",
        image: myLittleHomePicture1,
        altImage: "Captura de pantalla de MyLittleHome",
        images: [
            myLittleHomePicture1,
            myLittleHomePicture2,
            myLittleHomePicture3,
            myLittleHomePicture4,
            myLittleHomePicture5,
            myLittleHomePicture6,
        ],
        urlProd: "https://mylittlehomebogota.com/",
        urlGithub: "",
        technologies: myLittleHomeTechnologies,
    },
    {
        id: 3,
        titleKey: "project_portfolio_title",
        descriptionKey: "project_portfolio_description",
        image: portfolioPicture,
        altImage: "Captura de pantalla de Dario.Portfolio",
        images: [portfolioPicture],
        urlProd: "",
        urlGithub: "https://github.com/DarioM0715/Portfolio",
        technologies: defaultTechnologies,
    },
    {
        id: 4,
        titleKey: "project_sapiens_title",
        descriptionKey: "project_sapiens_description",
        image: sapiensPicture,
        altImage: "Captura de pantalla de Sapiens",
        images: [sapiensPicture, sapiensPicture2, sapiensPicture3],
        urlProd: "",
        urlGithub: "https://github.com/DarioM0715/Sapiens",
        technologies: sapiensTechnologies,
    },
];
