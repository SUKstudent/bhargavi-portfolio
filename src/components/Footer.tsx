import { site } from '../config/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Designed and built by Bhargavi</strong>
        <span>An ongoing collection of analytical work.</span>
      </div>
      <div className="foot-links">
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  )
}
