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
        'border-2 border-gray-200 hover:border-primary',
        'bg-white hover:bg-primary/5 shadow-md hover:shadow-lg',
        'focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary',
        'thumb-zone'
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          'p-4 rounded-xl transition-transform',
          color,
          'group-hover:scale-110'
        )}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>
          <p className="text-base text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
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
      title: '📄 Melhorar Currículo',
      description: 'A inteligência artificial vai olhar seu currículo e dar dicas simples',
      href: '/curriculo/analise',
      color: 'bg-blue-500'
    },
    {
      icon: MessageSquare,
      title: '🗣️ Treinar Entrevista',
      description: 'Pratique responder perguntas de entrevista sem pressão',
      href: '/entrevista/simulacao',
      color: 'bg-green-500'
    },
    {
      icon: Search,
      title: '🔍 Achar Emprego',
      description: 'Encontre vagas de trabalho que combinam com você',
      href: '/vagas/busca',
      color: 'bg-purple-500'
    },
    {
      icon: BookOpen,
      title: '📚 Aprender Grátis',
      description: 'Cursos gratuitos para conseguir um emprego melhor',
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
            <h1 className="text-3xl font-bold text-foreground mb-2">
              🎯 Conseguir Emprego
            </h1>
            <p className="text-lg text-muted-foreground">
              Ajuda gratuita com inteligência artificial
            </p>
          </div>

          {/* Voice Command Hint */}
          <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Zap className="w-6 h-6" />
              <span className="font-bold text-lg">🎤 FALE E EU ENTENDO!</span>
            </div>
            <p className="text-base text-green-800 mb-3 font-medium">
              Aperte o botão azul e fale:
            </p>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border-2 border-green-200">
                <span className="font-bold text-green-800">"melhorar currículo"</span>
              </div>
              <div className="bg-white p-3 rounded border-2 border-green-200">
                <span className="font-bold text-green-800">"treinar entrevista"</span>
              </div>
              <div className="bg-white p-3 rounded border-2 border-green-200">
                <span className="font-bold text-green-800">"achar emprego"</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
            🚀 O que você quer fazer hoje?
          </h2>
          <div className="grid gap-6">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">
              💝 Por que criamos isso?
            </h2>
            <p className="text-lg text-blue-700 leading-relaxed">
              Acreditamos que <strong>toda pessoa merece ter um bom emprego</strong>. 
              Nossa inteligência artificial é gratuita e foi feita especialmente 
              para quem não tem dinheiro para pagar coaching caro.
            </p>
          </div>
        </section>

        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
            📋 Como usar em 3 passos simples
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-green-200 bg-green-50">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <span className="text-lg font-medium">Melhore seu currículo para chamar atenção</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <span className="text-lg font-medium">Treine entrevistas até ficar confiante</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-purple-200 bg-purple-50">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <span className="text-lg font-medium">Procure vagas que combinam com você</span>
            </div>
          </div>
        </section>

        {/* Accessibility Note */}
        <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 text-center border-2 border-yellow-300">
          <h3 className="font-bold text-xl text-gray-800 mb-3">📱 PERFEITO NO SEU CELULAR!</h3>
          <p className="text-lg text-gray-700 mb-4 font-medium">
            Use no ônibus, trem ou metrô sem problemas! 🚌🚇
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <div className="bg-white rounded-lg p-3 border-2 border-green-200">
              <span className="font-bold text-green-700">✅ Funciona sem internet</span>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-blue-200">
              <span className="font-bold text-blue-700">✅ Comando de voz</span>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
              <span className="font-bold text-purple-700">✅ Botões grandes</span>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-gray-400">
              <span className="font-bold text-gray-700">✅ Tela escura</span>
            </div>
          </div>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
            <span className="text-lg font-bold text-yellow-800">
              💡 DICA: Adicione na tela inicial do celular como um app!
            </span>
          </div>
        </section>
      </div>
    </MobileLayout>
  )
}