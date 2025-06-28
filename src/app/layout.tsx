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
  title: "AgroPricing",
  description: "Plataforma de IA especializada para consultores agropecuários brasileiros. Precificação inteligente, propostas profissionais em minutos. 50% OFF para os primeiros 100 usuários.",
  keywords: [
    "consultoria agropecuária",
    "precificação agrícola", 
    "IA agronegócio",
    "consultores rurais",
    "propostas comerciais",
    "agronegócio brasileiro",
    "consultoria rural",
    "pricing agricultura",
    "tecnologia agrícola",
    "consultoria agrícola"
  ],
  authors: [{ name: "Trimobe" }],
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
    title: "AgroPricing - Precificação Inteligente para Consultores do Agronegócio",
    description: "Revolucione sua consultoria agrícola com IA. Precificação inteligente e propostas profissionais em minutos. Teste gratuito de 7 dias!",
    url: "https://agropricing.com.br",
    siteName: "AgroPricing",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AgroPricing - Precificação Inteligente para Consultores do Agronegócio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgroPricing - Precificação Inteligente para Consultores do Agronegócio",
    description: "Revolucione sua consultoria agrícola com IA. Precificação inteligente e propostas profissionais em minutos.",
    images: ["/og-image.jpg"],
    creator: "@agropricing",
  },
  alternates: {
    canonical: "https://agropricing.com.br",
  },
  category: "technology",
  other: {
    'theme-color': '#7c3aed',
    'color-scheme': 'light',
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
