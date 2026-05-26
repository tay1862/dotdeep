import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DotDeep Design Studio',
    short_name: 'DotDeep',
    description: 'Creative design studio in Vientiane, Laos — Graphic Design, Web Development, UI/UX, Video Production',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5282ff',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['design', 'business', 'productivity'],
    lang: 'en',
    dir: 'ltr',
  }
}
