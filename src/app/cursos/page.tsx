'use client'

import { useState, useEffect } from 'react'
import { MobileLayout } from '@/components/mobile/MobileLayout'
import { 
  BookOpen, 
  ArrowLeft, 
  Play,
  Clock,
  Users,
  Star,
  Award,
  ExternalLink,
  Filter,
  Search,
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Curso {
  id: string
  titulo: string
  instrutor: string
  plataforma: string
  duracao: string
  nivel: string
  categoria: string
  descricao: string
  habilidades: string[]
  avaliacao: number
  numAvaliacoes: number
  numAlunos: string
  preco: string
  url: string
  thumbnail: string
  gratuito: boolean
  certificado: boolean
  popular: boolean
}

const cursosSimulados: Curso[] = [
  {
    id: '1',
    titulo: 'Excel do Básico ao Avançado',
    instrutor: 'Prof. João Silva',
    plataforma: 'Coursera',
    duracao: '20 horas',
    nivel: 'Iniciante',
    categoria: 'Informática',
    descricao: 'Aprenda Excel desde o básico até fórmulas avançadas. Perfeito para quem quer se destacar no mercado de trabalho.',
    habilidades: ['Planilhas', 'Fórmulas', 'Gráficos', 'Tabelas Dinâmicas'],
    avaliacao: 4.8,
    numAvaliacoes: 2847,
    numAlunos: '15k+',
    preco: 'Gratuito',
    url: 'https://coursera.org',
    thumbnail: '📊',
    gratuito: true,
    certificado: true,
    popular: true
  },
  {
    id: '2',
    titulo: 'Comunicação e Liderança',
    instrutor: 'Ana Santos',
    plataforma: 'Udemy',
    duracao: '12 horas',
    nivel: 'Intermediário',
    categoria: 'Soft Skills',
    descricao: 'Desenvolva habilidades de comunicação e liderança essenciais para crescer na carreira.',
    habilidades: ['Comunicação', 'Liderança', 'Apresentações', 'Networking'],
    avaliacao: 4.6,
    numAvaliacoes: 1532,
    numAlunos: '8k+',
    preco: 'R$ 49,90',
    url: 'https://udemy.com',
    thumbnail: '🗣️',
    gratuito: false,
    certificado: true,
    popular: false
  },
  {
    id: '3',
    titulo: 'Inglês para Negócios',
    instrutor: 'Mike Johnson',
    plataforma: 'edX',
    duracao: '30 horas',
    nivel: 'Intermediário',
    categoria: 'Idiomas',
    descricao: 'Inglês focado no ambiente de trabalho. Aprenda vocabulário e expressões usadas no mundo corporativo.',
    habilidades: ['Business English', 'Presentations', 'Meetings', 'Email Writing'],
    avaliacao: 4.7,
    numAvaliacoes: 3245,
    numAlunos: '22k+',
    preco: 'Gratuito',
    url: 'https://edx.org',
    thumbnail: '🇺🇸',
    gratuito: true,
    certificado: true,
    popular: true
  },
  {
    id: '4',
    titulo: 'Marketing Digital para Iniciantes',
    instrutor: 'Carla Rodrigues',
    plataforma: 'Google Skillshop',
    duracao: '15 horas',
    nivel: 'Iniciante',
    categoria: 'Marketing',
    descricao: 'Aprenda os fundamentos do marketing digital e como se destacar nessa área em crescimento.',
    habilidades: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics'],
    avaliacao: 4.5,
    numAvaliacoes: 987,
    numAlunos: '5k+',
    preco: 'Gratuito',
    url: 'https://skillshop.exceedlms.com',
    thumbnail: '📱',
    gratuito: true,
    certificado: true,
    popular: false
  },
  {
    id: '5',
    titulo: 'Atendimento ao Cliente Excelente',
    instrutor: 'Roberto Lima',
    plataforma: 'Fundação Bradesco',
    duracao: '8 horas',
    nivel: 'Iniciante',
    categoria: 'Atendimento',
    descricao: 'Técnicas para oferecer um atendimento de qualidade e fidelizar clientes.',
    habilidades: ['Atendimento', 'Comunicação', 'Resolução de Problemas', 'Empatia'],
    avaliacao: 4.4,
    numAvaliacoes: 1876,
    numAlunos: '12k+',
    preco: 'Gratuito',
    url: 'https://ev.org.br',
    thumbnail: '🤝',
    gratuito: true,
    certificado: true,
    popular: false
  },
  {
    id: '6',
    titulo: 'Programação Python - Fundamentos',
    instrutor: 'Tech Academy',
    plataforma: 'Codecademy',
    duracao: '25 horas',
    nivel: 'Iniciante',
    categoria: 'Programação',
    descricao: 'Aprenda Python do zero. Uma das linguagens mais demandadas no mercado de trabalho.',
    habilidades: ['Python', 'Programação', 'Lógica', 'Projetos Práticos'],
    avaliacao: 4.9,
    numAvaliacoes: 4521,
    numAlunos: '35k+',
    preco: 'Gratuito (básico)',
    url: 'https://codecademy.com',
    thumbnail: '🐍',
    gratuito: true,
    certificado: false,
    popular: true
  }
]

const categorias = ['Todos', 'Informática', 'Soft Skills', 'Idiomas', 'Marketing', 'Atendimento', 'Programação']
const niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado']

export default function CursosPage() {
  const router = useRouter()
  const [termo, setTermo] = useState('')
  const [cursos, setCursos] = useState<Curso[]>([])
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([])
  const [carregando, setCarregando] = useState(false)
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [filtroNivel, setFiltroNivel] = useState('Todos')
  const [filtroGratuito, setFiltroGratuito] = useState(false)
  const [filtroCertificado, setFiltroCertificado] = useState(false)

  useEffect(() => {
    // Simular carregamento inicial
    setCarregando(true)
    setTimeout(() => {
      setCursos(cursosSimulados)
      setCursosFiltrados(cursosSimulados)
      setCarregando(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filtrarCursos()
  }, [termo, filtroCategoria, filtroNivel, filtroGratuito, filtroCertificado, cursos])

  const filtrarCursos = () => {
    let resultado = cursos

    if (termo) {
      resultado = resultado.filter(curso => 
        curso.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        curso.categoria.toLowerCase().includes(termo.toLowerCase()) ||
        curso.habilidades.some(hab => hab.toLowerCase().includes(termo.toLowerCase()))
      )
    }

    if (filtroCategoria !== 'Todos') {
      resultado = resultado.filter(curso => curso.categoria === filtroCategoria)
    }

    if (filtroNivel !== 'Todos') {
      resultado = resultado.filter(curso => curso.nivel === filtroNivel)
    }

    if (filtroGratuito) {
      resultado = resultado.filter(curso => curso.gratuito)
    }

    if (filtroCertificado) {
      resultado = resultado.filter(curso => curso.certificado)
    }

    setCursosFiltrados(resultado)
  }

  const obterCorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderEstrelas = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(avaliacao) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">📚 Cursos Gratuitos</h1>
              <p className="text-gray-600">Aprenda habilidades que o mercado procura</p>
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-orange-600">100+</div>
              <div className="text-sm text-gray-600">Cursos Disponíveis</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-green-600">80%</div>
              <div className="text-sm text-gray-600">Completamente Grátis</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Com Certificado</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-purple-600">50k+</div>
              <div className="text-sm text-gray-600">Alunos Ativos</div>
            </div>
          </div>

          {/* Filtros e busca */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="space-y-4">
              {/* Busca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔍 Buscar cursos
                </label>
                <input
                  type="text"
                  value={termo}
                  onChange={(e) => setTermo(e.target.value)}
                  placeholder="Ex: excel, inglês, marketing..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível</label>
                  <select
                    value={filtroNivel}
                    onChange={(e) => setFiltroNivel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    {niveis.map(nivel => (
                      <option key={nivel} value={nivel}>{nivel}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filtroGratuito}
                      onChange={(e) => setFiltroGratuito(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Só gratuitos</span>
                  </label>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filtroCertificado}
                      onChange={(e) => setFiltroCertificado(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Com certificado</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {carregando ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando cursos...</p>
              </div>
            ) : cursosFiltrados.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros ou usar termos mais amplos na busca.
                </p>
                <button
                  onClick={() => {
                    setTermo('')
                    setFiltroCategoria('Todos')
                    setFiltroNivel('Todos')
                    setFiltroGratuito(false)
                    setFiltroCertificado(false)
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    {cursosFiltrados.length} curso{cursosFiltrados.length !== 1 ? 's' : ''} encontrado{cursosFiltrados.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordenado por popularidade
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cursosFiltrados
                    .sort((a, b) => b.popular ? 1 : -1)
                    .map((curso) => (
                    <div key={curso.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      {/* Header do card */}
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-4xl">{curso.thumbnail}</div>
                          <div className="flex gap-1">
                            {curso.popular && (
                              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                                🔥 Popular
                              </span>
                            )}
                            {curso.gratuito && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Grátis
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {curso.titulo}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          Por {curso.instrutor} • {curso.plataforma}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {renderEstrelas(curso.avaliacao)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {curso.avaliacao}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({curso.numAvaliacoes.toLocaleString()})
                          </span>
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="px-6 pb-4">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {curso.descricao}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              {curso.duracao}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${obterCorNivel(curso.nivel)}`}>
                              {curso.nivel}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {curso.numAlunos} alunos
                          </div>
                          
                          {curso.certificado && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <Award className="w-4 h-4" />
                              Certificado incluído
                            </div>
                          )}
                        </div>

                        {/* Habilidades */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Você vai aprender:</h4>
                          <div className="flex flex-wrap gap-1">
                            {curso.habilidades.slice(0, 3).map((habilidade, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {habilidade}
                              </span>
                            ))}
                            {curso.habilidades.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{curso.habilidades.length - 3} mais
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-4 bg-gray-50 border-t">
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-900">
                            {curso.preco}
                          </div>
                          <button
                            onClick={() => window.open(curso.url, '_blank')}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Acessar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-orange-500 to-purple-500 rounded-2xl p-6 text-center text-white mt-8">
            <h3 className="text-xl font-bold mb-2">🎯 Dica de Carreira</h3>
            <p className="mb-4">
              Faça 2-3 cursos por mês para se destacar no mercado. Priorize habilidades que aparecem nas vagas que você quer!
            </p>
            <button
              onClick={() => router.push('/vagas/busca')}
              className="bg-white text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ver Vagas Disponíveis
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}