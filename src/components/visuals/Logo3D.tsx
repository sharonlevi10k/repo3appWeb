import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/cn'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

/** Lightweight static brand mark — used on touch devices and as a WebGL fallback. */
function StaticMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/company/imagelogSeaApp.png"
      alt="SeaApp logo"
      className={cn('object-contain', className)}
    />
  )
}

/**
 * 3D rendition of the SeaApp brand mark — the glossy multi-colour "molecule"
 * cluster (green → lime → orange → red → blue → magenta → purple).
 *
 * It's rebuilt as real geometry, NOT a flat image on a plane:
 *   • each colour blob = a glossy sphere (node)
 *   • each connecting neck = a capsule (bond) tinted between its two nodes
 *   • clearcoat + a procedural Lightformer environment give the wet, reflective
 *     look of the original logo.
 * The cluster gently oscillates so it always faces the viewer, and can be
 * dragged to inspect in full 3D.
 */

type Node = { p: [number, number, number]; c: string }

// Node layout + palette approximate the brand mark's swirl (centred on origin).
const NODES: Node[] = [
  { p: [-2.2, 0.4, 0.1], c: '#39b54a' }, // 0 green
  { p: [-1.25, 1.15, -0.1], c: '#8dc63f' }, // 1 lime
  { p: [-1.55, -0.45, 0.15], c: '#f7941e' }, // 2 orange
  { p: [-0.95, -1.4, 0.0], c: '#f0392b' }, // 3 red
  { p: [-0.2, 1.3, 0.1], c: '#29abe2' }, // 4 blue (top)
  { p: [0.2, 0.1, 0.2], c: '#1c75bc' }, // 5 blue (core)
  { p: [-0.05, -1.05, -0.1], c: '#2e6fd6' }, // 6 blue (bottom)
  { p: [1.35, -0.45, 0.1], c: '#ec008c' }, // 7 magenta
  { p: [1.0, -1.5, -0.05], c: '#92278f' }, // 8 purple
  { p: [1.45, 0.95, 0.0], c: '#27aae1' }, // 9 blue (right)
]

// Which nodes are joined by a glossy neck.
const BONDS: [number, number][] = [
  [0, 1], [0, 2], [2, 3], [1, 4], [4, 5], [5, 2],
  [5, 6], [6, 3], [5, 9], [9, 7], [7, 8], [6, 7],
]

const NODE_R = 0.46
const BOND_R = 0.24

const Y_AXIS = new THREE.Vector3(0, 1, 0)

/** A glossy "wet plastic" material shared shape, tinted per call. */
function glossy(color: THREE.ColorRepresentation) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.18}
      metalness={0.05}
      clearcoat={1}
      clearcoatRoughness={0.12}
      envMapIntensity={1.1}
      sheen={0.4}
    />
  )
}

function Bond({ a, b }: { a: Node; b: Node }) {
  const { position, quaternion, length, color } = useMemo(() => {
    const va = new THREE.Vector3(...a.p)
    const vb = new THREE.Vector3(...b.p)
    const dir = new THREE.Vector3().subVectors(vb, va)
    const len = dir.length()
    const q = new THREE.Quaternion().setFromUnitVectors(Y_AXIS, dir.clone().normalize())
    const mid = new THREE.Vector3().addVectors(va, vb).multiplyScalar(0.5)
    const col = new THREE.Color(a.c).lerp(new THREE.Color(b.c), 0.5)
    return { position: mid, quaternion: q, length: len, color: col }
  }, [a, b])

  return (
    <mesh position={position} quaternion={quaternion}>
      {/* length overlaps slightly into both spheres so it reads as one fused blob */}
      <capsuleGeometry args={[BOND_R, length, 8, 24]} />
      {glossy(color)}
    </mesh>
  )
}

function LogoMesh() {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // gentle oscillation — always faces forward, never edge-on
    group.current.rotation.y = Math.sin(t * 0.5) * 0.5
    group.current.rotation.x = Math.cos(t * 0.4) * 0.12
  })

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={group} scale={0.82}>
        {BONDS.map(([i, j], k) => (
          <Bond key={`b${k}`} a={NODES[i]} b={NODES[j]} />
        ))}
        {NODES.map((n, i) => (
          <mesh key={`n${i}`} position={n.p}>
            <sphereGeometry args={[NODE_R, 48, 48]} />
            {glossy(n.c)}
          </mesh>
        ))}
      </group>
    </Float>
  )
}

/** Faint coloured points drifting behind the mark for depth. */
function Particles({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + (i % 30) * 0.06
      const theta = (i * 2.39996) % (Math.PI * 2) // golden-angle spread
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi) - 2
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6ae3ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * Compact badge version for the navbar — the SAME logo mesh + animation,
 * just framed tighter and without particles / drag controls. Meant to be
 * sized small (e.g. h-9 w-9) by its parent.
 */
export function LogoMark({ className }: { className?: string }) {
  // iOS Safari (and touch devices generally) are fragile with WebGL — a tiny
  // navbar/footer canvas can fail to init and, uncaught, blank the whole app.
  // So default to the static mark and only upgrade to the 3D canvas on
  // fine-pointer (desktop) devices; even then, an ErrorBoundary falls back.
  const [use3D, setUse3D] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setUse3D(true)
  }, [])

  if (!use3D) return <StaticMark className={className} />

  return (
    <div className={cn('relative', className)}>
      <ErrorBoundary fallback={<StaticMark className="absolute inset-0 h-full w-full" />}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          {/* pulled in a touch so the cluster fills the tiny frame */}
          <PerspectiveCamera makeDefault position={[0, 0, 5.4]} fov={45} />

          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={1.4} />
          <pointLight position={[-5, -2, 3]} intensity={30} color="#ec008c" />
          <pointLight position={[5, 3, 4]} intensity={30} color="#29abe2" />

          <Environment resolution={128}>
            <Lightformer intensity={2} position={[0, 3, 4]} scale={[8, 3, 1]} color="#ffffff" />
            <Lightformer intensity={1.2} position={[-4, 0, 2]} scale={[3, 6, 1]} color="#9bd6ff" />
            <Lightformer intensity={1.2} position={[4, -1, 2]} scale={[3, 6, 1]} color="#ffc4ec" />
          </Environment>

          <LogoMesh />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

export function Logo3D({ className }: { className?: string }) {
  return (
    <div className={cn('relative aspect-square w-full max-w-[560px]', className)}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        {/* camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

        {/* lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-5, -2, 3]} intensity={40} color="#ec008c" />
        <pointLight position={[5, 3, 4]} intensity={40} color="#29abe2" />

        {/* procedural reflections — no network download, drives the clearcoat sheen */}
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 3, 4]} scale={[8, 3, 1]} color="#ffffff" />
          <Lightformer intensity={1.2} position={[-4, 0, 2]} scale={[3, 6, 1]} color="#9bd6ff" />
          <Lightformer intensity={1.2} position={[4, -1, 2]} scale={[3, 6, 1]} color="#ffc4ec" />
        </Environment>

        <Particles />
        <LogoMesh />

        {/* drag to inspect; no zoom/pan so the layout stays put */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
    </div>
  )
}
