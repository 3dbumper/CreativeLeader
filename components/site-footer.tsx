import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { ShippedTitlesButton } from '@/components/shipped-titles'

export function SiteFooter({ showArtwork = true }: { showArtwork?: boolean }) {
  return (
    <footer id="contact" className="border-t border-border">
      {showArtwork && (
        <div className="relative h-[48svh] min-h-[320px] w-full overflow-hidden md:h-[60svh] [@media(min-aspect-ratio:3/2)]:h-auto! [@media(min-aspect-ratio:3/2)]:aspect-[3/1]">
          {/* Portrait / tablet framing (unchanged). Hidden on wide screens. */}
          <Image
            src="/images/hero-full-hd.jpg"
            alt="A small boy and his dog standing before a colossal, weathered long-necked biped robot seated on a concrete throne at golden hour"
            fill
            sizes="100vw"
            className="origin-bottom scale-[1.7] object-cover object-[50%_88%] landscape:origin-center landscape:scale-100 landscape:object-[50%_98%] [@media(min-aspect-ratio:3/2)]:hidden"
          />
          {/* Wide-screen framing — dedicated wide crop with headroom above the boy and
              road below the dog, anchored high enough that the boy's head is never
              clipped at any browser width while the dog stays clear of the bottom fade. */}
          <Image
            src="/images/hero-wide-bottom.jpg"
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover object-[50%_50%] [@media(min-aspect-ratio:3/2)]:block"
          />
          {/* Fade the image into the page so the contact content reads cleanly.
              On wide screens only the very bottom ramps to background, well below the dog. */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background [@media(min-aspect-ratio:3/2)]:bg-[linear-gradient(to_bottom,transparent_0%,transparent_90%,color-mix(in_oklch,var(--background)_70%,transparent)_100%)]" />
        </div>
      )}

      {/* Credit — this hero is Lee's own original artwork, distinct from the vendor-produced project imagery.
          Placed on the solid page background below the artwork so it reads cleanly instead of getting lost in the image. */}
      {showArtwork && (
        <p className="mx-auto max-w-7xl px-6 pt-4 text-right text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground lg:px-10">
          Original artwork by Lee Williamson
        </p>
      )}

      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Contact
            </p>
            <a
              href="mailto:lee@leewilliamson.com"
              className="group mt-6 inline-flex items-center gap-3 text-lg text-foreground md:text-xl"
            >
              <span className="border-b border-border pb-1 transition-colors group-hover:border-accent">
                lee@leewilliamson.com
              </span>
              <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <p className="mt-6 text-sm text-muted-foreground">
              Greater Boston, MA
              <span className="mx-2 text-muted-foreground/60">|</span>
              <span>919.608.9089</span>
            </p>
          </Reveal>

          <Reveal as="div" delay={120} className="lg:col-span-2">
            <div id="resume">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Résumé
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="/resumeLeeWilliamson.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="resumeLeeWilliamson.pdf"
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    PDF
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/leeallanwilliamson/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                      aria-hidden
                    >
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <ShippedTitlesButton className="text-foreground/80 transition-colors hover:text-foreground" />
                </li>
              </ul>
            </div>
          </Reveal>

        </div>

        <Reveal as="div" className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center">
          <span className="font-serif text-sm normal-case tracking-normal text-muted-foreground/70">
            Lee Williamson
          </span>
          <span>&copy; {new Date().getFullYear()} — All rights reserved</span>
        </Reveal>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground/70">
          All logos, trademarks, and project imagery &mdash; including Call of Duty: Mobile, Activision,
          WWE, Rock Band, and Harmonix &mdash; are the property of their respective owners. They appear here
          solely to credit the projects and are used under fair use for portfolio and identification purposes.
          This site is not affiliated with, endorsed by, or sponsored by any of these rights holders.
        </p>
      </div>
    </footer>
  )
}
