// ============================================================
// SITE SETTINGS. Edit values here only.
// ============================================================

// EMAIL: put your real address below. If it is empty, or still
// "your-email@example.com", the email link is hidden everywhere.
const EMAIL_PLACEHOLDER = 'your-email@example.com'

export const site = {
  name: 'Bhargavi',
  email: 'patilabhinavsadanand@gmail.com',

  // RESUME: put your PDF in the "public" folder with this exact name.
  // The Download Resume button appears only if the file really exists.
  resume: '/Bhargavi_Resume.pdf',

  linkedin: 'https://www.linkedin.com/in/bhargavi-sadanand-a6250a3b4/',
  github: 'https://github.com/SUKstudent/',
}

const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const hasEmail =
  site.email.trim() !== '' &&
  site.email.trim() !== EMAIL_PLACEHOLDER &&
  looksLikeEmail.test(site.email.trim())
