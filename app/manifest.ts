import type { MetadataRoute } from 'next'
import { siteDescription, siteName, siteTitle } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: siteName,
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f6f9',
    theme_color: '#f5f6f9',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
