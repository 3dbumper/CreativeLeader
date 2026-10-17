import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { SelectedWork } from '@/components/selected-work'
import { AboutIntro } from '@/components/about-intro'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <SiteNav />
      <Hero />
      <div className="relative isolate">
        <div aria-hidden="true" className="bg-charcoal absolute inset-0 -z-10 opacity-25" />
        <SelectedWork />
      </div>
      <AboutIntro />
      <SiteFooter />
    </main>
  )
}
