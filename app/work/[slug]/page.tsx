import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { RockBandMark } from '@/components/rock-band-mark'
import { ExternalDevHeroCollage } from '@/components/external-dev-hero-collage'
import { projects, getProject } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Work — Lee Williamson' }
  const title = `${project.title} — Lee Williamson`
  const path = `/work/${project.slug}`
  const shareImage = {
    url: '/opengraph-image.png',
    width: 1200,
    height: 630,
    alt: 'Lee Williamson - Creative Leader',
  }
  return {
    title,
    description: project.tagline,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      siteName: 'Lee Williamson',
      title,
      description: project.tagline,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.tagline,
      images: [shareImage],
    },
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const number = String(index + 1).padStart(2, '0')
  const next = projects[(index + 1) % projects.length]
  const sectionsLabel = project.sectionsLabel ?? 'Areas of Direction'

  return (
    <main className="min-h-svh bg-background">
      <SiteNav />

      {/* Banner */}
      <section
        className={`relative w-full overflow-hidden ${
          project.heroScatter
            ? 'h-[calc(62svh+3rem)] min-h-[468px] md:h-[calc(72svh+5rem)]'
            : 'h-[62svh] min-h-[420px] md:h-[72svh]'
        }`}
      >
        {project.heroScatter ? (
          // Collage keeps its original height; the extra section height sits below it so the title clears the art.
          <div className="absolute inset-x-0 bottom-12 top-0 md:bottom-20">
            <ExternalDevHeroCollage />
          </div>
        ) : project.heroDuo ? (
          <div className="absolute inset-0 overflow-hidden bg-foreground">
            {/* Wide action still — the main frame */}
            <div className="absolute left-[3%] top-1/2 w-[64%] max-w-[1200px] -translate-y-1/2 -rotate-2 overflow-hidden rounded-md shadow-2xl ring-1 ring-white/15 sm:w-[60%] lg:w-[56%]">
              <div className="relative aspect-video">
                <Image
                  src={project.heroDuo.wide.src || '/placeholder.svg'}
                  alt={project.heroDuo.wide.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 56vw, 64vw"
                  className="object-cover object-[50%_36%]"
                />
                {/* WWE logo, upper-left corner of the hero image */}
                <img
                  src="/images/wwe-logo.png"
                  alt="WWE logo"
                  className="pointer-events-none absolute left-3 top-3 z-30 h-11 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] md:h-14"
                />
              </div>
            </div>
            {/* Close-up still — landscape inset overlapping the right edge, shown uncropped */}
            <div className="absolute right-[4%] top-[52%] w-[42%] max-w-[720px] -translate-y-1/2 rotate-2 overflow-hidden rounded-md shadow-2xl ring-1 ring-white/15 sm:w-[38%] lg:w-[34%]">
              <div className="relative aspect-video">
                <Image
                  src={project.heroDuo.portrait.src || '/placeholder.svg'}
                  alt={project.heroDuo.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 42vw"
  className="object-contain"
  />
              </div>
            </div>
            {project.slug === 'performance-direction' && (
              <Image
                src="/images/cod-mobile-logo.png"
                alt="Call of Duty: Mobile logo"
                width={512}
                height={176}
                className="absolute bottom-5 right-5 z-20 h-auto w-[16%] max-w-[130px] object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] sm:bottom-7 sm:right-7"
              />
            )}
          </div>
        ) : project.heroCollage ? (
          <div className="absolute inset-0 overflow-hidden bg-foreground">
            {/* Portrait — full-height backdrop anchored to the right */}
            <div className="absolute inset-y-0 right-0 w-[64%] sm:w-[54%] lg:w-[48%]">
              <Image
                src={project.heroCollage.portrait.src || '/placeholder.svg'}
                alt={project.heroCollage.portrait.alt}
                fill
                priority
                  sizes="(min-width: 1024px) 48vw, 60vw"
                  className="object-cover object-[50%_65%]"
              />
              {/* Feather the portrait's left edge into the collage stage */}
              <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/20 to-transparent" />
            </div>
            {/* Call of Duty: Mobile logo, bottom-right — transparent PNG, white wordmark reads over the darker portrait */}
            <Image
              src="/images/cod-mobile-logo.png"
              alt="Call of Duty: Mobile logo"
              width={512}
              height={176}
              className="absolute bottom-5 right-5 z-20 h-auto w-[16%] max-w-[130px] object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] sm:bottom-7 sm:right-7"
            />
          </div>
        ) : (
          <>
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.alt}
              fill
              priority
              sizes="100vw"
              className={`object-cover ${project.imagePosition ?? ''}`}
            />
            {project.slug === 'external-development' && (
              <Image
                src="/images/cod-mobile-logo.png"
                alt="Call of Duty: Mobile logo"
                width={512}
                height={176}
                className="absolute bottom-5 right-5 z-20 h-auto w-[16%] max-w-[130px] object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] sm:bottom-7 sm:right-7"
              />
            )}
            {project.slug === 'visual-design-rock-band' && (
              <div className="pointer-events-none absolute bottom-2 right-2 z-10 flex flex-col items-end gap-1 sm:bottom-2.5 sm:right-2.5">
                <RockBandMark className="text-[2.668rem] opacity-75 duration-1000 animate-in fade-in fill-mode-both sm:text-[3rem]" />
                <p className="text-right text-[0.7rem] font-light italic leading-tight text-foreground/40 duration-1000 animate-in fade-in fill-mode-both sm:text-xs">
                  Exploratory concept piece, by Lee Williamson
                </p>
              </div>
            )}

          </>
        )}
        {project.captureHud && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 mix-blend-screen max-sm:hidden md:text-xs"
          >
            {/* Seam lines dividing the quadrants */}
            <div className="absolute left-1/2 top-0 h-[58%] w-px -translate-x-1/2 bg-white/20" />
            <div className="absolute left-0 right-0 top-[29%] mx-auto h-px w-[min(1120px,100%-3rem)] bg-white/20" />

            {/* Registration crosshair where the seams meet */}
            <div className="absolute left-1/2 top-[29%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-5 w-5">
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/60" />
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/60" />
              </div>
            </div>

            {/* Top-left: capture status + timecode */}
            <div className="absolute left-6 top-24 flex flex-col gap-1 lg:left-10">
              <span className="text-white/90">CAPTURE &#9655; LIVE</span>
              <span>TC 01:00:21:14</span>
              <span className="text-white/50">TAKE 05 &middot; SC 12</span>
            </div>

            {/* Top-right: rate + solve + REC */}
            <div className="absolute right-6 top-24 flex flex-col items-end gap-1 lg:right-10">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
                REC
              </span>
              <span>120 FPS</span>
              <span className="text-white/50">MARKERS 53/53</span>
            </div>

            {/* Left of vertical seam: camera id */}
            <span className="absolute left-1/2 top-[14%] -translate-x-[calc(100%+0.5rem)] text-white/50">
              CAM 04/12
            </span>
            {/* Right of vertical seam: subjects */}
            <span className="absolute left-1/2 top-[14%] translate-x-2 text-white/50">
              SUBJ A&middot;B
            </span>

            {/* Below horizontal seam: solve status */}
            <span className="absolute left-1/2 top-[calc(29%+0.75rem)] -translate-x-1/2 text-white/50">
              SOLVE &#9679; OK
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:pb-16 lg:px-10">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                &larr;
              </span>
              Selected Work
            </Link>
            <div className="mt-6 flex items-end justify-between gap-6">
              <div>
                {project.context && (
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {project.context}
                  </p>
                )}
                <h1 className="mt-3 text-balance font-serif text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
                  {project.title}
                </h1>
                {project.slug === 'photogrammetry-innovation' && (
                  <p className="mt-3 max-w-md text-[0.7rem] font-light italic leading-relaxed text-muted-foreground/70 sm:text-xs">
                    Photo of a painted and finished SLA print cow skull, derived from a photogrammetry scan. By Lee Williamson
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Focus
              </p>
              <p className="mt-4 text-pretty font-serif text-xl font-light leading-snug text-foreground md:text-2xl">
                {project.tagline}
              </p>

              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Disciplines
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {project.disciplines.map((d) => (
                  <li
                    key={d}
                    className="border-b border-border/60 pb-2 text-sm text-foreground/80"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              {project.videoHref && (
                <a
                  href={project.videoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 ring-1 ring-border transition-colors group-hover:bg-foreground/10">
                    <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-foreground" />
                  </span>
                  <span className="border-b border-border pb-0.5 transition-colors group-hover:border-accent">
                    Watch the film
                  </span>
                </a>
              )}
            </div>
          </aside>

          {/* Overview + contributions */}
          <div className="lg:col-span-8">
            {project.overview && project.overview.length > 0 && (
              <>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Overview
                </p>
                <div className="mt-6 flex flex-col gap-6">
                  {project.overview.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-balance font-serif text-2xl font-light leading-snug tracking-tight text-foreground md:text-3xl md:leading-[1.25]'
                          : 'text-pretty text-base leading-relaxed text-muted-foreground md:text-lg'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </>
            )}

            {project.sections && project.sections.length > 0 && (
              <div
                className={
                  project.overview && project.overview.length > 0
                    ? 'mt-14 border-t border-border pt-10'
                    : undefined
                }
              >
                {sectionsLabel && (
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {sectionsLabel}
                  </p>
                )}
                <div className="mt-8 flex flex-col gap-12">
                  {project.sections.map((s) => (
                    <div
                      key={s.title}
                      className={s.aside ? 'flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center md:gap-10' : undefined}
                    >
                      <div className={s.aside ? 'md:flex-1 md:min-w-0' : 'contents'}>
                        <h3 className="font-serif text-xl font-light text-foreground md:text-2xl">
                          {s.title}
                        </h3>
                        {s.body && (
                          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                            {s.body}
                          </p>
                        )}
                        {s.bullets && s.bullets.length > 0 && (
                          <ul className="mt-5 flex flex-col gap-2.5">
                            {s.bullets.map((b, i) => (
                              <li
                                key={i}
                                className="flex gap-3 text-sm leading-relaxed text-foreground/80 md:text-base"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-[0.55rem]"
                                />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {s.pipeline && s.pipeline.length > 0 && (() => {
                        const processStep = s.pipeline!.find((p) => p.kind === 'process')
                        const processNotes = processStep?.notes ?? (processStep?.note ? [processStep.note] : [])
                        return (
                          <div className={s.aside ? 'order-last w-full' : 'mt-7'}>
                            {s.pipelineHero ? (
                              <div className="relative aspect-[2.4/1] overflow-hidden rounded-sm bg-black ring-1 ring-border/70">
                          <Image
                            src={s.pipelineHero.src}
                            alt={s.pipelineHero.alt}
                            fill
                            sizes="(min-width: 1024px) 66vw, 100vw"
                            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                          />
                        </div>
                            ) : (
                              <div className="relative flex h-60 items-stretch overflow-hidden rounded-sm bg-black ring-1 ring-border/70">
                                {s.pipeline.filter((p) => p.kind !== 'process' && p.src).map((step, i) => (
                                  <div key={i} className="relative h-full flex-1">
                                    <Image src={step.src || '/placeholder.svg'} alt={step.alt || step.label} fill sizes="33vw" className="object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}
                            {processNotes.length > 0 && (
                              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-sm border border-border bg-foreground/[0.03] px-4 py-3">
                                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-accent">
                                  Creative / Production Process
                                </span>
                                {processNotes.map((n, ni) => (
                                  <span
                                    key={ni}
                                    className="flex items-center gap-2 text-xs leading-relaxed text-foreground/80 sm:text-sm"
                                  >
                                    <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                                    {n}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })()}
                      {s.pipelineCaption && (
                        <p
                          className={`text-xs italic leading-relaxed text-muted-foreground ${
                            s.aside ? 'order-last -mt-3 w-full md:-mt-7' : 'mt-3'
                          }`}
                        >
                          {s.pipelineCaption}
                        </p>
                      )}
                      <div className={s.aside ? 'w-full md:w-[58%] md:shrink-0 [&>div]:mt-0' : 'contents'}>
                      {s.images && s.images.length > 0 && (() => {
                        // Aside sections render a single tall image that fills its column
                        // width so its right edge lines up with the container (and the wide
                        // image above it). Bypass the justified/height-driven figure layout.
                        if (s.aside) {
                          const img = s.images[0]
                          return (
                            <figure className="group mt-5 flex flex-col md:mt-0">
                              <div
                                className={`relative z-10 w-full overflow-hidden rounded-sm ${
                                  img.transparent ? '' : 'bg-black ring-1 ring-border'
                                }`}
                                style={{ aspectRatio: (img.aspect ?? '2/3').replace('/', ' / ') }}
                              >
                                <Image
                                  src={img.src || '/placeholder.svg'}
                                  alt={img.alt}
                                  fill
                                  sizes="(min-width: 768px) 58vw, 100vw"
                                  className={`${
                                    img.transparent ? 'object-contain' : 'object-cover'
                                  } transition-transform duration-500 group-hover:scale-[1.02]`}
                                />
                              </div>
                              {img.caption && (
                                <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                  {img.caption}
                                </figcaption>
                              )}
                            </figure>
                          )
                        }
                        // When every image declares an aspect ratio, render an equal-height
                        // "justified" layout: non-wide images pair up two-per-row and wide
                        // images take their own full-width row. Within a row each figure's
                        // width is proportional to its aspect ratio (flex-grow), so every
                        // image shares the exact same rendered height. Sections that mix in
                        // images without an aspect (e.g. the tilted mask polaroids) fall
                        // through to the legacy grid below.
                        const allAspect = s.images.every((im) => im.aspect)
                        if (allAspect) {
                          const rows: (typeof s.images)[] = []
                          let current: typeof s.images = []
                          for (const im of s.images) {
                            if (im.wide) {
                              if (current.length) { rows.push(current); current = [] }
                              rows.push([im])
                            } else {
                              current.push(im)
                              if (current.length === 2) { rows.push(current); current = [] }
                            }
                          }
                          if (current.length) rows.push(current)
                          const arOf = (a?: string) => {
                            const [w, h] = (a ?? '4/3').split('/').map(Number)
                            return w && h ? w / h : 4 / 3
                          }
                          const pairRows = rows.filter((r) => r.length === 2)
                          const sharedSplit =
                            s.alignColumns && pairRows.length > 1
                              ? pairRows.reduce((sum, r) => sum + arOf(r[0].aspect) / (arOf(r[0].aspect) + arOf(r[1].aspect)), 0) /
                                pairRows.length
                              : null
                          return (
                            <div className="mt-5 flex flex-col gap-3 md:gap-4">
                              {rows.map((row, ri) => {
                                const aligned = sharedSplit !== null && row.length === 2
                                const rowAr = row.reduce((sum, im) => sum + arOf(im.aspect), 0)
                                return (
                                <div key={ri} className="flex gap-3 md:gap-4">
                                  {row.map((img, i) => {
                                    const frac = aligned ? (i === 0 ? sharedSplit! : 1 - sharedSplit!) : null
                                    return (
                                    <figure
                                      key={i}
                                      className="group flex min-w-0 flex-col"
                                      style={{ flexGrow: frac ?? arOf(img.aspect), flexBasis: 0 }}
                                    >
                                      <div
                                        className={`relative z-10 w-full overflow-hidden rounded-sm ${img.contain ? '' : 'bg-black ring-1 ring-border'}`}
                                        style={{ aspectRatio: frac !== null ? `${rowAr * frac}` : (img.aspect ?? '4/3').replace('/', ' / ') }}
                                      >
                                        {img.embedUrl ? (
                                          <iframe
                                            title={img.embedTitle || img.alt}
                                            src={img.embedUrl}
                                            className="absolute inset-0 h-full w-full"
                                            frameBorder="0"
                                            allow="autoplay; fullscreen; xr-spatial-tracking"
                                            allowFullScreen
                                            loading="lazy"
                                          />
                                        ) : img.src?.startsWith('http') ? (
                                          <img
                                            src={img.src}
                                            alt={img.alt}
                                            className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${img.contain ? 'object-contain' : 'object-cover'}`}
                                          />
                                        ) : (
                                          <Image
                                            src={img.src || '/placeholder.svg'}
                                            alt={img.alt}
                                            fill
                                            sizes="(min-width: 1024px) 66vw, 100vw"
                                            className={`transition-transform duration-500 group-hover:scale-[1.02] ${img.contain ? 'object-contain' : 'object-cover'}`}
                                          />
                                        )}
                                        {img.logo === 'codm' && (
                                          <Image
                                            src="/images/cod-mobile-logo.png"
                                            alt="Call of Duty: Mobile logo"
                                            width={512}
                                            height={170}
                                            className="pointer-events-none absolute bottom-3 right-3 z-10 h-auto w-[22%] max-w-[140px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]"
                                          />
                                        )}
                                      </div>
                                      {img.caption && (
                                <figcaption
                                  className={`mt-2 text-xs leading-relaxed text-muted-foreground ${
                                    img.caption === '3D Weapon Renders Across Various Seasons' ? 'text-center' : ''
                                  }`}
                                >
                                  {img.caption}
                                </figcaption>
                                      )}
                                    </figure>
                                    )
                                  })}
                                </div>
                                )
                              })}
                            </div>
                          )
                        }
                        const pairedAspect = s.images.length > 1 && s.images.every((im) => im.aspect && !im.wide)
                        // Sections that mix a wide image with non-wide aspect images (e.g. Freestyle Solo):
                        // use a 2-col grid so the paired aspect images each fill half the row — together
                        // matching the full width of the wide gameplay image.
                        const mixedAspect =
                          s.images.some((im) => im.wide) && s.images.some((im) => im.aspect && !im.wide)
                        return (
                        <div className={`mt-5 grid gap-3 md:gap-4 ${pairedAspect || mixedAspect ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                          {s.images.map((img, i) => (
                            <figure
                              key={i}
                              className={`group flex flex-col ${img.wide ? 'col-span-2 sm:col-span-3' : img.aspect ? '' : i === 0 ? '-rotate-1' : 'rotate-1'}`}
                            >
                              <div
                                  className={`relative z-10 w-full overflow-hidden rounded-sm bg-black opacity-100 ring-1 ring-border ${
                                    img.embedUrl ? 'aspect-[16/10] sm:aspect-video' : img.aspect ? '' : img.wide ? 'aspect-[16/7]' : 'aspect-[4/3] bg-slate-100'
                                  }`}
                                  style={img.aspect && !img.embedUrl ? { aspectRatio: img.aspect.replace('/', ' / ') } : undefined}
                              >
                                {img.embedUrl ? (
                                  <iframe
                                    title={img.embedTitle || img.alt}
                                    src={img.embedUrl}
                                    className="absolute inset-0 h-full w-full"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; xr-spatial-tracking"
                                    allowFullScreen
                                    loading="lazy"
                                  />
                                ) : img.src?.startsWith('http') ? (
                                  <img
                                    src={img.src}
                                    alt={img.alt}
                                    className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${
                                      img.wide ? 'object-contain' : 'object-cover'
                                    }`}
                                  />
                                ) : (
                                  <Image
                                    src={img.src || '/placeholder.svg'}
                                    alt={img.alt}
                                    fill
                                    sizes={img.wide ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw'}
                                    className={img.crop ? 'object-cover transition-transform duration-500 group-hover:scale-[1.02]' : 'object-contain'}
                                    style={img.crop ? { objectPosition: img.crop } : undefined}
                                  />
                                )}
                              </div>
                              {img.caption && (
                                <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                  {img.caption}
                                </figcaption>
                              )}
                            </figure>
                          ))}
                        </div>
                        )
                      })()}
                      </div>
                      {s.aside && s.images && s.images.length > 1 && (
                        <div className="flex w-full flex-col gap-4 md:basis-full">
                          {s.images.slice(1).map((img, i) => (
                            <figure key={i} className="group flex flex-col">
                              <div
                                className={`relative w-full overflow-hidden rounded-sm ${
                                  img.transparent ? '' : 'bg-black ring-1 ring-border'
                                }`}
                                style={{ aspectRatio: (img.aspect ?? '16/9').replace('/', ' / ') }}
                              >
                                <Image
                                  src={img.src || '/placeholder.svg'}
                                  alt={img.alt}
                                  fill
                                  sizes="(min-width: 1024px) 66vw, 100vw"
                                  className={`${
                                    img.transparent ? 'object-contain' : 'object-cover'
                                  } transition-transform duration-500 group-hover:scale-[1.02]`}
                                />
                              </div>
                              {img.caption && (
                                <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                  {img.caption}
                                </figcaption>
                              )}
                            </figure>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.clips && project.clips.length > 0 && (
              <div className={`mt-10 grid grid-cols-1 gap-6 ${project.clips.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {project.clips.map((clip, i) => (
                  <figure key={i} className="flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-foreground/5 ring-1 ring-border">
                      {clip.youTubeId ? (
                        <iframe
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube-nocookie.com/embed/${clip.youTubeId}?start=${
                            clip.start ?? 0
                          }&rel=0&modestbranding=1`}
                          title={`${project.title} — ${clip.label}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : clip.src ? (
                        <video
                          className="absolute inset-0 h-full w-full object-cover"
                          src={clip.src}
                          controls
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 ring-1 ring-border">
                            <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-muted-foreground" />
                          </span>
                          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Footage coming
                          </span>
                        </div>
                      )}
                    </div>
                    <figcaption className="mt-3 flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.18em] text-foreground/80">
                        {clip.label}
                      </span>
                      {clip.caption && (
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {clip.caption}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {project.gallery && project.gallery.length === 1 && (
              <div className="mt-12">
                <figure className="group flex flex-col">
                  <div
                    className={`relative w-full overflow-hidden rounded-sm ${
                      project.gallery[0].transparent
                        ? ''
                        : 'bg-foreground/5 ring-1 ring-border'
                    }`}
                    style={{ aspectRatio: project.gallery[0].aspect ?? '16 / 9' }}
                  >
                    <Image
                      src={project.gallery[0].src || '/placeholder.svg'}
                      alt={project.gallery[0].alt}
                      fill
                      sizes="(min-width: 1024px) 960px, 100vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {project.gallery[0].caption}
                  </figcaption>
                </figure>
              </div>
            )}

            {project.gallery && project.gallery.length > 1 && (
              <div className="mt-12">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                  {project.gallery.map((item, i) => (
                    <figure key={i} className="group flex flex-col">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-foreground/5 ring-1 ring-border">
                        <Image
                          src={item.src || '/placeholder.svg'}
                          alt={item.alt}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {project.disclaimer && (
              <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
                <span className="uppercase tracking-[0.18em] text-foreground/70">
                  Attribution ·{' '}
                </span>
                {project.disclaimer}
              </p>
            )}
          </div>
        </div>
      </article>

  {/* Next project */}
  <section className="border-t border-border">
  <Link
  href={`/work/${next.slug}`}
  className="group mx-auto flex max-w-7xl flex-col gap-4 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20 lg:px-10"
  >
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Next
            </p>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-foreground transition-colors group-hover:text-accent md:text-5xl">
              {next.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{next.role}</p>
          </div>
          <span className="text-accent transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
            &rarr;
          </span>
        </Link>
      </section>

      <SiteFooter showArtwork={false} />
    </main>
  )
}
