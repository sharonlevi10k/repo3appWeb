import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LivingBackground } from '@/components/visuals/LivingBackground'
import { LogoAssembly } from '@/components/visuals/LogoAssembly'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CameraSection } from '@/components/ui/CameraSection'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Clients } from '@/components/sections/Clients'
import { Testimonials } from '@/components/sections/Testimonials'
import { Challenges } from '@/components/sections/Challenges'
import { Process } from '@/components/sections/Process'
import { Projects } from '@/components/sections/Projects'
import { About } from '@/components/sections/About'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  useSmoothScroll()
  return (
    <div className="relative z-0 min-h-screen">
      {/* Decorative visuals are isolated so a failure (e.g. canvas on iOS) can
          never blank the page — they just don't render. */}
      <ErrorBoundary>
        <LivingBackground />
      </ErrorBoundary>
      <ErrorBoundary>
        <LogoAssembly />
      </ErrorBoundary>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <CameraSection><Services /></CameraSection>
        <CameraSection><Clients /></CameraSection>
        <CameraSection><Testimonials /></CameraSection>
        <CameraSection><Challenges /></CameraSection>
        <CameraSection><Process /></CameraSection>
        <CameraSection><Projects /></CameraSection>
        <CameraSection><About /></CameraSection>
        <CameraSection><Faq /></CameraSection>
        <CameraSection><Contact /></CameraSection>
      </main>
      <Footer />
    </div>
  )
}
