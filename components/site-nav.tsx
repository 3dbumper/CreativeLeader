'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Resume', href: '/resumeLeeWilliamson.pdf', download: 'resumeLeeWilliamson.pdf' },
  { label: 'Contact', href: '/#contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  // On the home page the hero shows its own "Lee Williamson" title, so the nav
  // brand only appears once scrolled. On every other page it's always shown so
  // it can act as a link back home.
  const showBrand = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 lg:px-10"
      >
        <a
          href="/"
          aria-hidden={!showBrand}
          tabIndex={showBrand ? 0 : -1}
          className={`font-serif text-lg tracking-tight transition-[color,opacity,transform] duration-500 md:text-xl ${
            showBrand
              ? 'text-foreground opacity-100 translate-y-0'
              : 'pointer-events-none -translate-y-1 text-foreground opacity-0'
          }`}
        >
          Lee <span className="text-muted-foreground">Williamson</span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                download={link.download}
                className={`group relative text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                  scrolled
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-on-image-muted hover:text-on-image'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`block h-px transition-all duration-300 ${
                scrolled || open ? 'bg-foreground' : 'bg-on-image'
              } ${open ? 'w-6 translate-y-[7px] rotate-45' : 'w-6'}`}
            />
            <span
              className={`block h-px transition-all duration-300 ${
                scrolled || open ? 'bg-foreground' : 'bg-on-image'
              } ${open ? 'w-6 opacity-0' : 'w-4'}`}
            />
            <span
              className={`block h-px transition-all duration-300 ${
                scrolled || open ? 'bg-foreground' : 'bg-on-image'
              } ${open ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-6'}`}
            />
          </div>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md transition-[max-height] duration-500 md:hidden ${
          open ? 'max-h-80' : 'max-h-0 border-t-transparent'
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-border/40 last:border-b-0">
              <a
                href={link.href}
                download={link.download}
                onClick={() => setOpen(false)}
                className="block py-4 text-sm uppercase tracking-[0.2em] text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
