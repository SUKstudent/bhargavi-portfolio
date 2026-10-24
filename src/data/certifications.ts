// ============================================================
// CERTIFICATIONS
//  - issued: true  -> shown on the site.
//            false -> hidden until the certificate has genuinely been awarded.
//  - credentialUrl: add a genuine verification link to show a "Verify" button.
// ============================================================
export interface Certification {
  id: string
  number: string
  title: string
  issuer?: string
  date: string
  issued: boolean
  credentialUrl?: string
}

export const certifications: Certification[] = [
  { id: 'python-101', number: '01', title: 'Python 101 for Data Science', issuer: 'IBM', date: 'December 2025', issued: true },
  { id: 'data-analysis-python', number: '02', title: 'Data Analysis with Python', issuer: 'IBM', date: 'December 2025', issued: true },
  { id: 'green-skills-ai', number: '03', title: 'Green Skills and Artificial Intelligence', issuer: 'Edunet Foundation', date: 'February 2026', issued: true },
  { id: 'advanced-data-analytics', number: '04', title: 'Advanced Certification in Data Analytics Program', date: 'March 2026', issued: true },
  { id: 'deloitte-simulation', number: '05', title: 'Deloitte Australia — Data Analytics Job Simulation', issuer: 'Deloitte', date: 'October 2026', issued: true },
  { id: 'ibm-skillsbuild-internship', number: '06', title: 'IBM SkillsBuild Data Analytics with AI Internship Program', issuer: 'BharatCares®', date: 'October 2026', issued: true },
]
