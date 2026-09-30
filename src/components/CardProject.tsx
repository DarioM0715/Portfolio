import { useEffect, useRef, useState } from "react";
import type { Project } from "../types";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useLanguage } from "../context/LanguageContext";

export type CardProps = {
    project: Project;
    open: boolean;
    onClose: () => void;
    ariaLabel?: string;
};

const arrowButtonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-(--bg)/80 text-violet-400 backdrop-blur-sm transition-all duration-150 hover:border-violet-500/60 hover:bg-violet-500/20 hover:shadow-[0_0_12px_rgba(124,58,237,0.5)] focus-visible:outline-2 focus-visible:outline-violet-500 cursor-pointer";

export const CardProject = ({ project, open, onClose }: CardProps) => {
    const { t } = useLanguage();
    const { title, description, altImage, technologies } = project;

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    const images = project.images?.length ? project.images : [project.image];
    const [current, setCurrent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartX = useRef<number | null>(null);

    useEffect(() => {
        if (open) {
            dialogRef.current?.focus();
        }
    }, [open]);

    const goTo = (index: number) => setCurrent((index + images.length) % images.length);

    return (
        <div className={`text-(--text) fixed inset-0 z-100 flex items-center px-6 py-6 ${open ? "" : "pointer-events-none"}`}>
            <div ref={overlayRef} className={`fixed inset-0 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
                onMouseDown={(e) => {
                    if (e.target === overlayRef.current) onClose();
                }}
            />
            <div
                role="dialog" aria-modal="true" aria-label={title} ref={dialogRef}
                className={`border border-violet-500/30 bg-(--bg) relative w-full h-full transform rounded-2xl shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all duration-200 ${
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
                <div className="flex items-center justify-between p-3 sm:p-4">
                    <div className="flex items-center">
                        <h3 className="text-xl font-bold">{title}</h3>
                    </div>

                    <button
                        type="button"
                        aria-label="Cerrar diálogo"
                        onClick={onClose}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md cursor-pointer hover:border hover:border-violet-500/50 hover:text-violet-400"
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

                {/* CARRUSEL */}
                <div className="px-4 flex flex-col">
                    <div
                        className="relative h-64 overflow-hidden rounded-lg border border-violet-500/20 bg-(--surface) select-none cursor-grab active:cursor-grabbing touch-pan-y"
                        onPointerDown={(e) => {
                            dragStartX.current = e.clientX;
                            setDragging(true);
                        }}
                        onPointerMove={(e) => {
                            if (dragStartX.current !== null) setDragOffset(e.clientX - dragStartX.current);
                        }}
                        onPointerUp={(e) => {
                            if (dragStartX.current !== null) {
                                const offset = e.clientX - dragStartX.current;
                                if (Math.abs(offset) > 48) goTo(offset < 0 ? current + 1 : current - 1);
                            }
                            dragStartX.current = null;
                            setDragging(false);
                            setDragOffset(0);
                        }}
                        onPointerLeave={() => {
                            dragStartX.current = null;
                            setDragging(false);
                            setDragOffset(0);
                        }}
                    >
                        <div
                            className={`flex h-full ${dragging ? "" : "transition-transform duration-500 ease-out"}`}
                            style={{
                                transform: `translateX(calc(${-current * 100}% + ${dragging ? dragOffset : 0}px))`,
                            }}
                        >
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={altImage}
                                    className="h-full w-full shrink-0 object-cover"
                                    draggable={false}
                                />
                            ))}
                        </div>

                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    aria-label={t("projects_prev")}
                                    onClick={() => goTo(current - 1)}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 ${arrowButtonClass}`}
                                >
                                    <BiChevronLeft size={28} />
                                </button>

                                <button
                                    type="button"
                                    aria-label={t("projects_next")}
                                    onClick={() => goTo(current + 1)}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 ${arrowButtonClass}`}
                                >
                                    <BiChevronRight size={28} />
                                </button>

                                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            aria-label={t("projects_image", {
                                                n: String(i + 1),
                                                total: String(images.length),
                                            })}
                                            onClick={() => goTo(i)}
                                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                                i === current
                                                    ? "w-6 bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                                                    : "w-2 bg-violet-500/30 hover:bg-violet-500/60"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* CONTENIDO */}
                <div className="px-4 py-8 flex flex-col items-start gap-4 overflow-auto">
                    <p className="font-semibold">{description}</p>
                    <ul className="flex flex-col sm:flex-row gap-4">
                        {technologies.map((tech) => (
                            <li key={tech.id} className="flex items-center gap-1">
                                {tech.icon}
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};