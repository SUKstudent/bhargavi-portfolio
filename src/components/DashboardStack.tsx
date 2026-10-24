import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

const barHeights = [90, 130, 70, 160, 120, 190, 150]

// Decorative layered dashboard. Stage 4 builds the real 3D scene on top of this
// (this CSS version stays as the fallback). It shows no real data.
export default function DashboardStack() {
  const rig = useRef<HTMLDivElement>(null)

  // Gentle tilt toward the mouse. Skipped on touch devices and for reduced motion.
  useEffect(() => {
    const el = rig.current
    const hero = el?.closest('section')
    if (!el || !hero) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return

    let raf = 0
    const move = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = hero.getBoundingClientRect()
        el.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`)
        el.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`)
      })
    }
    const leave = () => {
      el.style.removeProperty('--tx')
      el.style.removeProperty('--ty')
    }
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', leave)
    return () => {
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="stage"
      role="img"
      aria-label="Decorative layered dashboard graphic: a line chart, a bar chart with one dashed empty slot, and a donut chart"
    >
      <div className="rig" ref={rig}>
        <div className="float">
          <div className="panel panel-back">
            <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 20H200M0 40H200M0 60H200" stroke="#f2efe8" strokeOpacity=".14" fill="none" vectorEffect="non-scaling-stroke" />
              <polyline points="0,62 25,50 50,56 75,34 100,40 125,22 150,30 175,10 200,16" fill="none" stroke="#c8f03c" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="panel panel-mid">
            <svg viewBox="0 0 400 260" aria-hidden="true">
              {barHeights.map((h, i) => (
                <rect
                  key={i}
                  className="chart-bar"
                  style={{ '--i': i } as CSSProperties}
                  x={i * 54 + 10}
                  y={250 - h}
                  width="36"
                  height={h}
                  fill={i === 3 ? '#c8f03c' : '#f2efe8'}
                  opacity={i === 3 ? 1 : 0.85}
                />
              ))}
              <rect x="334" y="70" width="36" height="180" fill="none" stroke="#c8f03c" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="0" y1="250.5" x2="400" y2="250.5" stroke="#f2efe8" opacity=".4" />
            </svg>
          </div>
          <div className="panel panel-front">
            <i className="donut" />
          </div>
        </div>
      </div>
    </div>
  )
}
