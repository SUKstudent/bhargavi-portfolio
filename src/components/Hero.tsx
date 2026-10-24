import HeroVisual from './HeroVisual'
import ResumeButton from './ResumeButton'

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-copy">
        <p className="descriptor">PYTHON / POWER BI / ANALYTICAL PROJECTS</p>
        <h1 id="hero-title">The interesting part is what the numbers don’t say.</h1>
        <p className="sub">A closer look at data, patterns, and the questions worth asking.</p>
        <div className="cta">
          <a className="btn primary" href="#projects">Explore the Work</a>
          <a className="btn" href="#contact">Get in Touch</a>
          <ResumeButton />
        </div>
      </div>
      <HeroVisual />
    </section>
  )
}
