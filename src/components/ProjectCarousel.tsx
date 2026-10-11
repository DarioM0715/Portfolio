import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useLanguage } from "../context/LanguageContext";
import type { CarouselApi } from "./useCarousel";

export const arrowButtonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-(--bg)/80 text-violet-400 backdrop-blur-sm transition-all duration-150 hover:border-violet-500/60 hover:bg-violet-500/20 focus-visible:outline-2 focus-visible:outline-violet-500 cursor-pointer";

type ProjectCarouselProps = CarouselApi & {
    images: string[];
    alt: string;
    className?: string;
};

export const ProjectCarousel = ({
    images,
    alt,
    className = "",
    current,
    dragging,
    dragOffset,
    goTo,
    dragHandlers,
}: ProjectCarouselProps) => {
    const { t } = useLanguage();

    return (
        <div
            className={`relative overflow-hidden rounded-lg border border-violet-500/20 bg-(--surface) select-none touch-pan-y ${className}`}
            {...dragHandlers}
        >
            <div
                className={`flex h-full ${dragging ? "" : "transition-transform duration-500 ease-out"}`}
                style={{
                    transform: `translateX(calc(${-current * 100}% + ${dragging ? dragOffset : 0}px))`,
                }}
            >
                {images.map((img, i) => (
                    <img key={i} src={img} alt={alt} className="h-full w-full shrink-0 object-contain" draggable={false}
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
                                key={i} type="button"
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
    );
};
