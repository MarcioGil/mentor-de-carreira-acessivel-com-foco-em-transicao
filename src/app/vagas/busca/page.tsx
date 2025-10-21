'use client'

import { useState, useEffect } from 'react'
import { MobileLayout } from '@/components/mobile/MobileLayout'
import { 
  Search, 
  ArrowLeft, 
  MapPin,
  Building,
  DollarSign,
  Clock,
  Filter,
  ExternalLink,
  Heart,
  Briefcase,
  Users,
  Star
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Vaga {
  id: string
  titulo: string
  empresa: string
  localizacao: string
  salario: string
  tipo: string
  experiencia: string
  descricao: string
  requisitos: string[]
  beneficios: string[]
  dataPublicacao: string
  url: string
  compatibilidade?: number
}

const vagasSimuladas: Vaga[] = [
  {
    id: '1',
    titulo: 'Assistente Administrativo',
    empresa: 'Tech Solutions Ltda',
    localizacao: 'São Paulo, SP',
    salario: 'R$ 2.500 - R$ 3.200',
    tipo: 'CLT',
    experiencia: '1-2 anos',
    descricao: 'Buscamos profissional para atuar no suporte administrativo da empresa, com foco em organização e atendimento.',
    requisitos: ['Ensino médio completo', 'Experiência com Excel', 'Boa comunicação'],
    beneficios: ['Vale transporte', 'Vale alimentação', 'Plano de saúde'],
    dataPublicacao: 'Há 2 dias',
    url: '#',
    compatibilidade: 85
  },
  {
    id: '2',
    titulo: 'Vendedor(a)',
    empresa: 'Lojas ABC',
    localizacao: 'Rio de Janeiro, RJ',
    salario: 'R$ 1.800 + comissões',
    tipo: 'CLT',
    experiencia: 'Sem experiência',
    descricao: 'Oportunidade para quem está começando na área de vendas. Oferecemos treinamento completo.',
    requisitos: ['Ensino médio', 'Boa comunicação', 'Disponibilidade para trabalhar aos sábados'],
    beneficios: ['Comissão atrativa', 'Vale transporte', 'Desconto em produtos'],
    dataPublicacao: 'Há 1 dia',
    url: '#',
    compatibilidade: 78
  },
  {
    id: '3',
    titulo: 'Operador de Caixa',
    empresa: 'Supermercados XYZ',
    localizacao: 'Belo Horizonte, MG',
    salario: 'R$ 1.400 - R$ 1.600',
    tipo: 'CLT',
    experiencia: 'Não exigida',
    descricao: 'Vagas para operadores de caixa em nossa rede de supermercados. Ambiente jovem e dinâmico.',
    requisitos: ['Ensino médio', 'Facilidade com números', 'Boa apresentação'],
    beneficios: ['Vale alimentação', 'Vale transporte', 'Seguro de vida'],
    dataPublicacao: 'Há 3 dias',
    url: '#',
    compatibilidade: 72
  },
  {
    id: '4',
    titulo: 'Recepcionista',
    empresa: 'Clínica Médica Saúde+',
    localizacao: 'Salvador, BA',
    salario: 'R$ 1.600 - R$ 2.000',
    tipo: 'CLT',
    experiencia: '6 meses',
    descricao: 'Profissional para atendimento ao público, agendamento de consultas e suporte administrativo.',
    requisitos: ['Ensino médio', 'Experiência em atendimento', 'Conhecimento básico de informática'],
    beneficios: ['Plano de saúde', 'Vale transporte', 'Vale alimentação'],
    dataPublicacao: 'Há 4 dias',
    url: '#',
    compatibilidade: 90
  },
  {
    id: '5',
    titulo: 'Auxiliar de Produção',
    empresa: 'Indústria Brasil S.A.',
    localizacao: 'Fortaleza, CE',
    salario: 'R$ 1.500 - R$ 1.800',
    tipo: 'CLT',
    experiencia: 'Não exigida',
    descricao: 'Oportunidade na área industrial para quem busca estabilidade e crescimento profissional.',
    requisitos: ['Ensino fundamental', 'Disponibilidade para turnos', 'Boa disposição física'],
    beneficios: ['Vale transporte', 'Refeitório no local', 'Plano de saúde após 3 meses'],
    dataPublicacao: 'Há 5 dias',
    url: '#',
    compatibilidade: 65
  }
]

export default function BuscaVagasPage() {
  const router = useRouter()
  const [termo, setTermo] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [vagasFiltradas, setVagasFiltradas] = useState<Vaga[]>([])
  const [carregando, setCarregando] = useState(false)
  const [filtroAberto, setFiltroAberto] = useState(false)
  const [filtroSalario, setFiltroSalario] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroExperiencia, setFiltroExperiencia] = useState('')

  useEffect(() => {
    // Simular carregamento inicial de vagas
    setCarregando(true)
    setTimeout(() => {
      setVagas(vagasSimuladas)
      setVagasFiltradas(vagasSimuladas)
      setCarregando(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filtrarVagas()
  }, [termo, localizacao, filtroSalario, filtroTipo, filtroExperiencia, vagas])

  const filtrarVagas = () => {
    let resultado = vagas

    if (termo) {
      resultado = resultado.filter(vaga => 
        vaga.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        vaga.empresa.toLowerCase().includes(termo.toLowerCase()) ||
        vaga.descricao.toLowerCase().includes(termo.toLowerCase())
      )
    }

    if (localizacao) {
      resultado = resultado.filter(vaga => 
        vaga.localizacao.toLowerCase().includes(localizacao.toLowerCase())
      )
    }

    if (filtroTipo) {
      resultado = resultado.filter(vaga => vaga.tipo === filtroTipo)
    }

    if (filtroExperiencia) {
      if (filtroExperiencia === 'sem-experiencia') {
        resultado = resultado.filter(vaga => 
          vaga.experiencia.toLowerCase().includes('não') ||
          vaga.experiencia.toLowerCase().includes('sem')
        )
      }
    }

    setVagasFiltradas(resultado)
  }

  const buscarVagas = () => {
    setCarregando(true)
    // Simular busca
    setTimeout(() => {
      filtrarVagas()
      setCarregando(false)
    }, 800)
  }

  const obterCorCompatibilidade = (compatibilidade?: number) => {
    if (!compatibilidade) return 'text-gray-500'
    if (compatibilidade >= 80) return 'text-green-600'
    if (compatibilidade >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-6">
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
              <h1 className="text-2xl font-bold text-gray-900">🔍 Buscar Vagas</h1>
              <p className="text-gray-600">Encontre oportunidades que combinam com você</p>
            </div>
          </div>

          {/* Filtros de busca */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="space-y-4">
              {/* Busca principal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🔍 O que você procura?
                  </label>
                  <input
                    type="text"
                    value={termo}
                    onChange={(e) => setTermo(e.target.value)}
                    placeholder="Ex: vendedor, assistente, caixa..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📍 Onde?
                  </label>
                  <input
                    type="text"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    placeholder="Ex: São Paulo, Rio de Janeiro..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filtros avançados */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFiltroAberto(!filtroAberto)}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
                >
                  <Filter className="w-4 h-4" />
                  Filtros {filtroAberto ? '▲' : '▼'}
                </button>
                <button
                  onClick={buscarVagas}
                  disabled={carregando}
                  className="ml-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  {carregando ? 'Buscando...' : 'Buscar'}
                </button>
              </div>

              {filtroAberto && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de contrato</label>
                    <select
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Todos</option>
                      <option value="CLT">CLT</option>
                      <option value="PJ">PJ</option>
                      <option value="Temporário">Temporário</option>
                      <option value="Estágio">Estágio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experiência</label>
                    <select
                      value={filtroExperiencia}
                      onChange={(e) => setFiltroExperiencia(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Qualquer</option>
                      <option value="sem-experiencia">Aceita sem experiência</option>
                      <option value="junior">Júnior (1-2 anos)</option>
                      <option value="pleno">Pleno (3-5 anos)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salário mínimo</label>
                    <select
                      value={filtroSalario}
                      onChange={(e) => setFiltroSalario(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Qualquer</option>
                      <option value="1500">Acima de R$ 1.500</option>
                      <option value="2000">Acima de R$ 2.000</option>
                      <option value="3000">Acima de R$ 3.000</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-4">
            {carregando ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Buscando vagas para você...</p>
              </div>
            ) : vagasFiltradas.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros ou usar termos mais amplos na busca.
                </p>
                <button
                  onClick={() => {
                    setTermo('')
                    setLocalizacao('')
                    setFiltroTipo('')
                    setFiltroExperiencia('')
                    setFiltroSalario('')
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    {vagasFiltradas.length} vaga{vagasFiltradas.length !== 1 ? 's' : ''} encontrada{vagasFiltradas.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordenado por compatibilidade
                  </p>
                </div>

                {vagasFiltradas
                  .sort((a, b) => (b.compatibilidade || 0) - (a.compatibilidade || 0))
                  .map((vaga) => (
                  <div key={vaga.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{vaga.titulo}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Building className="w-4 h-4" />
                          <span>{vaga.empresa}</span>
                        </div>
                      </div>
                      {vaga.compatibilidade && (
                        <div className={`text-right ${obterCorCompatibilidade(vaga.compatibilidade)}`}>
                          <div className="text-lg font-bold">{vaga.compatibilidade}%</div>
                          <div className="text-xs">compatível</div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{vaga.localizacao}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{vaga.salario}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{vaga.tipo} • {vaga.experiencia}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {vaga.descricao}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">📋 Requisitos:</h4>
                        <ul className="space-y-1">
                          {vaga.requisitos.slice(0, 3).map((req, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">🎁 Benefícios:</h4>
                        <ul className="space-y-1">
                          {vaga.beneficios.slice(0, 3).map((ben, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                              {ben}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {vaga.dataPublicacao}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => window.open(vaga.url, '_blank')}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ver Vaga
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Call to action */}
          {vagasFiltradas.length > 0 && (
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-center text-white mt-8">
              <h3 className="text-xl font-bold mb-2">💡 Dica para se destacar</h3>
              <p className="mb-4">
                Personalize seu currículo para cada vaga usando nossa ferramenta de análise!
              </p>
              <button
                onClick={() => router.push('/curriculo/analise')}
                className="bg-white text-purple-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Melhorar Currículo
              </button>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}