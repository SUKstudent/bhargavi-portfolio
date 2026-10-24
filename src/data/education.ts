// Education intentionally has NO fields for marks, percentages, CGPA or SGPA.
export interface Education {
  title: string
  institution?: string
  board?: string
  when: string
  note?: string
}

export const education: Education[] = [
  {
    title: 'Bachelor of Technology: Computer Science and Engineering',
    institution: 'Faculty of Engineering and Technology (Ex-Women), Sharnbasva University, Kalaburagi.',
    when: 'Currently Pursuing',
    note: '7th Semester',
  },
  { title: '2nd PUC / Class XII', board: 'Karnataka Board', when: '2023' },
  { title: 'SSLC / Class X', board: 'Karnataka Board', when: '2021' },
]
