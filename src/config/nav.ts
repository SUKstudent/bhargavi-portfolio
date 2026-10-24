export interface NavItem {
  id: string
  label: string
  heading?: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills', heading: 'Technical skills.' },
  { id: 'projects', label: 'Projects', heading: 'Selected investigations.' },
  { id: 'experience', label: 'Experience', heading: 'Experience, in practice.' },
  { id: 'education', label: 'Education', heading: 'Academic background.' },
  { id: 'certifications', label: 'Certifications', heading: 'Learning and credentials.' },
  { id: 'achievements', label: 'Achievements', heading: 'Recognition.' },
  { id: 'contact', label: 'Contact', heading: 'Continue the conversation.' },
]
