import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import TagList from './TagList'

const isUrl = (u: string) => /^https?:\/\//i.test(u)

// Uses the browser's built-in <dialog>: Escape closes it and keyboard focus stays inside.
export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (project && !d.open) d.showModal()
    if (!project && d.open) d.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {project && (
        <div className="modal-body">
          <button type="button" className="modal-x" onClick={onClose} aria-label="Close project details">
            Close
          </button>
          <p className="cat">
            {project.number} · {project.category}
          </p>
          <h3 id="modal-title">{project.title}</h3>
          {project.image && (
            <img className="modal-img" src={project.image} alt={`Dashboard screenshot: ${project.title}`} />
          )}
          <p>{project.description}</p>
          <TagList items={project.technologies} />
          {isUrl(project.url) && (
            <a className="btn primary" href={project.url} target="_blank" rel="noopener noreferrer">
              View Project <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </dialog>
  )
}
