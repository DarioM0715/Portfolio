import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLockBodyScroll } from "../useLockBodyScroll";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function ImageLightbox({ images, currentIndex, alt = "", isOpen, onClose, onPrevious, onNext }: ImageLightboxProps) {
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onPrevious();
      }
      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/98"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className="absolute right-3 top-3 sm:right-6 sm:top-6 z-[10003] flex h-10 w-10 items-center justify-center border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white"
        aria-label="Cerrar imagen a pantalla completa"
        onClick={onClose}
      >
        <X size={22} />
      </button>

      <div className="relative flex h-[94vh] w-[96vw] items-center justify-center px-10 sm:px-16">
        {images.length > 1 && (
          <button
            type="button"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[10002] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border border-white/30 bg-black/70 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-black/70"
            aria-label="Imagen anterior"
            disabled={currentIndex === 0}
            onClick={onPrevious}
          >
            <ChevronLeft size={26} strokeWidth={2.5} />
          </button>
        )}

        <img src={currentImage} alt={alt} className="max-h-full max-w-full object-contain" onClick={(e) => e.stopPropagation()} />

        {images.length > 1 && (
          <button
            type="button"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[10002] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border border-white/30 bg-black/70 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-black/70"
            aria-label="Imagen siguiente"
            disabled={currentIndex === images.length - 1}
            onClick={onNext}
          >
            <ChevronRight size={26} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[10002] border border-white/25 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
          {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
