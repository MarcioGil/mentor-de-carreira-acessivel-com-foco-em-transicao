'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Brain, 
  FileText, 
  MessageSquare, 
  Search, 
  BookOpen, 
  TrendingUp,
  Zap,
  Heart,
  Users,
  Target,
  ChevronRight
} from 'lucide-react'
import { MobileLayout } from '@/components/mobile/MobileLayout'
import { cn } from '@/lib/utils'

interface QuickActionProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  color: string
}

function QuickAction({ icon: Icon, title, description, href, color }: QuickActionProps) {
  const router = useRouter()
  
  return (
    <button
      onClick={() => router.push(href)}
      className={cn(
        'group w-full p-6 rounded-xl text-left transition-all duration-200',
        'border border-border hover:border-primary/50',
        'bg-background hover:bg-primary/5',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
        'thumb-zone'
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          'p-3 rounded-lg transition-colors',
          color,
          'group-hover:scale-110 transition-transform'
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  )
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  color: string
}

function StatCard({ icon: Icon, value, label, color }: StatCardProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg border border-border bg-background/50',
      'backdrop-blur-sm'
    )}>
      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg', color)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-lg text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simular carregamento de dados do usuário
    const loadUserData = async () => {
      try {
        // TODO: Implementar carregamento real dos dados
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUserName('Usuário') // Placeholder
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [])

  const quickActions = [
    {
      icon: FileText,
      title: 'Analisar Currículo',
      description: 'IA analisa seu currículo e sugere melhorias baseadas nas vagas do mercado',
      href: '/curriculo/analise',
      color: 'bg-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Simular Entrevista',
      description: 'Pratique entrevistas com IA adaptada ao seu perfil e vaga desejada',
      href: '/entrevista/simulacao',
      color: 'bg-green-500'
    },
    {
      icon: Search,
      title: 'Buscar Vagas',
      description: 'Encontre oportunidades personalizadas com base no seu perfil',
      href: '/vagas/busca',
      color: 'bg-purple-500'
    },
    {
      icon: BookOpen,
      title: 'Cursos e Capacitação',
      description: 'Desenvolva habilidades em demanda no mercado de trabalho',
      href: '/cursos',
      color: 'bg-orange-500'
    }
  ]

  const stats = [
    {
      icon: Users,
      value: '15k+',
      label: 'Usuários ativos',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      value: '89%',
      label: 'Taxa de sucesso',
      color: 'bg-green-500'
    },
    {
      icon: TrendingUp,
      value: '2.3x',
      label: 'Aumento salarial',
      color: 'bg-purple-500'
    },
    {
      icon: Heart,
      value: '4.9',
      label: 'Avaliação média',
      color: 'bg-red-500'
    }
  ]

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout showNavigation={true}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <section className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Olá, {userName}! 👋
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo à sua jornada de desenvolvimento profissional com IA
            </p>
          </div>

          {/* Voice Command Hint */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Comando de Voz Ativo!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Diga "analisar currículo", "simular entrevista" ou "buscar vagas" 
              para navegar sem usar as mãos
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Ações Rápidas
          </h2>
          <div className="grid gap-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Impacto da Plataforma
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gradient-to-br from-primary/10 to-purple/10 rounded-xl p-6 border border-primary/20">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Nossa Missão
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Democratizar o acesso a mentoria de carreira de qualidade através 
              da inteligência artificial, especialmente para jovens em 
              vulnerabilidade social e pessoas em transição profissional.
            </p>
          </div>
        </section>

        {/* Getting Started */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Como Começar
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="text-sm">Analise seu currículo para identificar pontos de melhoria</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm">Pratique entrevistas para ganhar confiança</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-sm">Busque vagas alinhadas com seu perfil</span>
            </div>
          </div>
        </section>

        {/* Accessibility Note */}
        <section className="bg-muted/50 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">💡 Dica:</span> Use comandos de voz no ônibus, 
            trem ou metrô. Nossa plataforma foi pensada para ser acessível em qualquer situação!
          </p>
        </section>
      </div>
    </MobileLayout>
  )
}