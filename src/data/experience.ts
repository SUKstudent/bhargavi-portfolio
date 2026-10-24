export interface Experience {
  organization: string
  role: string
  program?: string
  duration: string
  mode?: string
  responsibilities: string[]
  technologies: string[]
}

export const experience: Experience[] = [
  {
    organization: 'BharatCares',
    role: 'Data Analyst Intern',
    program: 'IBM SkillsBuild Data Analytics with AI Internship Program 2026',
    duration: '17 August 2026 – 30 September 2026',
    mode: 'Online',
    responsibilities: [
      'Worked on a Space Mission Intelligence project using historical space mission data.',
      'Cleaned and preprocessed data.',
      'Conducted exploratory data analysis.',
      'Worked on predictive modeling for mission outcome prediction.',
      'Developed visualizations and a Power BI dashboard using DAX.',
      'Deployed the model through Streamlit.',
    ],
    technologies: ['Python', 'Pandas', 'Power BI', 'DAX', 'Machine Learning', 'Streamlit'],
  },
  {
    organization: 'Infotact Solutions',
    role: 'Data Analyst Intern',
    duration: 'May 2026 – July 2026',
    responsibilities: [
      'Collected, cleaned, and prepared datasets using Python and Pandas.',
      'Conducted exploratory data analysis.',
      'Developed Power BI dashboards to communicate analytical findings.',
      'Worked on practical data analytics and visualization tasks.',
    ],
    technologies: ['Python', 'Pandas', 'Power BI', 'Data Cleaning', 'EDA'],
  },
]
