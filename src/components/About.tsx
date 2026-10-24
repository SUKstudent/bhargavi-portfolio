const highlights = [
  'Python & Data Analysis',
  'Power BI & DAX',
  'Exploratory Analysis',
  'Internship Projects',
]

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-grid">
          <h2 id="about-title">Behind the work.</h2>
          <div className="about-text">
            <p>
              I am a Computer Science and Engineering student currently pursuing my 7th semester,
              with a focus on Data Analytics and Data Science. My work includes data cleaning,
              exploratory analysis, customer retention analysis, dashboard development, and
              introductory machine learning projects.
            </p>
            <p>
              Through internships and independent projects, I have worked with Python, Pandas,
              Power BI, and DAX to examine datasets, build visualizations, and communicate
              analytical findings. I continue to develop my technical skills through practical work
              and structured learning.
            </p>
          </div>
        </div>
        <ul className="highlights">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
