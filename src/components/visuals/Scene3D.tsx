import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/cn'

/**
 * Live WebGL hero centerpiece (replaces the CSS <Orb /> poster on capable
 * devices). Built from five clearly separated pieces:
 *   1. מצלמה  — PerspectiveCamera
 *   2. אור     — <Lights />
 *   3. כדור    — <Sphere />  (glowing distorted core)
 *   4. גלוב    — <Globe />   (rotating wireframe shell around the core)
 *   5. חלקיקים — <Particles /> (drifting point field)
 *
 * Palette matches the site: cyan #6ae3ff, blue #4f7bff, violet #8b5cf6,
 * magenta #e0119d.
 */

/* 3 — כדור: the inner core, a soft distorted sphere that breathes + spins */
function Sphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.15
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <MeshDistortMaterial
          color="#4f7bff"
          emissive="#6ae3ff"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.6}
          distort={0.32}
          speed={1.6}
        />
      </mesh>
    </Float>
  )
}

/* 4 — גלוב: a translucent wireframe shell orbiting the core in reverse */
function Globe() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y -= dt * 0.08
    ref.current.rotation.x += dt * 0.03
  })
  return (
    <mesh ref={ref} scale={1.7}>
      <sphereGeometry args={[1, 32, 24]} />
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.18} />
    </mesh>
  )
}

/* 5 — חלקיקים: a field of points slowly rotating around the scene */
function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // distribute on a fuzzy spherical shell
      const r = 3.2 + Math.random() * 2.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#6ae3ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* 2 — אור: rim + key + fill so the core reads as a glowing 3D object */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 5]} intensity={120} color="#6ae3ff" />
      <pointLight position={[-5, -2, 2]} intensity={90} color="#e0119d" />
      <directionalLight position={[0, 4, 2]} intensity={0.8} color="#ffffff" />
    </>
  )
}

export function Scene3D({ className }: { className?: string }) {
  return (
    <div className={cn('relative aspect-square w-full max-w-[560px]', className)}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* 1 — מצלמה */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

        <Lights />
        <Sphere />
        <Globe />
        <Particles />

        {/* drag to rotate — zoom/pan disabled so the layout stays put.
            gentle auto-spin that pauses while the user is interacting,
            with a soft vertical clamp so the core never flips upside down. */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
    </div>
  )
}
