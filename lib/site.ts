const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  : productionHost
    ? `https://${productionHost}`
    : 'http://localhost:3000'

export const siteName = 'Lee Williamson'
export const siteTitle = 'Lee Williamson - Creative Leader | AAA Game Development'
export const siteDescription =
  'Lee Williamson is a creative leader with extensive experience in AAA game production and external development.'
