import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Rendered instead of the children when a descendant throws. */
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Catches render/runtime errors in its subtree and shows a fallback instead of
 * letting the whole app unmount to a blank screen. Used to isolate fragile bits
 * (e.g. WebGL on iOS Safari) so a single failure degrades gracefully.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Non-critical visuals — log for debugging but don't surface to the user.
    console.warn('[ErrorBoundary] caught:', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}
