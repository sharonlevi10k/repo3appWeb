import type { ReactNode } from 'react'
import { useCameraSection } from '@/hooks/useCameraSection'

/**
 * Non-invasive wrapper that gives its child section the cinematic camera push-in
 * on scroll. Use around below-the-fold acts (not the hero, which has its own
 * intro). `transform-gpu` + center origin keep the dolly smooth.
 */
export function CameraSection({ children }: { children: ReactNode }) {
  const ref = useCameraSection<HTMLDivElement>()
  return (
    <div ref={ref} className="transform-gpu [transform-origin:50%_30%] [will-change:transform,opacity]">
      {children}
    </div>
  )
}
