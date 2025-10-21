'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  MessageSquare, 
  Search, 
  BookOpen, 
  User,
  ChevronLeft,
  Settings
} from 'lucide-react'
import { VoiceButton } from '@/components/voice/VoiceButton'
import { cn } from '@/lib/utils'

interface MobileLayoutProps {
  children: ReactNode
  title?: string
  showBackButton?: boolean
  showNavigation?: boolean
  className?: string
}

// Definir rotas de navegação
const NAVIGATION_ROUTES = [
  {
    path: '/',
    label: 'Início',
    icon: Home,
    description: 'Página inicial'
  },
  {
    path: '/curriculo',
    label: 'Currículo',
    icon: FileText,
    description: 'Análise de currículo'
  },
  {
    path: '/entrevista',
    label: 'Entrevista',
    icon: MessageSquare,
    description: 'Simulação de entrevistas'
  },
  {
    path: '/vagas',
    label: 'Vagas',
    icon: Search,
    description: 'Busca de oportunidades'
  },
  {
    path: '/cursos',
    label: 'Cursos',
    icon: BookOpen,
    description: 'Treinamentos e capacitação'
  },
  {
    path: '/perfil',
    label: 'Perfil',
    icon: User,
    description: 'Meu perfil'
  }
] as const

export function MobileLayout({ 
  children, 
  title, 
  showBackButton = false,
  showNavigation = true,
  className 
}: MobileLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Detectar scroll para efeitos visuais
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menu ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevenir scroll do body quando menu aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Obter rota ativa
  const activeRoute = NAVIGATION_ROUTES.find(route => 
    pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path))
  )

  // Título dinâmico baseado na rota
  const pageTitle = title || activeRoute?.label || 'Mentor de Carreira'

  // Handler para navegação
  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Mobile */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-header',
        'flex items-center justify-between',
        'px-4 py-3 bg-background/95 backdrop-blur-sm',
        'border-b border-border',
        'transition-all duration-200',
        'safe-area-inset-top',
        isScrolled && 'shadow-sm bg-background/98'
      )}>
        {/* Lado esquerdo - Back/Menu */}
        <div className="flex items-center">
          {showBackButton ? (
            <button
              onClick={() => router.back()}
              className="thumb-zone p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Voltar"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="thumb-zone p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Centro - Título */}
        <h1 className="text-lg font-semibold text-center flex-1 truncate px-4">
          {pageTitle}
        </h1>

        {/* Lado direito - Configurações */}
        <button
          onClick={() => router.push('/configuracoes')}
          className="thumb-zone p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Configurações"
        >
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Menu Lateral */}
      <aside className={cn(
        'fixed inset-0 z-menu',
        'transform transition-transform duration-300 ease-out',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <nav className="relative w-80 max-w-[85vw] h-full bg-background border-r border-border shadow-xl">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-border safe-area-inset-top">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="thumb-zone p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            {NAVIGATION_ROUTES.map((route) => {
              const Icon = route.icon
              const isActive = pathname === route.path || 
                             (route.path !== '/' && pathname.startsWith(route.path))

              return (
                <button
                  key={route.path}
                  onClick={() => handleNavigation(route.path)}
                  className={cn(
                    'w-full flex items-center gap-3 px-6 py-4',
                    'text-left transition-colors',
                    'hover:bg-muted',
                    'focus:outline-none focus:bg-muted',
                    'border-l-4 border-transparent',
                    isActive && 'bg-primary/10 border-l-primary text-primary font-medium'
                  )}
                  aria-label={`Ir para ${route.description}`}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{route.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {route.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Menu Footer */}
          <div className="border-t border-border p-4 safe-area-inset-bottom">
            <div className="text-sm text-muted-foreground text-center">
              Mentor de Carreira
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">
              Versão 1.0.0
            </div>
          </div>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className={cn(
        'pt-header pb-navigation', // Espaçamento para header e nav
        'safe-area-inset-x safe-area-inset-bottom',
        'min-h-screen',
        className
      )}>
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      {showNavigation && (
        <nav className={cn(
          'fixed bottom-0 left-0 right-0 z-navigation',
          'bg-background/95 backdrop-blur-sm border-t border-border',
          'safe-area-inset-bottom',
          'grid grid-cols-4 gap-1 px-2 py-2'
        )}>
          {NAVIGATION_ROUTES.slice(0, 4).map((route) => {
            const Icon = route.icon
            const isActive = pathname === route.path || 
                           (route.path !== '/' && pathname.startsWith(route.path))

            return (
              <button
                key={route.path}
                onClick={() => handleNavigation(route.path)}
                className={cn(
                  'thumb-zone flex flex-col items-center justify-center',
                  'py-2 px-1 rounded-lg transition-colors',
                  'focus:outline-none focus:bg-muted',
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                aria-label={route.description}
              >
                <Icon className={cn(
                  'w-6 h-6 mb-1',
                  isActive && 'scale-110'
                )} />
                <span className={cn(
                  'text-xs font-medium',
                  isActive && 'font-semibold'
                )}>
                  {route.label}
                </span>
              </button>
            )
          })}
        </nav>
      )}

      {/* Botão de Voz Flutuante */}
      <VoiceButton 
        position="fixed"
        size="lg"
        className="bottom-20 right-4 z-voice-button"
      />
    </div>
  )
}