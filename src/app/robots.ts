import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://agropricing.com.br'

  return {
    rules: [
      // Permitir crawlers principais
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
        crawlDelay: 1,
      },
      // Crawlers internacionais com delay maior
      {
        userAgent: ['Baiduspider', 'YandexBot'],
        allow: '/',
        crawlDelay: 2,
      },
      // Crawlers de redes sociais
      {
        userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp'],
        allow: '/',
      },
      // Bloquear crawlers indesejados
      {
        userAgent: ['AhrefsBot', 'MJ12bot', 'DotBot', 'SemrushBot'],
        disallow: '/',
      },
      // Permitir todos os outros
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
