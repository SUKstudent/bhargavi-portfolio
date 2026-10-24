import { experience } from '../data/experience'
import Reveal from './Reveal'
import TagList from './TagList'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <h2 id="experience-title">Experience, in practice.</h2>
        <div className="tl">
          {experience.map((x) => (
            <Reveal key={x.organization} className="it">
              <div className="w">
                {x.duration}
                {x.mode && (
                  <>
                    <br />
                    {x.mode}
                  </>
                )}
              </div>
              <div>
                <h3>{x.organization}</h3>
                <p className="role">{x.role}</p>
                {x.program && <p className="program">{x.program}</p>}
                <ul className="resp">
                  {x.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <TagList items={x.technologies} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
