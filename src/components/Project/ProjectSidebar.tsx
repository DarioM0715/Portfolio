import type { Project } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

interface ProjectSidebarProps {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function ProjectSidebar({ projects, activeIndex, onSelect}: ProjectSidebarProps) {
  const { t } = useLanguage();
  return (
    <aside className="project-list relative flex flex-col min-h-0 w-full">
      <nav className="flex flex-col gap-1 overflow-y-auto pb-3" aria-label={t("projects_list_label")}>
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <button key={project.id} type="button" className={`project-link ${   isActive ? "active" : "" }`} 
            aria-current={isActive ? "true" : undefined} onClick={() => onSelect(index)}>
              <span>{project.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
