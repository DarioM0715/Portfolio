import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectNavigationProps {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function ProjectNavigation({ activeIndex, total, onPrevious, onNext }: ProjectNavigationProps) {
  if (total <= 1) return null;

  return (
    <div className="project-pager bg-[#363636] rounded-4xl" aria-label="Navegación de imágenes">
      <button type="button" className="pager-button" aria-label="Imagen anterior" disabled={activeIndex === 0} onClick={onPrevious}>
        <ChevronLeft size={32} strokeWidth={4} />
      </button>

      <span className="project-counter" aria-live="polite">
        {String(activeIndex + 1).padStart(2, "0")}
        /
        {String(total).padStart(2, "0")}
      </span>

      <button type="button" className="pager-button" aria-label="Imagen siguiente" disabled={activeIndex === total - 1} onClick={onNext}>
        <ChevronRight size={32} strokeWidth={4} />
      </button>
    </div>
  );
}