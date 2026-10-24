import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const LIME = '#c8f03c'
const PAPER = '#f2efe8'
const PLATE = '#202225'
const BASE_X = 0.2
const BASE_Y = -0.4

// Decorative values only. They are NOT real project results.
const BAR_HEIGHTS = [0.7, 1.0, 0.55, 1.3, 0.95, 1.5, 1.2]
const TREND: [number, number][] = [
  [-2.3, -0.55], [-1.8, -0.3], [-1.3, -0.42], [-0.8, 0.05], [-0.3, -0.08],
  [0.2, 0.4], [0.7, 0.22], [1.2, 0.7], [1.7, 0.55], [2.3, 0.95],
]

function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

/** A flat slab with faint outlined edges: the base "panel" of the dashboard. */
function Plate({ w, h, d, position, color = PLATE }: {
  w: number; h: number; d: number; position: [number, number, number]; color?: string
}) {
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])
  useEffect(() => () => edges.dispose(), [edges])
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.25} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={PAPER} transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

/** Slow vertical drift for floating elements. */
function Floaty({ children, amp, speed, phase, still }: {
  children: ReactNode; amp: number; speed: number; phase: number; still: boolean
}) {
  const g = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (still || !g.current) return
    g.current.position.y = Math.sin(s.clock.elapsedTime * speed + phase) * amp
  })
  return <group ref={g}>{children}</group>
}

function Bar({ x, h, delay, lime, still }: { x: number; h: number; delay: number; lime: boolean; still: boolean }) {
  const g = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (still || !g.current) return
    const t = Math.min(1, Math.max(0, (s.clock.elapsedTime - delay) / 1.1))
    g.current.scale.y = Math.max(0.001, 1 - Math.pow(1 - t, 3))
  })
  return (
    <group ref={g} position={[x, 0, 0]} scale={[1, still ? 1 : 0.001, 1]}>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[0.34, h, 0.34]} />
        <meshStandardMaterial
          color={lime ? LIME : PAPER}
          emissive={lime ? LIME : '#000000'}
          emissiveIntensity={lime ? 0.3 : 0}
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

/** Dashed outline where one bar is missing: the "what the numbers don't say" idea. */
function GhostBar({ x, h }: { x: number; h: number }) {
  const ref = useRef<THREE.LineSegments>(null)
  const geo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.34, h, 0.34)), [h])
  useLayoutEffect(() => { ref.current?.computeLineDistances() }, [geo])
  useEffect(() => () => geo.dispose(), [geo])
  return (
    <lineSegments ref={ref} geometry={geo} position={[x, h / 2, 0]}>
      <lineDashedMaterial color={LIME} dashSize={0.06} gapSize={0.05} />
    </lineSegments>
  )
}

function BarChart({ still }: { still: boolean }) {
  return (
    <group position={[-0.6, -0.64, 0.5]}>
      {BAR_HEIGHTS.map((h, i) => (
        <Bar key={i} x={(i - 3.5) * 0.5} h={h} delay={i * 0.08} lime={i === 3} still={still} />
      ))}
      <GhostBar x={(7 - 3.5) * 0.5} h={1.3} />
    </group>
  )
}

function Trend() {
  const geo = useMemo(() => {
    const pts = TREND.map(([x, y]) => new THREE.Vector3(x, y, 0))
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.022, 6, false)
  }, [])
  useEffect(() => () => geo.dispose(), [geo])
  return (
    <group position={[0.5, 1.1, -1.24]}>
      {[-0.9, -0.35, 0.2, 0.75].map((y) => (
        <mesh key={y} position={[0, y, -0.01]}>
          <boxGeometry args={[4.6, 0.008, 0.004]} />
          <meshBasicMaterial color={PAPER} transparent opacity={0.16} />
        </mesh>
      ))}
      <mesh geometry={geo}>
        <meshBasicMaterial color={LIME} />
      </mesh>
    </group>
  )
}

