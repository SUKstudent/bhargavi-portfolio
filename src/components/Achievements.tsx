import { Trophy } from 'lucide-react'
import { achievements } from '../data/achievements'
import Reveal from './Reveal'

export default function Achievements() {
  return (
    <section id="achievements" className="section" aria-labelledby="achievements-title">
      <div className="wrap">
        <h2 id="achievements-title">Recognition.</h2>
        <div className="tl">
          {achievements.map((a) => (
            <Reveal key={a.number} className="award">
              <div className="award-n">
                <Trophy size={22} aria-hidden="true" />
                <span>{a.number}</span>
              </div>
              <div>
                <h3>{a.place}</h3>
                <p className="event">{a.event}</p>
                {a.details.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
