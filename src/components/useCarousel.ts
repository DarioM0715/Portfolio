import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

export type CarouselApi = {
    current: number;
    dragging: boolean;
    dragOffset: number;
    goTo: (index: number) => void;
    dragHandlers: {
        onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
        onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
        onPointerUp: (e: ReactPointerEvent<HTMLDivElement>) => void;
        onPointerLeave: () => void;
    };
};

export function useCarousel(count: number): CarouselApi {
    const [current, setCurrent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartX = useRef<number | null>(null);

    const goTo = (index: number) => setCurrent((index + count) % count);

    const reset = () => {
        dragStartX.current = null;
        setDragging(false);
        setDragOffset(0);
    };

    const dragHandlers = {
        onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
            dragStartX.current = e.clientX;
            setDragging(true);
        },
        onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => {
            if (dragStartX.current !== null) setDragOffset(e.clientX - dragStartX.current);
        },
        onPointerUp: (e: ReactPointerEvent<HTMLDivElement>) => {
            if (dragStartX.current !== null) {
                const offset = e.clientX - dragStartX.current;
                if (Math.abs(offset) > 48) goTo(offset < 0 ? current + 1 : current - 1);
            }
            reset();
        },
        onPointerLeave: () => reset(),
    };

    return { current, dragging, dragOffset, goTo, dragHandlers };
}
