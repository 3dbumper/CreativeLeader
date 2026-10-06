import Image from 'next/image'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects'
import { Reveal } from '@/components/reveal'
import { RockBandMark } from '@/components/rock-band-mark'
import { ExternalDevHeroCollage } from '@/components/external-dev-hero-collage'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        {project.heroDuo ? (
          <div className="absolute inset-0 overflow-hidden bg-foreground transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]">
            {/* Wide action still fills the card */}
            <Image
              src={project.heroDuo.wide.src || '/placeholder.svg'}
              alt={project.heroDuo.wide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_36%]"
            />
            {/* Close-up still — landscape inset, lower right, shown uncropped */}
            <div className="absolute bottom-[8%] right-[6%] w-[44%] rotate-2 overflow-hidden rounded shadow-xl ring-1 ring-white/20">
              <div className="relative aspect-video">
                <Image
                  src={project.heroDuo.portrait.src || '/placeholder.svg'}
                  alt={project.heroDuo.portrait.alt}
                  fill
                  sizes="(max-width: 1024px) 36vw, 22vw"
                  className="object-contain"
                />
              </div>
            </div>
            {/* WWE logo, upper-left */}
            <img
              src="/images/wwe-logo.png"
              alt="WWE logo"
              className="pointer-events-none absolute left-4 top-4 z-20 h-9 w-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
            />
            {project.slug === 'performance-direction' && (
              <Image
                src="/images/cod-mobile-logo.png"
                alt="Call of Duty: Mobile logo"
                width={512}
                height={176}
                className="absolute bottom-3 right-3 z-20 h-auto w-[24%] max-w-[130px] object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
              />
            )}
          </div>
        ) : project.heroScatter ? (
          <div className="absolute inset-0 overflow-hidden transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]">
            <ExternalDevHeroCollage variant="thumb" />
          </div>
        ) : project.heroCollage ? (
          <div className="absolute inset-0 overflow-hidden bg-foreground transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]">
            {/* Portrait — full-height backdrop anchored to the right */}
            <div className="absolute inset-y-0 right-0 w-[58%]">
              <Image
                src={project.heroCollage.portrait.src || '/placeholder.svg'}
                alt={project.heroCollage.portrait.alt}
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover object-[50%_65%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/20 to-transparent" />
            </div>
            {/* Retro computer — tilted framed card, lower left */}
            <div className="absolute bottom-[10%] left-[6%] w-[36%] -rotate-3 overflow-hidden rounded-md shadow-2xl ring-1 ring-background/15">
              <div className="relative aspect-square">
                <Image
                  src={project.heroCollage.device.src || '/placeholder.svg'}
                  alt={project.heroCollage.device.alt}
                  fill
                  sizes="(max-width: 1024px) 22vw, 12vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* M1 Garand sticker — flipped so the muzzle points into open space, not at the portrait */}
            <div className="absolute left-[6%] top-[2%] w-[52%] -rotate-[8deg] [filter:drop-shadow(0_12px_20px_rgba(0,0,0,0.5))]">
              <div className="relative aspect-square">
                <Image
                  src={project.heroCollage.sticker.src || '/placeholder.svg'}
                  alt={project.heroCollage.sticker.alt}
                  fill
                  sizes="(max-width: 1024px) 32vw, 18vw"
                  className="object-contain -scale-x-100"
                />
              </div>
            </div>
            <Image
              src="/images/cod-mobile-logo.png"
              alt="Call of Duty: Mobile logo"
              width={512}
              height={176}
              className="absolute bottom-3 right-3 z-10 h-auto w-[24%] max-w-[130px] object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
            />
          </div>
        ) : (
          <>
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-[transform,filter] duration-700 ease-out will-change-transform group-hover:scale-[1.03] ${project.thumbPosition ?? ''}`}
            />
            {(project.slug === 'external-development' || project.slug === 'performance-direction') && (
              <Image
                src="/images/cod-mobile-logo.png"
                alt="Call of Duty: Mobile logo"
                width={512}
                height={176}
                className="absolute bottom-3 right-3 z-10 h-auto w-[24%] max-w-[130px] object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
              />
            )}
            {project.slug === 'visual-design-rock-band' && (
              <RockBandMark className="absolute bottom-3 right-3 z-10 text-[1.75rem] sm:text-[2rem]" />
            )}
          </>
        )}
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
        {project.video && (
          <>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
            >
              <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-foreground" />
            </span>
            <span className="absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
              Watch film
            </span>
          </>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-serif text-[1.75rem] font-light leading-tight tracking-tight text-foreground md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.role}</p>
        </div>
        <span className="whitespace-nowrap pt-1 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
        {project.meta}
        <span className="text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View &rarr;
        </span>
      </p>
    </Link>
  )
}

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pb-32 md:pt-16 lg:px-10">
      <Reveal
        as="header"
        className="mb-14 flex flex-col justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-end md:pt-10"
      >
        <h2 className="font-serif text-4xl font-light tracking-tight text-foreground md:text-4xl">
          Selected Work
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-6">
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            className={index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}
          >
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
