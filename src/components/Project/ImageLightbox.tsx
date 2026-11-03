import { useEffect, useState } from "react";
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
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setIsDragging(false);
      setDeltaX(0);
    } else if (shouldRender) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender || isClosing) return;

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
  }, [shouldRender, isClosing, onClose, onPrevious, onNext]);

  if (!shouldRender || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleClose = () => {
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (images.length <= 1) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || images.length <= 1) return;
    setDeltaX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || images.length <= 1) return;
    setIsDragging(false);
    if (Math.abs(deltaX) > 60) {
      if (deltaX > 0 && currentIndex > 0) {
        onPrevious();
      } else if (deltaX < 0 && currentIndex < images.length - 1) {
        onNext();
      }
    }
    setDeltaX(0);
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/98 transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <button
        type="button"
        className="absolute right-3 top-3 sm:right-6 sm:top-6 z-[10003] flex h-10 w-10 items-center justify-center border border-white/25 text-white/80 transition-all duration-200 hover:border-white hover:text-white hover:scale-105 rounded-xl"
        aria-label="Cerrar imagen a pantalla completa"
        onClick={handleClose}
      >
        <X size={22} />
      </button>

      <div className={`relative flex h-[94vh] w-[96vw] items-center justify-center px-4 sm:px-16 transition-all duration-300 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        {images.length > 1 && (
          <button
            type="button"
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[10002] h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border border-white/30 bg-black/70 text-white transition-all duration-200 hover:bg-white/10 hover:scale-105 disabled:opacity-30 disabled:hover:bg-black/70 disabled:hover:scale-100"
            aria-label="Imagen anterior"
            disabled={currentIndex === 0}
            onClick={onPrevious}
          >
            <ChevronLeft size={26} strokeWidth={2.5} />
          </button>
        )}

        <div
          className="flex h-full w-full items-center justify-center touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={currentImage}
            alt={alt}
            className="max-h-full max-w-full object-contain select-none transition-transform duration-150"
            style={{ transform: isDragging ? `translateX(${deltaX}px)` : "translateX(0)" }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[10002] h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border border-white/30 bg-black/70 text-white transition-all duration-200 hover:bg-white/10 hover:scale-105 disabled:opacity-30 disabled:hover:bg-black/70 disabled:hover:scale-100"
            aria-label="Imagen siguiente"
            disabled={currentIndex === images.length - 1}
            onClick={onNext}
          >
            <ChevronRight size={26} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className={`absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[10002] border border-white/25 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.4em] transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}>
          {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
