import { CTASection } from '@/components/street-rhythm-components/CTASection'
import { Features } from '@/components/street-rhythm-components/Features'
import { FloatingActionButton } from '@/components/street-rhythm-components/FloatingActionButton'
import { HeroSection } from '@/components/street-rhythm-components/HeroSection'
import { HowItWorks } from '@/components/street-rhythm-components/HowItWorks'
import { KnowledgeBase } from '@/components/street-rhythm-components/KnowledgeBase'
import { RouteTemplate } from '@/components/street-rhythm-components/RouteTemplate'
import styles from "./StreetRhythmBody.module.css"


export default function Home() {
  return (
    <main className={`${styles.main} font-merienda `}>
      <HeroSection />
      <KnowledgeBase />
      <RouteTemplate />
      <HowItWorks />
      <Features />
      <CTASection />
      <FloatingActionButton />
    </main>
  )
}
