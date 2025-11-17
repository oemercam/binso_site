"use client"

import Header from "./header"
import Hero from "./hero"
import FeatureHighlights from "./feature-highlights"
import Projects from "./projects"
import Services from "./services"
import Team from "./team"
import Jobs from "./jobs"
import References from "./references"
import Faq from "./faq"
import CallToAction from "./call-to-action"
import Footer from "./footer"
import ContactFormButton from "./contact-form-button"
import StartProject from "./start-project"
import type { LandingPageProps } from "./types"
import { ErrorBoundary } from "@/components/error-boundary"

// Export individual components for flexible usage
export {
  Header,
  Hero,
  FeatureHighlights,
  Projects,
  Services,
  Team,
  Jobs,
  References,
  Faq,
  CallToAction,
  Footer,
  ContactFormButton,
  StartProject,
}

// Main component that combines all sections
export default function LandingPage({ showHeader = true, showFooter = true }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      {showHeader && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}
      <div className="container pt-8">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <FeatureHighlights />
        </ErrorBoundary>
        <section id="dienstleistungen">
          <ErrorBoundary>
            <Services />
          </ErrorBoundary>
        </section>
        <ErrorBoundary>
          <CallToAction />
        </ErrorBoundary>
        <section id="projekte">
          <ErrorBoundary>
            <Projects />
          </ErrorBoundary>
        </section>
        <section id="team">
          <ErrorBoundary>
            <Team />
          </ErrorBoundary>
        </section>
        <section id="karriere">
          <ErrorBoundary>
            <Jobs />
          </ErrorBoundary>
        </section>
        <section id="referenzen">
          <ErrorBoundary>
            <References />
          </ErrorBoundary>
        </section>
        <section id="faq">
          <ErrorBoundary>
            <Faq />
          </ErrorBoundary>
        </section>
      </div>
      {showFooter && (
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      )}
    </main>
  )
}
