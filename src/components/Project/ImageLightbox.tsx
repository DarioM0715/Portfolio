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

export function ImageLightbox({
  images,
  currentIndex,
  alt = "",
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
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
    <div className="image-lightbox-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button type="button" className="image-lightbox-close" aria-label="Cerrar imagen a pantalla completa" 
        onClick={onClose}
      >
        <X size={28} strokeWidth={3} />
      </button>

      <div className="image-lightbox-content">
        {images.length > 1 && (
          <button type="button" className="image-lightbox-nav image-lightbox-nav--left" aria-label="Imagen anterior" disabled={currentIndex === 0} 
            onClick={onPrevious}
          >
            <ChevronLeft size={40} strokeWidth={3} />
          </button>
        )}

        <img src={currentImage} alt={alt} className="image-lightbox-img" onClick={(e) => e.stopPropagation()}/>

        {images.length > 1 && (
          <button type="button" className="image-lightbox-nav image-lightbox-nav--right" aria-label="Imagen siguiente" disabled={currentIndex === images.length - 1} 
            onClick={onNext}
          >
            <ChevronRight size={40} strokeWidth={3} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="image-lightbox-counter">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
