import { useEffect, useRef } from "react";
import type { Project } from "../types";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { ProjectCarousel } from "./ProjectCarousel";
import { useCarousel } from "./useCarousel";
import { useLockBodyScroll } from "./useLockBodyScroll";
import { useIsDesktop } from "./useIsDestop";

export type CardProps = {
    project: Project;
    open: boolean;
    onClose: () => void;
};

export const CardProject = ({ project, open, onClose }: CardProps) => {
    const { t } = useLanguage();
    const isDesktop = useIsDesktop();
    const { title, description, altImage, technologies } = project;

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    const images = project.images?.length ? project.images : [project.image];
    const { current, dragging, dragOffset, goTo, dragHandlers } = useCarousel(images.length);

    useLockBodyScroll(open);

    useEffect(() => {
        if (open) dialogRef.current?.focus();
    }, [open]);

    return (
        <div className={`text-(--text) fixed inset-0 z-100 flex items-center px-6 py-6 ${open ? "" : "pointer-events-none"}`}>
            <div
                ref={overlayRef}
                className={`fixed inset-0 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
                onMouseDown={(e) => {
                    if (e.target === overlayRef.current) onClose();
                }}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                ref={dialogRef}
                className={`border border-violet-500/30 bg-(--bg) relative w-full h-[min(90vh,820px)] flex flex-col sm:flex-row overflow-hidden transform rounded-2xl shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all duration-200 ${
                    open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                }`}
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight" && images.length > 1) goTo(current + 1);
                    else if (e.key === "ArrowLeft" && images.length > 1) goTo(current - 1);
                    else if (e.key === "Escape") onClose();
                }}
                tabIndex={-1}
            >
                <div className="h-[35vh] w-full shrink-0 p-3 sm:h-full sm:w-[45%] sm:p-4 flex flex-col gap-4">
                        {!isDesktop && (
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold title-glow truncate">{title}</h3>
                                <button
                                    type="button"
                                    aria-label={t("projects_close")}
                                    onClick={onClose}
                                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md cursor-pointer hover:border hover:border-violet-500/50 hover:text-violet-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        width="18"
                                        height="18"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}

                    <ProjectCarousel
                        images={images}
                        alt={altImage}
                        className="h-full w-full"
                        current={current}
                        dragging={dragging}
                        dragOffset={dragOffset}
                        goTo={goTo}
                        dragHandlers={dragHandlers}
                    />
                </div>

                <div className={`flex flex-1 min-h-0 min-w-0 flex-col border-t border-violet-500/20 sm:border-t-0 sm:border-l ${!isDesktop && "pt-4"}`}>
                {isDesktop && (
                    <header className="flex items-center justify-between gap-4 p-4 sm:p-6 shrink-0">
                        <h3 className="text-2xl font-bold title-glow truncate">{title}</h3>
                        <button
                            type="button"
                            aria-label={t("projects_close")}
                            onClick={onClose}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md cursor-pointer hover:border hover:border-violet-500/50 hover:text-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                width="18"
                                height="18"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>
                )}
                    

                    <div className="flex flex-1 min-h-0 flex-col gap-6 overflow-auto px-4 pb-6 sm:px-6">
                        <p className="font-medium whitespace-pre-line">{description}</p>

                        <ul className="flex flex-wrap gap-2">
                            {technologies.map((tech) => (
                                <li
                                    key={tech.id}
                                    className="flex items-center gap-1.5 rounded-md border border-violet-500/20 bg-violet-500/10 px-2.5 py-1.5 text-sm font-semibold"
                                >
                                    {tech.icon}
                                    {tech.name}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                            {project.urlProd && (
                                <a
                                    href={project.urlProd}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_16px_rgba(124,58,237,0.7)]"
                                >
                                    <FiExternalLink size={16} />
                                    {t("projects_live")}
                                </a>
                            )}
                            {project.urlGithub && (
                                <a
                                    href={project.urlGithub}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-md border border-gray-600 px-4 py-2 text-sm font-semibold transition-all hover:border-violet-400 hover:text-violet-400"
                                >
                                    <FiGithub size={16} />
                                    {t("projects_code")}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
