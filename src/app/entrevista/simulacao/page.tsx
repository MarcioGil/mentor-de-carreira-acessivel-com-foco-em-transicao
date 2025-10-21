'use client'

import { useState, useEffect } from 'react'
import { MobileLayout } from '@/components/mobile/MobileLayout'
import { 
  MessageSquare, 
  ArrowLeft, 
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Mic,
  Volume2,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const perguntasComuns = [
  "Me fale sobre você.",
  "Por que você quer trabalhar aqui?",
  "Qual é o seu maior defeito?",
  "Onde você se vê em 5 anos?",
  "Por que você está deixando seu emprego atual?",
  "Conte sobre um desafio que você enfrentou no trabalho.",
  "Qual é o seu maior orgulho profissional?",
  "Como você lida com pressão?",
  "Você tem alguma pergunta para nós?",
  "Qual é o seu salário esperado?"
]

const dicasResposta = {
  "Me fale sobre você.": "Foque em sua experiência profissional e como ela se relaciona com a vaga. Mantenha em 2-3 minutos.",
  "Por que você quer trabalhar aqui?": "Mostre que pesquisou sobre a empresa. Fale sobre os valores e missão que te atraem.",
  "Qual é o seu maior defeito?": "Escolha algo real, mas mostre como você está trabalhando para melhorar.",
  "Onde você se vê em 5 anos?": "Demonstre ambição, mas seja realista. Conecte com a carreira na empresa.",
  "Por que você está deixando seu emprego atual?": "Seja positivo. Foque em crescimento e novas oportunidades, não críticas.",
  "Conte sobre um desafio que você enfrentou no trabalho.": "Use o método STAR: Situação, Tarefa, Ação, Resultado.",
  "Qual é o seu maior orgulho profissional?": "Escolha algo relevante para a vaga. Quantifique os resultados se possível.",
  "Como você lida com pressão?": "Dê exemplos concretos de como você mantém a calma e produtividade.",
  "Você tem alguma pergunta para nós?": "SEMPRE tenha perguntas! Sobre a cultura, crescimento, desafios da posição.",
  "Qual é o seu salário esperado?": "Pesquise o mercado antes. Seja flexível mas conheça seu valor."
}

export default function SimulacaoEntrevistaPage() {
  const router = useRouter()
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostaUsuario, setRespostaUsuario] = useState('')
  const [simulacaoIniciada, setSimulacaoIniciada] = useState(false)
  const [temporizador, setTemporizador] = useState(0)
  const [cronometroAtivo, setCronometroAtivo] = useState(false)
  const [respostas, setRespostas] = useState<string[]>([])
  const [feedbackAtual, setFeedbackAtual] = useState('')
  const [mostrarDica, setMostrarDica] = useState(false)
  const [simulacaoCompleta, setSimulacaoCompleta] = useState(false)

  useEffect(() => {
    let intervalo: NodeJS.Timeout
    if (cronometroAtivo) {
      intervalo = setInterval(() => {
        setTemporizador(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(intervalo)
  }, [cronometroAtivo])

  const iniciarSimulacao = () => {
    setSimulacaoIniciada(true)
    setPerguntaAtual(0)
    setRespostas([])
    setTemporizador(0)
    setCronometroAtivo(true)
    setSimulacaoCompleta(false)
  }

  const proximaPergunta = () => {
    if (respostaUsuario.trim()) {
      setRespostas(prev => [...prev, respostaUsuario])
      
      // Feedback simples baseado no comprimento da resposta
      if (respostaUsuario.length < 20) {
        setFeedbackAtual('⚠️ Sua resposta está muito curta. Tente elaborar mais.')
      } else if (respostaUsuario.length > 300) {
        setFeedbackAtual('⚠️ Sua resposta está muito longa. Seja mais conciso.')
      } else {
        setFeedbackAtual('✅ Boa resposta! Continue assim.')
      }
      
      if (perguntaAtual < perguntasComuns.length - 1) {
        setPerguntaAtual(prev => prev + 1)
        setRespostaUsuario('')
        setTemporizador(0)
        setMostrarDica(false)
      } else {
        finalizarSimulacao()
      }
    } else {
      alert('Por favor, digite sua resposta antes de continuar.')
    }
  }

  const finalizarSimulacao = () => {
    setCronometroAtivo(false)
    setSimulacaoCompleta(true)
  }

  const reiniciarSimulacao = () => {
    setSimulacaoIniciada(false)
    setPerguntaAtual(0)
    setRespostaUsuario('')
    setTemporizador(0)
    setCronometroAtivo(false)
    setRespostas([])
    setFeedbackAtual('')
    setSimulacaoCompleta(false)
  }

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60)
    const sec = segundos % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const calcularPontuacao = () => {
    let pontos = 0
    respostas.forEach(resposta => {
      if (resposta.length >= 50 && resposta.length <= 250) pontos += 20
      else if (resposta.length >= 20) pontos += 10
    })
    return Math.min(pontos, 100)
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">🗣️ Treinar Entrevista</h1>
              <p className="text-gray-600">Pratique sem pressão e ganhe confiança</p>
            </div>
          </div>

          {!simulacaoIniciada ? (
            /* Tela inicial */
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Pronto para treinar?
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Vou fazer 10 perguntas comuns de entrevista. 
                Responda com calma, como se fosse uma entrevista real.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Sem Julgamento</h3>
                  <p className="text-green-700 text-sm">Ambiente seguro para praticar</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">💡 Dicas Incluídas</h3>
                  <p className="text-blue-700 text-sm">Orientações para cada pergunta</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">📊 Feedback</h3>
                  <p className="text-purple-700 text-sm">Avaliação das suas respostas</p>
                </div>
              </div>

              <button
                onClick={iniciarSimulacao}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <Play className="w-6 h-6" />
                Começar Simulação
              </button>
            </div>
          ) : simulacaoCompleta ? (
            /* Tela de resultado */
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Parabéns! Simulação Completa
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{respostas.length}</div>
                  <div className="text-blue-800 text-sm">Perguntas Respondidas</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{calcularPontuacao()}%</div>
                  <div className="text-green-800 text-sm">Pontuação</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{formatarTempo(temporizador)}</div>
                  <div className="text-purple-800 text-sm">Tempo Total</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-gray-900 mb-3">📝 Resumo do Desempenho:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Respondeu todas as perguntas</li>
                  <li>✅ Demonstrou preparação</li>
                  <li>💡 Continue praticando para melhorar ainda mais</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={reiniciarSimulacao}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Treinar Novamente
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Voltar ao Início
                </button>
              </div>
            </div>
          ) : (
            /* Tela da simulação */
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Pergunta {perguntaAtual + 1} de {perguntasComuns.length}</span>
                  <span>Tempo: {formatarTempo(temporizador)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((perguntaAtual + 1) / perguntasComuns.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Pergunta atual */}
              <div className="mb-6">
                <div className="bg-blue-50 p-6 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    🤔 Pergunta do Entrevistador:
                  </h3>
                  <p className="text-xl text-blue-800">
                    "{perguntasComuns[perguntaAtual]}"
                  </p>
                </div>

                {/* Botão para mostrar dica */}
                <button
                  onClick={() => setMostrarDica(!mostrarDica)}
                  className="mb-4 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
                >
                  💡 {mostrarDica ? 'Esconder' : 'Ver'} Dica
                </button>

                {/* Dica */}
                {mostrarDica && (
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <p className="text-purple-800">
                      <strong>💡 Dica:</strong> {dicasResposta[perguntasComuns[perguntaAtual] as keyof typeof dicasResposta]}
                    </p>
                  </div>
                )}
              </div>

              {/* Área de resposta */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🗣️ Sua Resposta:
                </label>
                <textarea
                  value={respostaUsuario}
                  onChange={(e) => setRespostaUsuario(e.target.value)}
                  placeholder="Digite sua resposta aqui... Fale como se estivesse em uma entrevista real."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-lg"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {respostaUsuario.length} caracteres
                </div>
              </div>

              {/* Feedback da resposta anterior */}
              {feedbackAtual && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">{feedbackAtual}</p>
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex gap-4">
                <button
                  onClick={proximaPergunta}
                  disabled={!respostaUsuario.trim()}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  {perguntaAtual < perguntasComuns.length - 1 ? 'Próxima Pergunta' : 'Finalizar'}
                </button>
                <button
                  onClick={reiniciarSimulacao}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Parar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}