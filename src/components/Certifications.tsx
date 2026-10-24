import { certifications } from '../data/certifications'
import Reveal from './Reveal'

const isUrl = (u?: string) => !!u && /^https?:\/\//i.test(u)

export default function Certifications() {
  // Only credentials that have genuinely been awarded are shown
  const awarded = certifications.filter((c) => c.issued)
  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <div className="wrap">
        <h2 id="certifications-title">Learning and credentials.</h2>
        <ul className="certs">
          {awarded.map((c) => (
            <Reveal key={c.id} as="li" className="cert">
              <span className="cert-n" aria-hidden="true">{c.number}</span>
              <div>
                <h3>{c.title}</h3>
                {c.issuer && <p className="cert-issuer">{c.issuer}</p>}
                {isUrl(c.credentialUrl) && (
                  <a className="btn small" href={c.credentialUrl} target="_blank" rel="noopener noreferrer">
                    Verify credential
                  </a>
                )}
              </div>
              <span className="cert-date">{c.date}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
