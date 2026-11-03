import { useEffect, useState } from "react";
import type { Project } from "../../types";
import { ProjectNavigation } from "./ProjectNavigation";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { ImageLightbox } from "./ImageLightbox";

interface ProjectViewerProps {
  project: Project;
}

export function ProjectViewer({ project }: ProjectViewerProps) {
  const { title, altImage, technologies } = project;
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setImageIndex(0);
    setIsLightboxOpen(false);
  }, [project.id]);

  const currentImage = images[imageIndex] ?? project.image;
  const imageCount = images.length;

  const handlePreviousImage = () => {
    setImageIndex((current) => Math.max(0, current - 1));
  };

  const handleNextImage = () => {
    setImageIndex((current) => Math.min(imageCount - 1, current + 1));
  };

  const handlePreviousLightbox = () => {
    setImageIndex((current) => Math.max(0, current - 1));
  };

  const handleNextLightbox = () => {
    setImageIndex((current) => Math.min(imageCount - 1, current + 1));
  };

  return (
    <>
      <section className="flex h-full flex-col gap-4 min-h-0" aria-live="polite">
        <div className="relative flex-1 min-h-0">
          <div className="relative h-full w-full overflow-hidden border border-white/10 bg-black">
            <button
              type="button"
              className="relative h-full w-full"
              key={`${project.id}-${imageIndex}`}
              onClick={() => setIsLightboxOpen(true)}
              aria-label="Ver imagen a pantalla completa"
            >
              <img src={currentImage} alt={altImage ?? title} className="h-full w-full object-contain" />

              <div className="image-placeholder">
                <span className="placeholder-eyebrow">Vista previa del proyecto</span>
                <strong>{title}</strong>
                <span>
                  Añade la captura en{" "}
                  <code>public{currentImage}</code>
                </span>
              </div>
            </button>

            {imageCount > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
                <ProjectNavigation
                  activeIndex={imageIndex}
                  total={imageCount}
                  onPrevious={handlePreviousImage}
                  onNext={handleNextImage}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="project-kicker">
            {technologies.map((tech) => tech.name).join(", ")}
          </div>

          <h2 className="text-2xl font-bold text-white">{title}</h2>

          <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>

          <div className="project-tags flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span className="project-tag flex items-center gap-2" key={technology.id}>
                {technology.icon}
                {technology.name}
              </span>
            ))}
          </div>

          {(project.urlGithub || project.urlProd) && (
            <div className="project-links flex flex-wrap gap-3">
              {project.urlGithub && (
                <a
                  href={project.urlGithub}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:bg-white/5 transition-all"
                >
                  <FiGithub />
                  Código fuente
                </a>
              )}

              {project.urlProd && (
                <a
                  href={project.urlProd}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:bg-white/5 transition-all"
                >
                  <FiExternalLink />
                  Ver proyecto
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <ImageLightbox
        images={images}
        currentIndex={imageIndex}
        alt={altImage ?? title}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onPrevious={handlePreviousLightbox}
        onNext={handleNextLightbox}
      />
    </>
  );
}