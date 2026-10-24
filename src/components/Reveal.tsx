import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

type Wrapper = 'div' | 'article' | 'li'

// Fades content in once when it scrolls into view. Always visible with reduced motion.
export default function Reveal({ children, className = '', as = 'div' }: {
  children: ReactNode
  className?: string
  as?: Wrapper
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const Element = as as 'div'
  return (
    <Element ref={ref} className={`reveal ${className}`}>
      {children}
    </Element>
  )
}
