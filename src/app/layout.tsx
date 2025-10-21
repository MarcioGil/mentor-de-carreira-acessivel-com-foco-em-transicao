import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProviders } from '@/components/providers/AppProviders'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Mentor de Carreira',
    template: '%s | Mentor de Carreira'
  },
  description: 'Plataforma de mentoria de carreira com IA, análise de currículo, simulação de entrevistas e busca de vagas. Acessível por voz para uso em transporte público.',
  keywords: [
    'carreira',
    'mentoria',
    'inteligência artificial',
    'currículo',
    'entrevista',
    'vagas',
    'emprego',
    'acessibilidade',
    'voz',
    'mobile'
  ],
  authors: [{ name: 'Mentor de Carreira Team' }],
  creator: 'Mentor de Carreira',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mentor-carreira.vercel.app',
    title: 'Mentor de Carreira - IA para Desenvolvimento Profissional',
    description: 'Plataforma revolucionária com IA para mentoria de carreira, acessível por voz para jovens em transição profissional.',
    siteName: 'Mentor de Carreira',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mentor de Carreira - Plataforma de IA para Desenvolvimento de Carreira',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentor de Carreira - IA para Desenvolvimento Profissional',
    description: 'Plataforma com IA para mentoria de carreira, acessível por voz. Análise de currículo, simulação de entrevistas e busca de vagas.',
    images: ['/twitter-image.png'],
  },
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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mentor de Carreira',
  },
  category: 'education',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="pt-BR" 
      className={cn(inter.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Mentor de Carreira" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mentor de Carreira" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-touch-icon-167x167.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Splash Screens */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-2048-2732.jpg" sizes="2048x2732" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1668-2224.jpg" sizes="1668x2224" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1536-2048.jpg" sizes="1536x2048" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1125-2436.jpg" sizes="1125x2436" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1242-2208.jpg" sizes="1242x2208" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-750-1334.jpg" sizes="750x1334" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-640-1136.jpg" sizes="640x1136" />
        
        {/* Performance Preloads */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body 
        className={cn(
          'min-h-screen bg-background text-foreground antialiased',
          'font-sans selection:bg-primary/20 selection:text-primary-foreground',
          // Mobile optimizations
          'touch-pan-x touch-pan-y',
          // Prevent zoom on input focus
          '[&_input]:text-base [&_textarea]:text-base [&_select]:text-base',
          // Safe area support
          'supports-[height:100dvh]:min-h-dvh'
        )}
      >
        <AppProviders>
          {children}
          <ToastContainer />
        </AppProviders>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                  }).then(function(registration) {
                    console.log('SW registered: ', registration);
                  }).catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}