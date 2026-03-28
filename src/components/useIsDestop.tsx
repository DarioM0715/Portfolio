import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint = 1024): boolean {
    const [isDesktop, setIsDesktop] = useState<boolean>(() =>
        typeof window !== "undefined" ? window.innerWidth >= breakpoint : false,
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
        const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);

        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", handler as EventListener);
        } else {
            mq.addListener(handler);
        }

        setIsDesktop(mq.matches);

        return () => {
            if (typeof mq.removeEventListener === "function") {
                mq.removeEventListener("change", handler as EventListener);
            } else {
                mq.removeListener(handler);
            }
        };
    }, [breakpoint]);

    return isDesktop;
}
