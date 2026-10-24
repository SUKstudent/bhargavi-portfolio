import { useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import TagList from './TagList'

const isUrl = (u: string) => /^https?:\/\//i.test(u)

function Preview({ p }: { p: Project }) {
  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
  }
  const leave = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty('--rx')
    e.currentTarget.style.removeProperty('--ry')
  }
  return p.image ? (
    <div className="pv" onPointerMove={move} onPointerLeave={leave}>
      <img src={p.image} alt={`Dashboard screenshot: ${p.title}`} loading="lazy" />
    </div>
  ) : (
    <div
      className={`pv ${p.motif}`}
      role="img"
      aria-label={`Abstract illustration for ${p.title}. Not a real result.`}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <span className="tag">Illustration only</span>
    </div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <h2 id="projects-title">Selected investigations.</h2>
        <p className="sub">
          Six projects. Different datasets. One consistent focus on understanding what the evidence can show.
        </p>
        <div className="proj-list">
          {projects.map((p) => (
            <Reveal key={p.id} as="article" className="proj">
              <Preview p={p} />
              <div className="pi">
                <div className="num" aria-hidden="true">{p.number}</div>
                <p className="cat">{p.category}</p>
                <h3>{p.title}</h3>
                <p className="desc">{p.description}</p>
                <TagList items={p.technologies} />
                <div className="row">
                  <button
                    type="button"
                    className="btn primary"
                    aria-haspopup="dialog"
                    aria-label={`View Details: ${p.title}`}
                    onClick={() => setSelected(p)}
                  >
                    View Details
                  </button>
                  {isUrl(p.url) && (
                    <a className="btn" href={p.url} target="_blank" rel="noopener noreferrer">
                      View Project <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
