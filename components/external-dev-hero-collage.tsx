'use client'

import Image from 'next/image'

export function ExternalDevHeroCollage({
  variant = 'hero',
}: {
  variant?: 'hero' | 'thumb'
}) {
  const isThumb = variant === 'thumb'

  return (
    <figure
      className={`relative h-full w-full overflow-hidden ${isThumb ? 'bg-[#f2ede2]' : 'bg-transparent'}`}
      aria-label="External Development collage featuring VOLTA environment banners, a female astronaut character turnaround, a Call of Duty: Mobile pigeon character sheet, a sugar-skull guitar keychain, and a moonlit antlered forest creature"
    >
      <Image
        src="/images/extdev/external-development-collage.png"
        alt="External Development collage with VOLTA environment concept banners, a female astronaut character turnaround, illustrated pigeon operators, a sugar-skull guitar keychain, and an antlered forest creature"
        fill
        priority
        sizes={isThumb ? '(max-width: 768px) 100vw, 50vw' : '100vw'}
        className={
          isThumb ? 'object-cover object-[28%_50%]' : 'object-contain'
        }
      />
      <Image
        src="/images/cod-mobile-logo.png"
        alt="Call of Duty: Mobile logo"
        width={512}
        height={170}
        className={`pointer-events-none absolute right-3 z-10 h-auto w-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] ${
          isThumb
            ? 'bottom-3 w-[24%] max-w-[130px]'
            : 'bottom-[15%] w-[16%] max-w-[130px]'
        }`}
      />
    </figure>
  )
}
