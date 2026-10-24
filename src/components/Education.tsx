import { education } from '../data/education'
import Reveal from './Reveal'

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="wrap">
        <h2 id="education-title">Academic background.</h2>
        <div className="tl">
          {education.map((e) => (
            <Reveal key={e.title} className="it">
              <div className="w">
                {e.when}
                {e.note && (
                  <>
                    <br />
                    {e.note}
                  </>
                )}
              </div>
              <div>
                <h3>{e.title}</h3>
                {e.institution && <p className="role">{e.institution}</p>}
                {e.board && <p className="role">Board: {e.board}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
