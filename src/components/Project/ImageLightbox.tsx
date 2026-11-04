import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLockBodyScroll } from "../useLockBodyScroll";
import { useLanguage } from "../../context/LanguageContext";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  title: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function ImageLightbox({ images, currentIndex, title, alt, isOpen, onClose, onPrevious, onNext }: ImageLightboxProps) {
  const { t } = useLanguage();
  useLockBodyScroll(isOpen);
  const [shouldRender, setShouldRender] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const isClosing = !isOpen;

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setShouldRender(true);
        setIsDragging(false);
        setDeltaX(0);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || !shouldRender) return;

    const timeout = setTimeout(() => setShouldRender(false), 250);
    return () => clearTimeout(timeout);
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender || isClosing) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        onPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, isClosing, onClose, onPrevious, onNext]);

  if (!shouldRender || images.length === 0) return null;

  const currentImage = images[currentIndex] ?? images[0];
  const imagePosition = t("projects_image", {
    n: String(currentIndex + 1),
    total: String(images.length),
  });

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

  return createPortal(
    <div
      className={`image-lightbox-overlay transition-opacity duration-300 ${isClosing ? "is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-lightbox-title"
      data-image-lightbox="true"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <header className="image-lightbox-toolbar">
        <div className="image-lightbox-heading">
          <span>{t("image_lightbox_title")}</span>
          <h2 id="image-lightbox-title">{title}</h2>
        </div>
        <button
          type="button"
          className="image-lightbox-close"
          aria-label={t("projects_close")}
          onClick={handleClose}
        >
          <X size={21} />
        </button>
      </header>

      <div className="image-lightbox-stage">
        {images.length > 1 && (
          <button
            type="button"
            className="image-lightbox-nav image-lightbox-nav-previous"
            aria-label={t("projects_prev")}
            disabled={currentIndex === 0}
            onClick={onPrevious}
          >
            <ChevronLeft size={26} strokeWidth={2.5} />
          </button>
        )}

        <div
          className="image-lightbox-frame touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={currentImage}
            alt={alt}
            className="image-lightbox-img select-none transition-transform duration-150"
            style={{ transform: isDragging ? `translateX(${deltaX}px)` : "translateX(0)" }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            className="image-lightbox-nav image-lightbox-nav-next"
            aria-label={t("projects_next")}
            disabled={currentIndex === images.length - 1}
            onClick={onNext}
          >
            <ChevronRight size={26} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <footer className="image-lightbox-footer">
        <span className="image-lightbox-counter" aria-live="polite" aria-label={imagePosition}>
          <span>{String(currentIndex + 1).padStart(2, "0")}</span>
          <span aria-hidden="true">/</span>
          <span>{String(images.length).padStart(2, "0")}</span>
        </span>
      </footer>
    </div>,
    document.body,
  );
}
