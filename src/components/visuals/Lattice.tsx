import { useMemo } from 'react'
import { cn } from '@/lib/cn'

/**
 * About-section 3D scene — a wireframe node lattice (constellation), distinct
 * from the Hero orb. Real SVG render. Doubles as the Spline poster/fallback.
 */
export function Lattice({ className }: { className?: string }) {
  const { nodes, edges } = useMemo(() => {
    // deterministic pseudo-random layout (stable across renders)
    const seedNodes = [
      [50, 50], [22, 30], [78, 28], [18, 68], [82, 66],
      [38, 18], [64, 80], [30, 52], [70, 46], [50, 82], [50, 16],
    ]
    const n = seedNodes.map(([x, y]) => ({ x, y }))
    const e = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 7], [0, 8],
      [1, 5], [2, 5], [3, 9], [4, 6], [7, 3], [8, 4], [10, 1], [10, 2], [9, 6],
    ]
    return { nodes: n, edges: e }
  }, [])

  return (
    <div className={cn('relative aspect-square w-full max-w-[520px]', className)}>
      {/* ambient glow */}
      <div
        className="absolute inset-[18%] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)' }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <g stroke="rgba(120,200,255,0.35)" strokeWidth="0.3">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
          ))}
        </g>
        {nodes.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === 0 ? 2.4 : 1.2}
            fill={i === 0 ? '#ffffff' : '#8b5cf6'}
            className={i === 0 ? '' : 'animate-floaty-slow'}
            style={{ animationDelay: `${(i % 5) * 0.4}s` }}
          />
        ))}
      </svg>
      {/* core glow */}
      <div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(224,17,157,0.3) 50%, transparent 70%)' }}
      />
    </div>
  )
}
