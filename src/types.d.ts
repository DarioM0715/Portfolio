/// <reference types="vite/client" />
import type { CSSProperties, ReactNode } from "react";

interface ImportMetaEnv {
    readonly VITE_EMAILJS_SERVICE_ID: string;
    readonly VITE_EMAILJS_TEMPLATE_ID: string;
    readonly VITE_EMAILJS_PUBLIC_KEY: string;
}

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
