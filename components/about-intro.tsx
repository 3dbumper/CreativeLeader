import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function AboutIntro() {
  return (
    <section
      id="about"
      className="border-t border-border bg-card/40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-3">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            About
          </p>
          <figure className="group mt-8 lg:sticky lg:top-8">
            <div className="relative w-full max-w-[13rem]">
              <span
                aria-hidden="true"
                className="absolute inset-0 -m-1.5 rounded-full ring-1 ring-accent/40 transition-[margin] duration-500 ease-out group-hover:-m-2.5"
              />
              <div className="relative aspect-square overflow-hidden rounded-full bg-muted">
                <Image
                  src="/images/headshot.jpeg"
                  alt="Portrait of Lee Williamson"
                  fill
                  sizes="208px"
                  className="scale-[1.3] object-cover object-[50%_20%] grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.24] group-hover:grayscale-0"
                />
              </div>
            </div>
          </figure>
        </Reveal>

        <div className="lg:col-span-9">
          <Reveal delay={80}>
            <p className="text-balance font-serif text-[1.75rem] font-light leading-[1.15] tracking-tight text-muted-foreground md:text-4xl md:leading-[1.2] [&_strong]:font-normal [&_strong]:text-foreground">
              Lee plays a key role in aligning internal teams, external vendors, and production partners to <strong>sustain creative quality and momentum</strong>, finding creative solutions and resolving roadblocks before they disrupt production. His approach combines sound judgment, clear expectations, and constructive feedback with respect for his collaborators. A senior creative leader with a career spanning <strong>AAA games and licensed franchises</strong>, including Call of Duty: Mobile, Rock Band 4, Ghost Recon, and Rainbow Six, he draws on hands-on experience across characters, props, environments, VFX, and animation to <strong>bridge artistic vision, technical execution, and production strategy</strong>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
