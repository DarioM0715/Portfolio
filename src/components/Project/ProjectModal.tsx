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
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const total = projects.length;
  const activeProject = projects[activeIndex];

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setActiveIndex(Math.max(0, Math.min(index, total - 1)));
    } else if (shouldRender) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 280);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, index, total]);

  useEffect(() => {
    if (!shouldRender || isClosing) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
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
  }, [shouldRender, isClosing, total]);

  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(Math.max(0, total - 1));
    }
  }, [activeIndex, total]);

  const handleClose = () => {
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`projects-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/98 px-4 sm:px-6 lg:px-10 transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className={`projects-modal modal-animation relative flex h-[95vh] w-full max-w-7xl flex-col overflow-hidden transition-all duration-300 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"} border-4xl m-4`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="projects-modal-header flex items-center justify-between gap-4 border-b border-white/10 px-2 pb-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.4em] text-white/40">{title}</span>
            <h1 className="text-lg sm:text-xl font-semibold text-white">{activeProject.title}</h1>
          </div>

          <button type="button" className="flex h-10 w-10 items-center justify-center cursor-pointer bg-black border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white" aria-label="Cerrar modal" onClick={handleClose}>
            <X size={20} />
          </button>
        </header>

        <div className="projects-modal-content mt-4 grid flex-1 min-h-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          <div className="projects-modal-main min-h-0">
            <ProjectViewer project={activeProject} />
          </div>
          <div className="projects-modal-sidebar hidden min-h-0 lg:flex">
            <ProjectSidebar projects={projects} activeIndex={activeIndex} onSelect={setActiveIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}
