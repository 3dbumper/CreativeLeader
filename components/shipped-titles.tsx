'use client'

import { useRef } from 'react'
import Image from 'next/image'

const titles = [
  { slug: 'hellboy-dogs-of-the-night', name: 'Hellboy: Dogs of the Night', year: 2000 },
  { slug: 'ghost-recon-2-summit-strike', name: 'Ghost Recon 2: Summit Strike', year: 2005 },
  { slug: 'rainbow-six-lockdown', name: 'Rainbow Six: Lockdown', year: 2005 },
  { slug: 'ghost-recon-advanced-warfighter', name: 'Ghost Recon Advanced Warfighter', year: 2006 },
  { slug: 'ghost-recon-advanced-warfighter-2', name: 'Ghost Recon Advanced Warfighter 2', year: 2007 },
  { slug: 'ben-10-alien-force', name: 'Ben 10: Alien Force', year: 2008 },
  { slug: 'eat-lead', name: 'Eat Lead: The Return of Matt Hazard', year: 2009 },
  { slug: 'matt-hazard-blood-bath', name: 'Matt Hazard: Blood Bath and Beyond', year: 2009 },
  { slug: 'edf-insect-armageddon', name: 'Earth Defense Force: Insect Armageddon', year: 2011 },
  { slug: 'ben-10-galactic-racing', name: 'Ben 10: Galactic Racing', year: 2011 },
  { slug: 'madagascar-3', name: 'Madagascar 3: The Video Game', year: 2012 },
  { slug: 'infinite-crisis', name: 'Infinite Crisis', year: 2015 },
  { slug: 'rock-band-4', name: 'Rock Band 4', year: 2015 },
  { slug: 'rock-band-4-rivals', name: 'Rock Band 4: Rivals Bundle', year: 2016 },
  { slug: 'call-of-duty-mobile', name: 'Call of Duty: Mobile', year: 2019 },
]

export function ShippedTitlesButton({ className }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => {
    document.documentElement.style.overflow = 'hidden'
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={className}
      >
        Shipped Titles
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="shipped-titles-heading"
        onClose={() => {
          document.documentElement.style.overflow = ''
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        className="m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-sm bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/40 backdrop:backdrop-blur-[2px] open:animate-in open:fade-in-0 open:zoom-in-[0.98] open:duration-300"
      >
        <div className="p-5 sm:p-8 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2
                id="shipped-titles-heading"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Shipped Titles
              </h2>
              <p className="mt-2 font-serif text-xl text-foreground md:text-2xl">
                {titles[0].year}&ndash;Present
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close shipped titles"
              className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ol className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5 lg:gap-6">
            {titles.map((title) => (
              <li
                key={title.slug}
                className="flex flex-col rounded-[3px] bg-[#fbf9f4] p-2 pb-2.5 shadow-[0_1px_2px_rgba(30,25,15,0.12),0_4px_10px_-2px_rgba(30,25,15,0.16)] ring-1 ring-black/5 sm:p-2.5 sm:pb-3"
              >
                <div className="relative aspect-[5/7] w-full">
                  <Image
                    src={`/images/games/${title.slug}.webp`}
                    alt={`${title.name} cover art`}
                    fill
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 22vw, 30vw"
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-center text-[0.65rem] tracking-[0.14em] text-neutral-500 tabular-nums">
                  {title.year}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </dialog>
    </>
  )
}
