import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AgroPricing - Transforme Sua Consultoria Agropecuária com IA",
    template: "%s | AgroPricing - Consultoria Agropecuária Inteligente"
  },
  description: "Pare de perder dinheiro com precificação inadequada. Nossa IA especializada cria propostas profissionais em minutos para consultores do agronegócio brasileiro. Precificação inteligente com dados regionalizados. Cadastre-se na lista VIP e garanta 50% OFF.",
  keywords: [
    // Palavras-chave primárias
    "consultoria agropecuária", "precificação agrícola", "IA agronegócio", "consultores rurais",
    // Long-tail keywords específicas
    "como precificar consultoria agropecuária", "consultoria agrícola preços", "proposta comercial agronegócio",
    "consultoria rural valores", "precificação serviços agrícolas", "consultoria agropecuária brasil",
    // Tecnologia e automação
    "inteligência artificial agronegócio", "automação consultoria rural", "tecnologia agropecuária",
    "software consultoria agrícola", "sistema precificação agronegócio", "plataforma consultoria rural",
    // Segmentação geográfica
    "consultoria agropecuária brasil", "consultores rurais brasileiros", "agronegócio brasileiro",
    "consultoria agrícola mato grosso", "consultoria rural são paulo", "agronegócio rio grande do sul",
    // Benefícios e resultados
    "aumentar lucro consultoria rural", "otimizar preços agronegócio", "propostas profissionais agricultura",
    "consultoria agropecuária lucrativa", "precificação assertiva agronegócio"
  ],
  authors: [{ name: "Trimobe", url: "https://agropricing.com.br" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon.ico',
      }
    ],
  },
  creator: "Trimobe",
  publisher: "Trimobe",
  metadataBase: new URL('https://agropricing.com.br'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  openGraph: {
    title: "AgroPricing - Transforme Sua Consultoria Agropecuária com IA | 50% OFF Lista VIP",
    description: "Pare de perder dinheiro com precificação inadequada! Nossa IA cria propostas profissionais em minutos para consultores do agronegócio brasileiro. Precificação inteligente com dados regionalizados. Cadastre-se na lista VIP e garanta 50% OFF no lançamento.",
    url: "https://agropricing.com.br",
    siteName: "AgroPricing",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AgroPricing - Plataforma de IA para Consultoria Agropecuária - Precificação Inteligente e Propostas Profissionais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgroPricing - Consultoria Agropecuária com IA | 50% OFF",
    description: "Pare de perder dinheiro com precificação inadequada! IA especializada para consultores do agronegócio brasileiro. Lista VIP com 50% OFF.",
    images: ["/og-image.jpg"],
    creator: "@agropricing",
    site: "@agropricing"
  },
  alternates: {
    canonical: "https://agropricing.com.br",
    languages: {
      'pt-BR': 'https://agropricing.com.br',
    },
  },
  category: "Business Software",
  classification: "Agricultural Technology",
  other: {
    // Theme e visual
    'theme-color': '#7c3aed',
    'color-scheme': 'light',
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
    // SEO específico
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'AgroPricing',
    'application-name': 'AgroPricing',
    'msapplication-TileColor': '#7c3aed',
    'msapplication-config': '/browserconfig.xml',
    // Geo-targeting Brasil
    'geo.region': 'BR',
    'geo.country': 'Brazil',
    'distribution': 'global',
    'target': 'all',
    'audience': 'all',
    'coverage': 'Worldwide',
    'rating': 'General',
    'referrer': 'no-referrer-when-downgrade',
    // Business específico
    'business:contact_data:locality': 'Brasil',
    'business:contact_data:country_name': 'Brazil',
    'business:contact_data:email': 'contato@trimobe.com',
    // Produto específico
    'product:brand': 'AgroPricing',
    'product:availability': 'preorder',
    'product:condition': 'new',
    'product:price:amount': '124.00',
    'product:price:currency': 'BRL',
    // Article tags para melhor categorização
    'article:author': 'Trimobe',
    'article:publisher': 'https://agropricing.com.br',
    'article:section': 'Agronegócio',
    'article:tag': 'consultoria agropecuária, IA, precificação, agronegócio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://agropricing.com.br/#organization",
        "name": "Trimobe",
        "url": "https://agropricing.com.br",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://agropricing.com.br/#logo",
          "url": "https://agropricing.com.br/favicon.svg",
          "width": 512,
          "height": 512,
          "caption": "Logo da Trimobe - Empresa desenvolvedora do AgroPricing"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+55-11-99999-9999",
            "contactType": "customer service",
            "email": "contato@trimobe.com",
            "availableLanguage": "Portuguese",
            "areaServed": "BR"
          }
        ],
        "sameAs": [
          "https://instagram.com/trimobe",
          "https://linkedin.com/company/trimobe"
        ],
        "foundingDate": "2024",
        "foundingLocation": {
          "@type": "Country",
          "name": "Brasil"
        },
        "numberOfEmployees": "1-10",
        "industry": "Software de Tecnologia Agrícola",
        "description": "Desenvolvimento de soluções de IA para consultoria agropecuária brasileira"
      },
      {
        "@type": "WebSite",
        "@id": "https://agropricing.com.br/#website",
        "url": "https://agropricing.com.br",
        "name": "AgroPricing",
        "description": "Plataforma de IA para consultores agropecuários brasileiros com precificação inteligente",
        "publisher": {
          "@id": "https://agropricing.com.br/#organization"
        },
        "inLanguage": "pt-BR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://agropricing.com.br/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://agropricing.com.br/#softwareapplication",
        "name": "AgroPricing Pro",
        "description": "Plataforma de IA especializada para consultores agropecuários brasileiros com precificação inteligente e propostas profissionais automatizadas",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "provider": {
          "@id": "https://agropricing.com.br/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": "124.00",
          "priceCurrency": "BRL",
          "priceValidUntil": "2025-03-31",
          "availability": "https://schema.org/PreOrder",
          "description": "Acesso antecipado com 50% de desconto para os primeiros 100 usuários",
          "seller": {
            "@id": "https://agropricing.com.br/#organization"
          }
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Consultores Agropecuários",
          "geographicArea": {
            "@type": "Country",
            "name": "Brasil"
          }
        },
        "areaServed": {
          "@type": "Country",
          "name": "Brasil"
        },
        "keywords": "consultoria agropecuária, IA, precificação, agronegócio, Brasil",
        "url": "https://agropricing.com.br",
        "image": "https://agropricing.com.br/og-image.jpg"
      },
      {
        "@type": "WebPage",
        "@id": "https://agropricing.com.br/#webpage",
        "url": "https://agropricing.com.br",
        "name": "AgroPricing - Transforme Sua Consultoria Agropecuária com IA",
        "description": "Pare de perder dinheiro com precificação inadequada. Nossa IA cria propostas profissionais em minutos para consultores do agronegócio brasileiro",
        "isPartOf": {
          "@id": "https://agropricing.com.br/#website"
        },
        "inLanguage": "pt-BR",
        "mainEntity": {
          "@type": "Service",
          "name": "Consultoria Agropecuária com IA",
          "description": "Serviço de precificação inteligente e geração de propostas para consultores do agronegócio brasileiro",
          "provider": {
            "@id": "https://agropricing.com.br/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Brasil"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://agropricing.com.br/#faqpage",
        "url": "https://agropricing.com.br/#faq",
        "name": "Perguntas Frequentes - AgroPricing",
        "description": "Dúvidas dos prestadores de serviços do agronegócio sobre o AgroPricing",
        "inLanguage": "pt-BR",
        "isPartOf": {
          "@id": "https://agropricing.com.br/#webpage"
        },
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Como a IA garante preços assertivos para minha área de atuação no agronegócio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nossa IA foi treinada especificamente com dados do agronegócio brasileiro, considerando especificidades regionais, sazonalidade e características únicas do setor. Cada preço é calculado com base em dados reais, eliminando o 'chute' e dando embasamento técnico para suas cobranças."
            }
          },
          {
            "@type": "Question",
            "name": "As propostas realmente vão me fazer parecer mais profissional?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutamente! Nossas propostas incluem análises técnicas detalhadas, justificativas embasadas, cálculos regionalizados e apresentação visual impecável. Seus clientes vão perceber imediatamente o aumento no seu nível de profissionalismo."
            }
          },
          {
            "@type": "Question",
            "name": "A ferramenta funciona para todos os tipos de serviços agropecuários?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! O AgroPricing é desenvolvido para atender todo o espectro de prestadores de serviços do agronegócio brasileiro, considerando as particularidades e complexidades específicas do setor, independente da sua área de especialização."
            }
          },
          {
            "@type": "Question",
            "name": "Como posso ter certeza de que não vou mais errar nos preços?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A IA utiliza dados regionais precisos, considera fatores específicos do agronegócio e oferece cálculos automatizados. Você terá justificativa técnica para cada valor, eliminando a insegurança e o medo de precificar incorretamente."
            }
          },
          {
            "@type": "Question",
            "name": "E se meus clientes questionarem os valores mais altos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Com o AgroPricing, você terá embasamento técnico completo para justificar seus preços. As propostas incluem análises detalhadas que demonstram o valor do seu trabalho especializado no agronegócio."
            }
          },
          {
            "@type": "Question",
            "name": "Quanto tempo leva para ver resultados na minha credibilidade?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A transformação é imediata! Na primeira proposta gerada, seus clientes já percebem o aumento de profissionalismo. Em 30 dias, você estará estabelecido como referência técnica na sua região."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://agropricing.com.br/#breadcrumblist",
        "name": "Navegação do Site",
        "description": "Estrutura de navegação do AgroPricing",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://agropricing.com.br"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Consultoria Agropecuária",
            "item": "https://agropricing.com.br/#consultoria"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Precificação com IA",
            "item": "https://agropricing.com.br/#precificacao"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "FAQ",
            "item": "https://agropricing.com.br/#faq"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Lista de Espera",
            "item": "https://agropricing.com.br/#lista-espera"
          }
        ]
      }
    ]
  };

  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Manifest PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/favicon.svg" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-square70x70logo" content="/favicon.svg" />
        <meta name="msapplication-square150x150logo" content="/favicon.svg" />
        <meta name="msapplication-wide310x150logo" content="/favicon.svg" />
        <meta name="msapplication-square310x310logo" content="/favicon.svg" />
      </head>
      <body itemScope itemType="https://schema.org/WebPage">
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
          <main role="main" itemScope itemType="https://schema.org/SoftwareApplication">
            <meta itemProp="name" content="AgroPricing" />
            <meta itemProp="applicationCategory" content="BusinessApplication" />
            <meta itemProp="operatingSystem" content="Web" />
            <meta itemProp="description" content="Plataforma de IA para consultoria agropecuária com precificação inteligente" />
            <meta itemProp="offers" itemScope itemType="https://schema.org/Offer" />
            <meta itemProp="price" content="124.00" />
            <meta itemProp="priceCurrency" content="BRL" />
            <meta itemProp="availability" content="https://schema.org/PreOrder" />
            
            {children}
          </main>
          
          {/* Footer com dados estruturados */}
          <footer role="contentinfo" itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="Trimobe" />
            <meta itemProp="url" content="https://agropricing.com.br" />
            <meta itemProp="logo" content="https://agropricing.com.br/favicon.svg" />
            <meta itemProp="foundingDate" content="2024" />
            <meta itemProp="foundingLocation" content="Brasil" />
            <meta itemProp="industry" content="Agricultural Technology" />
            <meta itemProp="knowsAbout" content="Consultoria Agropecuária, Inteligência Artificial, Precificação" />
          </footer>
        </div>
      </body>
    </html>
  );
}
