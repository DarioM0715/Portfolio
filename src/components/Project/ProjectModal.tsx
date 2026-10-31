import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Project } from "../../types";
import { ProjectViewer } from "./ProjectViewer";
import { ProjectSidebar } from "./ProjectSidebar";
import { useLockBodyScroll } from "../useLockBodyScroll";

interface ProjectsModalProps {
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
  index: number;
  title?: string;
}

export function ProjectsModal({ projects, isOpen, onClose, title = "Proyectos", index = 0 }: ProjectsModalProps) {
  const [activeIndex, setActiveIndex] = useState(index);

  const total = projects.length;
  const activeProject = projects[activeIndex];

  useLockBodyScroll(isOpen)

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(Math.max(0, Math.min(index, total - 1)));
    }
  }, [isOpen, index, total]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => Math.max(0, current - 1));
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => Math.min(total - 1, current + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, total]);

  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(Math.max(0, total - 1));
    }
  }, [activeIndex, total]);

  if (!isOpen) return null;

  return (
    <div className="portfolio-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="portfolio-window zz-modal-animation" role="dialog" aria-modal="true" aria-label={title}>
        <header className="portfolio-topbar">
          <h1>{title}</h1>

          <button type="button" className="decorative-close" aria-label="Cerrar portafolio" onClick={onClose}>
            <X size={30} strokeWidth={4} />
          </button>
        </header>

        
        <div className="portfolio-content">
          <ProjectSidebar projects={projects} activeIndex={activeIndex} onSelect={setActiveIndex} />

          <ProjectViewer project={activeProject} />
        </div>
      </section>
    </div>
  );
}
