import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { site } from '../config/site'

let cached: Promise<boolean> | null = null

// True only if the file exists AND is really a PDF (not an error page).
function resumeExists(): Promise<boolean> {
  if (!site.resume) return Promise.resolve(false)
  if (!cached) {
    cached = fetch(site.resume, { method: 'HEAD' })
      .then((r) => r.ok && (r.headers.get('content-type') ?? '').toLowerCase().includes('pdf'))
      .catch(() => false)
  }
  return cached
}

export default function ResumeButton({ className = 'btn' }: { className?: string }) {
  const [available, setAvailable] = useState(false)
  useEffect(() => {
    let alive = true
    resumeExists().then((ok) => alive && setAvailable(ok))
    return () => {
      alive = false
    }
  }, [])
  if (!available) return null
  return (
    <a className={className} href={site.resume} download="Bhargavi_Resume.pdf">
      <Download size={18} aria-hidden="true" /> Download Resume
    </a>
  )
}
