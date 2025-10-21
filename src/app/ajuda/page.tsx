'use client'

import { MobileLayout } from '@/components/mobile/MobileLayout'
import { 
  MessageSquare, 
  Mic, 
  FileText, 
  Search, 
  BookOpen,
  ArrowLeft,
  Phone,
  Mail
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AjudaPage() {
  const router = useRouter()

  return (
    <MobileLayout showNavigation={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">
            🆘 Como usar o app
          </h1>
        </div>

        {/* Comandos de Voz */}
        <section className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Mic className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-800">🎤 Comandos de Voz</h2>
          </div>
          
          <div className="mb-4">
            <p className="text-lg text-blue-700 font-medium mb-3">
              Aperte o botão azul e fale uma dessas palavras:
            </p>
          </div>

          <div className="grid gap-3">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-100">
              <span className="font-bold text-blue-800 text-lg">"melhorar currículo"</span>
              <p className="text-gray-600 mt-1">Para a IA ajudar com seu currículo</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-green-100">
              <span className="font-bold text-green-800 text-lg">"treinar entrevista"</span>
              <p className="text-gray-600 mt-1">Para praticar perguntas de entrevista</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-purple-100">
              <span className="font-bold text-purple-800 text-lg">"achar emprego"</span>
              <p className="text-gray-600 mt-1">Para procurar vagas de trabalho</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-orange-100">
              <span className="font-bold text-orange-800 text-lg">"aprender"</span>
              <p className="text-gray-600 mt-1">Para ver cursos gratuitos</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
              <span className="font-bold text-gray-800 text-lg">"voltar"</span>
              <p className="text-gray-600 mt-1">Para voltar à página anterior</p>
            </div>
          </div>
        </section>

        {/* Como usar cada função */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            📚 Como usar cada função
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg">Melhorar Currículo</h3>
              </div>
              <p className="text-gray-700">
                1. Cole seu currículo na caixa de texto<br/>
                2. Cole a vaga que você quer na segunda caixa<br/>
                3. A IA vai te dar dicas de como melhorar
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-lg">Treinar Entrevista</h3>
              </div>
              <p className="text-gray-700">
                1. Escolha o tipo de vaga que você quer<br/>
                2. A IA vai fazer perguntas<br/>
                3. Responda como se fosse uma entrevista real<br/>
                4. Receba dicas para melhorar
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-lg">Achar Emprego</h3>
              </div>
              <p className="text-gray-700">
                1. Digite que tipo de trabalho você quer<br/>
                2. Escolha sua cidade<br/>
                3. Veja as vagas que combinam com você<br/>
                4. Clique para se candidatar
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-orange-600" />
                <h3 className="font-bold text-lg">Aprender Grátis</h3>
              </div>
              <p className="text-gray-700">
                1. Veja cursos gratuitos disponíveis<br/>
                2. Escolha algo que você precisa aprender<br/>
                3. Estude no seu tempo livre<br/>
                4. Coloque no currículo depois
              </p>
            </div>
          </div>
        </section>

        {/* Dicas importantes */}
        <section className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">
            💡 Dicas Importantes
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xl">🎤</span>
              <p className="text-yellow-800">
                <strong>Microfone:</strong> Quando o navegador perguntar, clique em "Permitir" para usar comandos de voz
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-xl">🔊</span>
              <p className="text-yellow-800">
                <strong>Falar claro:</strong> Fale devagar e perto do celular para a IA entender melhor
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-xl">📱</span>
              <p className="text-yellow-800">
                <strong>Instalar:</strong> Adicione o app na tela inicial do celular para usar mais fácil
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-xl">🌐</span>
              <p className="text-yellow-800">
                <strong>Internet:</strong> Precisa de internet para as funções da IA funcionarem
              </p>
            </div>
          </div>
        </section>

        {/* Suporte */}
        <section className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-800 mb-4">
            🆘 Precisa de mais ajuda?
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-red-100">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-6 h-6 text-red-600" />
                <span className="font-bold text-red-800">WhatsApp</span>
              </div>
              <p className="text-gray-700">
                (11) 99999-9999<br/>
                <small>Segunda a sexta, 9h às 18h</small>
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-red-100">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-6 h-6 text-red-600" />
                <span className="font-bold text-red-800">Email</span>
              </div>
              <p className="text-gray-700">
                ajuda@mentorcarreira.com.br<br/>
                <small>Resposta em até 24 horas</small>
              </p>
            </div>
          </div>
        </section>

        {/* Botão voltar */}
        <div className="text-center pt-4">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            🏠 Voltar ao início
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}