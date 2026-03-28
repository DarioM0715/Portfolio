export type Technology = {
    id: number;
    name: string;
    icon?: any;
};

export type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    altImage: string;
    urlProd?: string;
    urlGithub?: string;
    technologies: Technology[];
};
