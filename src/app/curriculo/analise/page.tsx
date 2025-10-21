'use client'

import { useState } from 'react'
import { MobileLayout } from '@/components/mobile/MobileLayout'
import { 
  FileText, 
  ArrowLeft, 
  Upload,
  CheckCircle,
  AlertCircle,
  Brain
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AnalisecurriculoPage() {
  const router = useRouter()
  const [curriculo, setCurriculo] = useState('')
  const [vaga, setVaga] = useState('')
  const [analisando, setAnalisando] = useState(false)
  const [resultado, setResultado] = useState<any>(null)

  const analisarCurriculo = async () => {
    if (!curriculo.trim()) {
      alert('Por favor, cole seu currículo na primeira caixa')
      return
    }
    
    setAnalisando(true)
    
    // Simular análise por IA
    setTimeout(() => {
      const analiseSimulada = {
        compatibilidade: vaga ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20) + 60,
        pontosFortess: [
          'Experiência relevante na área',
          'Boa formação acadêmica',
          'Habilidades técnicas importantes'
        ],
        melhorias: [
          'Adicionar mais palavras-chave da vaga',
          'Destacar resultados quantificados',
          'Incluir certificações relevantes',
          'Melhorar descrição das experiências'
        ],
        proximosPassos: [
          'Adicione números aos seus resultados (ex: "aumentei vendas em 20%")',
          'Use palavras da descrição da vaga no seu currículo',
          'Destaque suas habilidades técnicas mais importantes'
        ]
      }
      
      setResultado(analiseSimulada)
      setAnalisando(false)
    }, 3000)
  }

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
            📄 Melhorar Currículo
          </h1>
        </div>

        {!resultado && (
          <>
            {/* Instruções */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-8 h-8 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-800">Como funciona</h2>
              </div>
              <p className="text-lg text-blue-700 mb-3">
                A inteligência artificial vai ler seu currículo e dar dicas para melhorar suas chances de conseguir emprego.
              </p>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-800 mb-2">💡 Dica:</p>
                <p className="text-blue-700">
                  Se você tem uma vaga específica em mente, cole a descrição da vaga também. 
                  A IA vai dar dicas mais precisas!
                </p>
              </div>
            </div>

            {/* Formulário */}
            <div className="space-y-6">
              {/* Currículo */}
              <div>
                <label className="block text-lg font-bold text-foreground mb-3">
                  📝 1. Cole seu currículo aqui:
                </label>
                <textarea
                  value={curriculo}
                  onChange={(e) => setCurriculo(e.target.value)}
                  placeholder="Cole aqui todo o texto do seu currículo..."
                  className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg text-base resize-none focus:border-blue-500 focus:outline-none"
                  style={{ fontSize: '16px' }} // Evita zoom no iOS
                />
                <p className="text-sm text-gray-600 mt-2">
                  ✅ Copie e cole todo o texto do seu currículo
                </p>
              </div>

              {/* Vaga (opcional) */}
              <div>
                <label className="block text-lg font-bold text-foreground mb-3">
                  🎯 2. Descrição da vaga (opcional):
                </label>
                <textarea
                  value={vaga}
                  onChange={(e) => setVaga(e.target.value)}
                  placeholder="Se você tem uma vaga específica, cole a descrição aqui..."
                  className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-base resize-none focus:border-blue-500 focus:outline-none"
                  style={{ fontSize: '16px' }} // Evita zoom no iOS
                />
                <p className="text-sm text-gray-600 mt-2">
                  💡 Opcional: Para dicas mais específicas
                </p>
              </div>

              {/* Botão Analisar */}
              <button
                onClick={analisarCurriculo}
                disabled={analisando || !curriculo.trim()}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {analisando ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>🧠 IA analisando...</span>
                  </div>
                ) : (
                  <span>🚀 Analisar com IA</span>
                )}
              </button>
            </div>
          </>
        )}

        {/* Loading */}
        {analisando && (
          <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">
              🤖 IA trabalhando...
            </h3>
            <p className="text-yellow-700">
              Analisando seu currículo e comparando com milhares de vagas de sucesso.
              Isso leva alguns segundos.
            </p>
          </div>
        )}

        {/* Resultado */}
        {resultado && (
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300 text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                📊 Sua pontuação
              </h2>
              <div className="text-6xl font-bold text-green-600 mb-2">
                {resultado.compatibilidade}%
              </div>
              <p className="text-lg text-green-700">
                {resultado.compatibilidade >= 80 ? 'Excelente! Seu currículo está muito bom!' :
                 resultado.compatibilidade >= 60 ? 'Bom! Algumas melhorias vão te ajudar muito.' :
                 'Há espaço para melhorar. Vamos te ajudar!'}
              </p>
            </div>

            {/* Pontos Fortes */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800">✅ Pontos Fortes</h3>
              </div>
              <div className="space-y-3">
                {resultado.pontosFortess.map((ponto: string, index: number) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-700 font-medium">{ponto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Melhorias */}
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600" />
                <h3 className="text-xl font-bold text-orange-800">🔧 O que melhorar</h3>
              </div>
              <div className="space-y-3">
                {resultado.melhorias.map((melhoria: string, index: number) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-orange-700 font-medium">{melhoria}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximos Passos */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">
                🎯 Próximos passos
              </h3>
              <div className="space-y-3">
                {resultado.proximosPassos.map((passo: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-purple-200">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-purple-700 font-medium">{passo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões de ação */}
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => {
                  setResultado(null)
                  setCurriculo('')
                  setVaga('')
                }}
                className="bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Analisar outro currículo
              </button>
              
              <button
                onClick={() => router.push('/entrevista/simulacao')}
                className="bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
              >
                🗣️ Agora treinar entrevista
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="bg-gray-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-gray-600 transition-colors"
              >
                🏠 Voltar ao início
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}