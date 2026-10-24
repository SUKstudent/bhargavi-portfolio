import { skillGroups } from '../data/skills'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <h2 id="skills-title">Technical skills.</h2>
        <div className="sk">
          {skillGroups.map((g) => (
            <Reveal key={g.title} className="sk-row">
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
