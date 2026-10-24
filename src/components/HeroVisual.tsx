import { Component, lazy, Suspense, useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import DashboardStack from './DashboardStack'

// The 3D code is a separate download, fetched only after the page is ready.
const DataScene = lazy(() => import('./DataScene'))

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

// If anything in the 3D scene fails, show nothing extra: the CSS dashboard stays.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

export default function HeroVisual() {
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)
  const [stackGone, setStackGone] = useState(false)

  // Start loading the 3D scene once the browser is idle (and only if WebGL exists)
  useEffect(() => {
    if (!hasWebGL()) return
    const w = window as IdleWindow
    const start = () => setLoad(true)
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 1500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(start, 400)
    return () => window.clearTimeout(t)
  }, [])

  // After the 3D scene has faded in, remove the CSS version
  useEffect(() => {
    if (!ready) return
    const t = window.setTimeout(() => setStackGone(true), 900)
    return () => window.clearTimeout(t)
  }, [ready])

  const onReady = useCallback(() => setReady(true), [])

  return (
    <div
      className="visual"
      role="img"
      aria-label="Decorative 3D dashboard graphic: a line chart, a bar chart with one dashed empty slot, and a donut chart"
    >
      {!stackGone && <DashboardStack />}
      {load && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <DataScene onReady={onReady} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  )
}
