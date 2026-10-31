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
      <section className="project-viewer" aria-live="polite">
        <div className="image-frame">
          <button
            type="button"
            className="project-art project-art--clickable"
            key={`${project.id}-${imageIndex}`}
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Ver imagen a pantalla completa"
          >
            <img src={currentImage} alt={altImage ?? title} />

            <div className="image-placeholder">
              <span className="placeholder-eyebrow">
                Vista previa del proyecto
              </span>

              <strong>{title}</strong>

              <span>
                Añade la captura en{" "}
                <code>public{currentImage}</code>
              </span>
            </div>

            <span className="art-index">
              {String(imageIndex + 1).padStart(2, "0")}
              {" / "}
              {String(imageCount).padStart(2, "0")}
            </span>
          </button>
        </div>

        <div className="project-description">
          <div className="project-kicker">
            {technologies.map((tech) => tech.name).join(", ")}
          </div>

          <h2>{title}</h2>

          <p className="line-clamp-3">{project.description}</p>

          <div className="project-tags">
            {project.technologies.map((technology) => (
              <span className="project-tag" key={technology.id}>
                {technology.name}
              </span>
            ))}
          </div>

          {(project.urlGithub || project.urlProd) && (
            <div className="project-links">
              {project.urlGithub && (
                <div className="flex items-center gap-4">
                  <FiGithub />
                  <a href={project.urlGithub} target="_blank" rel="noreferrer">
                    Código fuente
                  </a>
                </div>
              )}

              {project.urlProd && (
                <div className="flex items-center gap-4">
                  <FiExternalLink />
                  <a href={project.urlProd} target="_blank" rel="noreferrer">
                    Ver proyecto
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <ProjectNavigation activeIndex={imageIndex} total={imageCount} onPrevious={handlePreviousImage} onNext={handleNextImage} />
      </section>

      <ImageLightbox images={images} currentIndex={imageIndex} alt={altImage ?? title} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} onPrevious={handlePreviousLightbox} onNext={handleNextLightbox}
      />
    </>
  );
}