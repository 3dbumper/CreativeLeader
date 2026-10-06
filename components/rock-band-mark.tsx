import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Official Rock Band 4 (Harmonix) logo lockup.
 * The rendered height tracks the inherited font-size (`text-*` on the
 * className), so callers keep scaling it the same way as the old
 * typographic mark; width follows the logo's aspect ratio.
 */
export function RockBandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none inline-flex select-none items-center leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]',
        className,
      )}
    >
      <Image
        src="/images/rock-band-4-pin.webp"
        alt="Rock Band 4 — Harmonix logo"
        width={500}
        height={258}
        priority={false}
        className="h-[2em] w-auto object-contain"
      />
    </div>
  )
}
