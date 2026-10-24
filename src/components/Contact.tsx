import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { hasEmail, site } from '../config/site'
import ResumeButton from './ResumeButton'

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title">Continue the conversation.</h2>
        <p className="sub">For professional connections and a closer look at the work.</p>
        <div className="links">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
            <span className="lk"><Linkedin aria-hidden="true" /> LinkedIn</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">
            <span className="lk"><Github aria-hidden="true" /> GitHub</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          {/* Shown only when a genuine email is set in src/config/site.ts. The address itself is never printed. */}
          {hasEmail && (
            <a href={`mailto:${site.email.trim()}`}>
              <span className="lk"><Mail aria-hidden="true" /> Email</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
        <ResumeButton className="btn contact-resume" />
      </div>
    </section>
  )
}
