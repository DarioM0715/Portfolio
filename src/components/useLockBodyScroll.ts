import { useEffect } from "react";

export function useLockBodyScroll(active: boolean) {
    useEffect(() => {
        if (!active) return;

        const { body, documentElement } = document;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = documentElement.style.overflow;

        body.style.overflow = "hidden";
        documentElement.style.overflow = "hidden";

        return () => {
            body.style.overflow = previousBodyOverflow;
            documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [active]);
}
