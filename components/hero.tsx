'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Shared framing so every layer stays pixel-aligned. Top-anchored so the crop
// is consistent across viewports/OSes: sky sits just above the right-hand tower
// and the bottom edge lands just below the robot's knees (cropping out the
// child and dog). Portrait needs more zoom to hold the same band.
const FRAME =
  'origin-top object-cover object-[50%_0%] scale-[1.66] landscape:scale-[1.22] supports-[-webkit-touch-callout:none]:landscape:object-[50%_18%] [@media(min-aspect-ratio:2/1)]:scale-100! [@media(min-aspect-ratio:2/1)]:object-[50%_22%]'

export function Hero() {
  // Start the sequence only once every layer has decoded, so the fade is a
  // clean opacity animation instead of janking while large images decode.
  const [blurLoaded, setBlurLoaded] = useState(false)
  const [sharpLoaded, setSharpLoaded] = useState(false)
  const [started, setStarted] = useState(false)
  const blurRef = useRef<HTMLImageElement>(null)
  const sharpRef = useRef<HTMLImageElement>(null)

  // Cached reloads: the image can already be `complete` before React attaches
  // its onLoad handler, so onLoad never fires. Detect that on mount, and add a
  // safety timeout so the reveal can never stay stuck at opacity-0 (a blank hero).
  useEffect(() => {
    if (blurRef.current?.complete) setBlurLoaded(true)
    if (sharpRef.current?.complete) setSharpLoaded(true)
    const fallback = window.setTimeout(() => setStarted(true), 300)
    return () => window.clearTimeout(fallback)
  }, [])

  const ready = blurLoaded && sharpLoaded

  useEffect(() => {
    if (ready && !started) {
      const raf = requestAnimationFrame(() => setStarted(true))
      return () => cancelAnimationFrame(raf)
    }
  }, [ready, started])

  return (
    <section
      id="top"
      className="relative min-h-[68svh] w-full overflow-hidden bg-gradient-to-b from-[#c3c8e2] via-[#c3c8e2] to-background sm:min-h-[80svh] lg:min-h-svh"
    >
      {/* Beat 1 — fully soft scene fades in from a pale sky blue that settles into the site's warm off-white at the bottom */}
      <Image
        ref={blurRef}
        src="/images/hero-blur-all.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        onLoad={() => setBlurLoaded(true)}
        className={cn(
          FRAME,
          'transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity] motion-reduce:transition-none',
          started ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Beat 2 — the entire scene comes into focus at once, over the soft plate */}
      <Image
        ref={sharpRef}
        src="/images/hero-full-hd.jpg"
        alt="A colossal weathered robot seated on a concrete throne at golden hour, with a small child and a dog standing before it and a rusted gantry crane framing the scene"
        fill
        priority
        sizes="100vw"
        onLoad={() => setSharpLoaded(true)}
        className={cn(
          FRAME,
          'transition-opacity delay-[500ms] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity] motion-reduce:transition-none motion-reduce:delay-0',
          started ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Very faint, short white fade along the bottom edge only */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/85 via-white/35 via-55% to-transparent"
        aria-hidden
      />

      {/* Scrim + text — begin fading in halfway through the focus sequence */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/5 transition-opacity delay-[950ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:delay-0',
          started ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        className={cn(
          'relative mx-auto flex min-h-[68svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 transition-opacity delay-[950ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:delay-0 sm:min-h-[80svh] md:pb-24 lg:min-h-svh lg:px-10',
          started ? 'opacity-100' : 'opacity-0',
        )}
      >
        <h1 className="font-serif text-[15vw] font-light leading-[0.9] tracking-tight text-on-image sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          Lee <span className="italic text-on-image/90">Williamson</span>
        </h1>

        <div className="mt-6 flex items-center gap-4 md:mt-8">
          <span className="h-px w-8 flex-none bg-accent" aria-hidden />
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-on-image md:text-sm">
            Creative Leader
            <span className="mx-3 text-on-image-muted">/</span>
            AAA Game Development
          </p>
        </div>
      </div>
    </section>
  )
}
