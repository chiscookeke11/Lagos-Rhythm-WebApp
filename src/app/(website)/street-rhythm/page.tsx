"use client"

import { useAppContext } from "@/app/context/AppContext"
import EssentialKnowledge from "@/components/street-rhythm-2-components/EssentialKnowledge"
import HeroSection from "@/components/street-rhythm-2-components/HeroSection"
import HowItWorks from "@/components/street-rhythm-2-components/HowItWorks"
import ReadyToNavigate from "@/components/street-rhythm-2-components/ReadyToNavigate"
import RouteDetails from "@/components/street-rhythm-2-components/RouteDetails"
import WhyStreetRhythm from "@/components/street-rhythm-2-components/WhyStreetRhythm"

export default function Page() {
  const { results, hasSearched } = useAppContext()
  const hasResults = Boolean(results?.length)

  return (
    <div className="font-merienda">

      <HeroSection />

      {/* If results exist */}
      {hasResults && <RouteDetails />}

      {/* If searched but no results */}
      {hasSearched && !hasResults && (
        <section id="no-route-found" className="w-full py-24 px-[5%] max-w-[1380px] mx-auto flex flex-col items-center text-center scroll-mt-24">
          <div className="w-full max-w-3xl bg-gray-50 border border-gray-200 rounded-2xl p-12 shadow-sm">
            <div className="text-5xl mb-4">🚫</div>
            <h3 className="text-2xl font-bold mb-3">No Route Found</h3>
            <p className="text-gray-600 text-sm">
              We couldn’t find a route matching your selection.
              Please try different locations.
            </p>
          </div>
        </section>
      )}

      <EssentialKnowledge />
      <HowItWorks />
      <WhyStreetRhythm />
      <ReadyToNavigate />

    </div>
  )
}
