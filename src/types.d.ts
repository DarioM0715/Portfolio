import type { CSSProperties, ReactNode } from "react";

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
    altImage: string;
    images?: string[];
    urlProd?: string;
    urlGithub?: string;
    technologies: Technology[];
};

interface LottiePlayerProps {
    src?: string;
    background?: string;
    speed?: number | string;
    loop?: boolean;
    autoplay?: boolean;
    controls?: boolean;
    style?: CSSProperties;
}

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "lottie-player": LottiePlayerProps;
        }
    }
}
