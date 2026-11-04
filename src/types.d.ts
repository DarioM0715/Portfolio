/// <reference types="vite/client" />
import type { ReactNode } from "react";

export type Technology = {
    id: number;
    name: string;
    icon?: ReactNode;
};

export type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    images?: string[];
    urlProd?: string;
    urlGithub?: string;
    technologies: Technology[];
};
