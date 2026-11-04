import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface ProjectNavigationProps {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function ProjectNavigation({ activeIndex, total, onPrevious, onNext }: ProjectNavigationProps) {
  const { t } = useLanguage();
  if (total <= 1) return null;

  return (
    <div className="project-pager bg-[#363636] rounded-4xl" role="group" aria-label={t("projects_image_navigation")}>
      <button type="button" className="pager-button" aria-label={t("projects_prev")} disabled={activeIndex === 0} onClick={onPrevious}>
        <ChevronLeft size={24} strokeWidth={4} />
      </button>

      <span className="project-counter" aria-live="polite">
        {String(activeIndex + 1).padStart(2, "0")}
        /
        {String(total).padStart(2, "0")}
      </span>

      <button type="button" className="pager-button" aria-label={t("projects_next")} disabled={activeIndex === total - 1} onClick={onNext}>
        <ChevronRight size={24} strokeWidth={4} />
      </button>
    </div>
  );
}