function Donut() {
  const segments = [
    { start: 0, len: 0.31, color: LIME },
    { start: 0.31, len: 0.33, color: PAPER },
    { start: 0.64, len: 0.36, color: '#5b5d5f' },
  ]
  return (
    <group>
      {segments.map((s) => (
        <mesh key={s.start} rotation={[0, 0, s.start * Math.PI * 2]}>
          <torusGeometry args={[0.52, 0.15, 10, 40, (s.len - 0.012) * Math.PI * 2]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color === LIME ? LIME : '#000000'}
            emissiveIntensity={s.color === LIME ? 0.25 : 0}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Small interface element: a floating "filter" card with three legend rows. */
function Chips() {
  const rows: { w: number; y: number; c: string; o: number }[] = [
    { w: 0.9, y: 0.18, c: LIME, o: 1 },
    { w: 0.6, y: 0, c: PAPER, o: 0.55 },
    { w: 0.75, y: -0.18, c: PAPER, o: 0.35 },
  ]
  return (
    <group position={[-1.9, 1.9, 0.3]}>
      <Plate w={1.5} h={0.7} d={0.04} position={[0, 0, 0]} color="#1d1f21" />
      {rows.map((r) => (
        <mesh key={r.y} position={[-0.55 + r.w / 2, r.y, 0.03]}>
          <boxGeometry args={[r.w, 0.07, 0.02]} />
          <meshBasicMaterial color={r.c} transparent opacity={r.o} />
        </mesh>
      ))}
    </group>
  )
}

function FloorGrid() {
  const ref = useRef<THREE.GridHelper>(null)
  useLayoutEffect(() => {
    const m = ref.current?.material as THREE.Material | undefined
    if (m) { m.transparent = true; m.opacity = 0.14 }
  }, [])
  return <gridHelper ref={ref} args={[9, 18, LIME, PAPER]} position={[0.3, -1.1, 0.2]} />
}

/** Whole composition. Follows the pointer gently (desktop only). */
function Rig({ children, interactive, still }: { children: ReactNode; interactive: boolean; still: boolean }) {
  const g = useRef<THREE.Group>(null)
  const pt = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!interactive) return
    const on = (e: PointerEvent) => {
      pt.current.x = e.clientX / window.innerWidth - 0.5
      pt.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [interactive])

  useFrame((s, dt) => {
    const r = g.current
    if (!r) return
    const idle = still ? 0 : Math.sin(s.clock.elapsedTime * 0.25) * 0.04
    r.rotation.y = THREE.MathUtils.damp(r.rotation.y, BASE_Y + pt.current.x * 0.2 + idle, 3, dt)
    r.rotation.x = THREE.MathUtils.damp(r.rotation.x, BASE_X + pt.current.y * 0.12, 3, dt)
  })

  return (
    <group ref={g} position={[-0.3, -0.5, 0]} rotation={[BASE_X, BASE_Y, 0]}>
      {children}
    </group>
  )
}

function Scene({ interactive, still }: { interactive: boolean; still: boolean }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color={LIME} />
      <pointLight position={[2.6, 0.6, 4]} intensity={14} distance={9} color={LIME} />
      <Rig interactive={interactive} still={still}>
        <FloorGrid />
        <Floaty amp={0.06} speed={0.45} phase={0} still={still}>
          <Plate w={5} h={2.8} d={0.08} position={[0.5, 1.0, -1.3]} />
          <Trend />
        </Floaty>
        <Plate w={4.4} h={0.12} d={2.4} position={[-0.6, -0.7, 0.5]} />
        <BarChart still={still} />
        <Floaty amp={0.09} speed={0.55} phase={1.5} still={still}>
          <Plate w={1.7} h={1.7} d={0.06} position={[2.5, -0.15, 1.7]} color="#1d1f21" />
          <group position={[2.5, -0.15, 1.76]}>
            <Donut />
          </group>
        </Floaty>
        <Floaty amp={0.07} speed={0.5} phase={3} still={still}>
          <Chips />
        </Floaty>
      </Rig>
    </>
  )
}

export default function DataScene({ onReady }: { onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)
  const calm = useMedia('(prefers-reduced-motion: reduce)')
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const wide = useMedia('(min-width: 801px)')

  // Pause rendering while the hero is off screen
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const created = useCallback(() => {
    setReady(true)
    onReady()
  }, [onReady])

  return (
    <div ref={wrap} className={`scene${ready ? ' scene-ready' : ''}`} aria-hidden="true">
      <Canvas
        frameloop={visible && !calm ? 'always' : 'demand'}
        dpr={[1, wide ? 2 : 1.5]}
        camera={{ position: [0, 0.9, 11], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        flat
        style={{ pointerEvents: 'none' }}
        onCreated={created}
      >
        <Scene interactive={fine && wide && !calm} still={calm} />
      </Canvas>
    </div>
  )
}
