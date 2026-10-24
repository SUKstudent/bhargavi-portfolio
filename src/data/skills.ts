export interface SkillGroup {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { title: 'Programming', items: ['Python'] },
  { title: 'Data Analysis', items: ['Pandas', 'Data Cleaning', 'Data Wrangling', 'Exploratory Data Analysis (EDA)'] },
  {
    title: 'Business Intelligence and Visualization',
    items: ['Power BI', 'DAX', 'Power Query', 'Dashboard Development', 'Data Visualization'],
  },
  { title: 'Tools and Platforms', items: ['Google Colab', 'Streamlit', 'IBM Bob', 'Google Antigravity'] },
]
