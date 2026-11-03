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
      <section className="project-detail-view flex h-full flex-col gap-4 min-h-0" aria-live="polite">
        <div className="project-detail-stage relative flex-1 min-h-0">
          <div className="project-detail-image-frame relative h-full w-full overflow-hidden border border-white/10 bg-black">
            <button
              type="button"
              className="project-detail-image-trigger relative h-full w-full"
              key={`${project.id}-${imageIndex}`}
              onClick={() => setIsLightboxOpen(true)}
              aria-label="Ver imagen a pantalla completa"
            >
              <img src={currentImage} alt={altImage ?? title} className="project-detail-image h-full w-full object-contain" />

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

        <div className="project-detail-info flex flex-col justify-between gap-4">

          <div className="flex flex-col gap-1">
            <h2 className="project-detail-title text-2xl font-bold text-white">{title}</h2>
            <p className="project-detail-description text-sm text-white/80">{project.description}</p>
          </div>
        

          <div className="project-tags flex flex-wrap justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
              <span className="project-tag flex items-center gap-2 transition duration-300 hover:-translate-y-1" key={technology.id}>
                <span>{technology.icon}</span>
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
                  className="btn-ghost flex items-center gap-2 px-4 py-2 text-sm"
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
                  className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <FiExternalLink />
                  Ver proyecto
                </a>
              )}
            </div>
          )}
          </div>
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