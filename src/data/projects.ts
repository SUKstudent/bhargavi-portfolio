// ============================================================
// PROJECTS: edit everything about the six projects here.
//  - image: path of a real screenshot inside /public (leave "" to show the abstract illustration)
//  - url:   a genuine link (GitHub, live demo...). Leave "" and the button stays hidden.
// ============================================================
export type Motif = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6'

export interface Project {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  image: string
  motif: Motif
  url: string
}

export const projects: Project[] = [
  {
    id: 'space-mission',
    number: '01',
    title: 'Space Mission Intelligence: Mission Outcome Prediction',
    category: 'Internship Project',
    description:
      'An analysis of historical space mission data covering mission outcomes, launch trends, rocket status, and mission distributions. The project involved cleaning and preprocessing data using Python and Pandas, exploratory data analysis, visualizations, a Power BI dashboard with DAX measures, and machine learning work for mission outcome prediction. The model was deployed through Streamlit.',
    technologies: ['Python', 'Pandas', 'EDA', 'Power BI', 'DAX', 'Machine Learning', 'Streamlit'],
    image: '/images/space-mission.jpg',
    motif: 'm1',
    url: '',
  },
  {
    id: 'customer-retention',
    number: '02',
    title: 'Customer Retention and Cohort Analysis',
    category: 'Internship Project',
    description:
      'An analysis of customer purchasing behavior and retention patterns across cohorts. The dashboard explores customer value, purchasing behavior, payment patterns, and retention trends.',
    technologies: ['Power BI', 'DAX', 'Power Query', 'Data Analysis', 'Data Visualization'],
    image: '/images/customer-retention.jpg',
    motif: 'm2',
    url: '',
  },
  {
    id: 'phonepe-pulse',
    number: '03',
    title: 'PhonePe Pulse Analysis',
    category: 'Self-Driven Project',
    description:
      'An exploration of PhonePe Pulse data focused on digital payment activity, transaction patterns, and geographic trends.',
    technologies: ['Python', 'Power BI', 'Data Analysis', 'Data Visualization'],
    image: '/images/phonepe.jpg',
    motif: 'm3',
    url: '',
  },
  {
    id: 'ibm-hr',
    number: '04',
    title: 'IBM HR Analytics',
    category: 'Self-Driven Project',
    description:
      'An analytical exploration of workforce data, employee attrition, and employee-related patterns using data analysis and visualization.',
    technologies: ['Python', 'Pandas', 'Power BI', 'Data Analysis', 'Data Visualization'],
    image: '/images/ibm-hr.jpg',
    motif: 'm4',
    url: '',
  },
  {
    id: 'loan-approval',
    number: '05',
    title: 'Loan Approval/Rejection Analysis',
    category: 'Self-Driven Project',
    description:
      'An exploration of loan application outcomes, examining available variables in relation to approval and rejection patterns. Focus on data analysis and visualization without making unsupported causal claims.',
    technologies: ['Python', 'Pandas', 'Data Analysis', 'Data Visualization'],
    image: '/images/loan-approval.jpg',
    motif: 'm5',
    url: '',
  },
  {
    id: 'paralympics',
    number: '06',
    title: 'Global Paralympics Dashboard',
    category: 'Power BI Course Assignment',
    description:
      'A Power BI dashboard created as part of a course assignment using a supplied, pre-cleaned CSV dataset. The project presents Paralympics-related data through visualizations designed to support exploration and comparison.',
    technologies: ['Power BI', 'Data Visualization', 'Dashboard Design'],
    image: '/images/paralympics.jpg',
    motif: 'm6',
    url: '',
  },
]
