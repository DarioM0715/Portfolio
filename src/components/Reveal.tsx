import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type RevealOffset = "up" | "down" | "left" | "right" | "zoom";
type RevealTag = "div" | "section" | "article" | "aside" | "header" | "footer" | "li" | "span";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    offset?: RevealOffset;
    as?: RevealTag;
    ariaHidden?: boolean;
    ariaLabel?: string;
    onClick?: () => void;
}

export function Reveal({
    children,
    className = "",
    delay = 0,
    offset = "up",
    as = "div",
    ariaHidden,
    ariaLabel,
    onClick,
}: RevealProps) {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (typeof IntersectionObserver === "undefined" || prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        let firstFrame = 0;
        let secondFrame = 0;
        let fallbackTimer = 0;
        let revealed = false;

        const applyVisible = () => {
            if (revealed) return;
            revealed = true;
            window.clearTimeout(fallbackTimer);
            setIsVisible(true);
        };

        // Si el elemento ya está en pantalla al montar (por ejemplo, al recargar
        // la página con el scroll restaurado en esa sección), el observer dispara
        // antes de que el navegador pinte el estado oculto. Esperamos dos frames
        // para que ese estado se pinte y la transición sí se ejecute.
        // El timeout es un respaldo por si los frames están pausados (pestaña
        // oculta u ocluida) para que el contenido nunca quede invisible.
        const reveal = () => {
            firstFrame = requestAnimationFrame(() => {
                secondFrame = requestAnimationFrame(applyVisible);
            });
            fallbackTimer = window.setTimeout(applyVisible, 150);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    reveal();
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -64px 0px" },
        );

        observer.observe(node);

        return () => {
            cancelAnimationFrame(firstFrame);
            cancelAnimationFrame(secondFrame);
            window.clearTimeout(fallbackTimer);
            observer.disconnect();
        };
    }, []);

    return createElement(
        as,
        {
            ref,
            className: `reveal reveal-${offset}${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`,
            style: { transitionDelay: `${delay}ms` },
            ...(ariaHidden !== undefined ? { "aria-hidden": ariaHidden } : {}),
            ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
            ...(onClick ? { onClick } : {}),
        },
        children,
    );
}
