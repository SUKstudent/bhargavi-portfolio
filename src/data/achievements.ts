export interface Achievement {
  number: string
  place: string
  event: string
  details: string[]
}

export const achievements: Achievement[] = [
  {
    number: '01',
    place: 'First Place',
    event: 'Inter College Technotsava.',
    details: ['PPT Presentation on “AI Trends Shaping the Future”.', 'LAEC, Gornaballi, Bidar.'],
  },
  {
    number: '02',
    place: 'Second Place',
    event: 'Brain Bytes Technical Quiz.',
    details: ['Part of IEEE Day Celebration 2025, Sharnbasva University, Kalaburagi.'],
  },
  {
    number: '03',
    place: 'Third Place',
    event: 'Project Expo.',
    details: ['IETE Zonal Seminar and ISF Congress 2026, IETE Kalaburagi Centre, Sharnbasva University.'],
  },
]
