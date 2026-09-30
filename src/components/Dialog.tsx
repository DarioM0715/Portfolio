import { useRef } from "react";
import { createPortal } from "react-dom";

export type DialogProps = {
    title: string;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    ariaLabel?: string;
};

export const Dialog = ({ title, children, open, onClose, ariaLabel = "Dialog" }: DialogProps) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const dialogRef = useRef<HTMLDivElement | null>(null);

    return createPortal(
        <div className={`text-(--text) fixed inset-0 z-50 flex items-center justify-center px-4 pt-6 ${open ? "" : "pointer-events-none"}`}>
            <div ref={overlayRef} className={`fixed inset-0 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
                onMouseDown={(e) => {
                    if (e.target === overlayRef.current) onClose();
                }}
            />
            <div
                role="dialog" aria-modal="true" aria-label={ariaLabel} ref={dialogRef}
                className={`border border-violet-500/30 bg-(--bg) relative z-50 mx-auto w-full max-w-2xl transform overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all duration-200 ${
                    open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                }`}
                onMouseDown={(e) => e.stopPropagation()}
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
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md cursor-pointer hover:border hover:border-gray-600"
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

                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body,
    );
};
