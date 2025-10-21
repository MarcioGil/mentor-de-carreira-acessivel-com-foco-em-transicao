'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'

// Tipos para reconhecimento de voz
interface SpeechRecognitionResult {
  transcript: string
  confidence: number
  isFinal: boolean
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[][]
  resultIndex: number
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onstart: ((event: Event) => void) | null
  onend: ((event: Event) => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: any) => void) | null
  onspeechstart: ((event: Event) => void) | null
  onspeechend: ((event: Event) => void) | null
}

interface WebkitSpeechRecognition extends SpeechRecognition {}

// Interface para opções de síntese de fala
interface SpeechSynthesisOptions {
  lang?: string
  rate?: number  
  pitch?: number
  volume?: number
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => WebkitSpeechRecognition
  }
}

// Comandos de voz mapeados
const VOICE_COMMANDS = {
  // Navegação principal
  'ir para home': '/',
  'página inicial': '/',
  'ir para início': '/',
  'voltar': () => window.history.back(),
  'avançar': () => window.history.forward(),
  
  // Análise de currículo
  'analisar currículo': '/curriculo/analise',
  'análise currículo': '/curriculo/analise',
  'revisar currículo': '/curriculo/analise',
  'avaliar currículo': '/curriculo/analise',
  'currículo': '/curriculo',
  
  // Simulação de entrevistas
  'simular entrevista': '/entrevista/simulacao',
  'simulação entrevista': '/entrevista/simulacao',
  'treinar entrevista': '/entrevista/simulacao',
  'praticar entrevista': '/entrevista/simulacao',
  'entrevista': '/entrevista',
  
  // Busca de vagas
  'buscar vagas': '/vagas/busca',
  'procurar vagas': '/vagas/busca',
  'encontrar vagas': '/vagas/busca',
  'vagas': '/vagas',
  'empregos': '/vagas',
  
  // Cursos e treinamentos
  'cursos': '/cursos',
  'treinamentos': '/cursos',
  'capacitação': '/cursos',
  'estudar': '/cursos',
  
  // Mentoria
  'mentoria': '/mentoria',
  'conversar com mentor': '/mentoria/chat',
  'chat mentor': '/mentoria/chat',
  'falar com mentor': '/mentoria/chat',
  
  // Perfil e configurações
  'meu perfil': '/perfil',
  'perfil': '/perfil',
  'configurações': '/configuracoes',
  'ajustes': '/configuracoes',
  'sair': '/auth/logout',
  'logout': '/auth/logout',
  
  // Funcionalidades
  'ajuda': '/ajuda',
  'tutorial': '/tutorial',
  'suporte': '/suporte',
  'contato': '/contato',
  
  // Comandos de interface
  'rolar para cima': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  'subir': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  'rolar para baixo': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
  'descer': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
  'atualizar': () => window.location.reload(),
  'recarregar': () => window.location.reload(),
  
  // Acessibilidade
  'aumentar fonte': () => document.body.style.fontSize = '120%',
  'diminuir fonte': () => document.body.style.fontSize = '100%',
  'modo escuro': () => document.documentElement.classList.add('dark'),
  'modo claro': () => document.documentElement.classList.remove('dark'),
  
  // Comandos de pesquisa
  'pesquisar': '/busca',
  'buscar': '/busca',
  'procurar': '/busca',
} as const

export interface VoiceCommandsHookReturn {
  // Estados
  isListening: boolean
  isProcessing: boolean
  isSupported: boolean
  isSpeaking: boolean
  error: Error | null
  lastCommand: string | null
  confidence: number | null
  
  // Métodos
  startListening: () => void
  stopListening: () => void
  toggleListening: () => void
  speak: (text: string, options?: SpeechSynthesisOptions) => Promise<void>
  processCommand: (command: string) => boolean
}

export function useVoiceCommands(): VoiceCommandsHookReturn {
  // Estados
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [lastCommand, setLastCommand] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  
  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isProcessingRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)
  
  // Hooks
  const router = useRouter()
  const { toast } = useToast()
  
  // Verificar suporte do navegador
  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  
  // Inicializar reconhecimento de voz
  const initializeRecognition = useCallback(() => {
    if (!isSupported || recognitionRef.current) return
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      // Configurações
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'pt-BR'
      
      // Event handlers
      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
        setConfidence(null)
      }
      
      recognition.onend = () => {
        setIsListening(false)
        setIsProcessing(false)
        isProcessingRef.current = false
      }
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          if (!result || !result[0]) continue
          
          const transcript = result[0].transcript.toLowerCase().trim()
          const confidence = result[0].confidence
          
          if (result[0].isFinal) {
            finalTranscript += transcript
            setConfidence(confidence)
          } else {
            interimTranscript += transcript
            setConfidence(confidence || 0.5)
          }
        }
        
        // Processar comando final
        if (finalTranscript && !isProcessingRef.current) {
          isProcessingRef.current = true
          setIsProcessing(true)
          
          // Delay para UX melhor
          setTimeout(() => {
            const processed = processCommand(finalTranscript)
            
            if (processed) {
              setLastCommand(finalTranscript)
              toast({
                title: 'Comando executado',
                description: `"${finalTranscript}"`,
                variant: 'success',
              })
            } else {
              toast({
                title: 'Comando não reconhecido',
                description: `Tente: "analisar currículo", "simular entrevista", "buscar vagas"`,
                variant: 'warning',
              })
              speak(`Comando não reconhecido. Tente comandos como analisar currículo, simular entrevista ou buscar vagas.`)
            }
            
            setIsProcessing(false)
            isProcessingRef.current = false
          }, 500)
        }
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        
        const errorMessages: Record<string, string> = {
          'no-speech': 'Nenhuma fala detectada. Tente novamente.',
          'audio-capture': 'Problema com o microfone. Verifique as permissões.',
          'not-allowed': 'Permissão de microfone negada. Habilite nas configurações.',
          'network': 'Problema de rede. Verifique sua conexão.',
          'language-not-supported': 'Idioma não suportado.',
          'service-not-allowed': 'Serviço não permitido.',
        }
        
        const message = errorMessages[event.error] || `Erro no reconhecimento de voz: ${event.error}`
        const newError = new Error(message)
        
        setError(newError)
        setIsListening(false)
        setIsProcessing(false)
        isProcessingRef.current = false
        
        toast({
          title: 'Erro no reconhecimento de voz',
          description: message,
          variant: 'destructive',
        })
      }
      
      recognitionRef.current = recognition
    } catch (err) {
      console.error('Error initializing speech recognition:', err)
      setError(new Error('Falha ao inicializar reconhecimento de voz'))
    }
  }, [isSupported, toast])
  
  // Processar comando de voz
  const processCommand = useCallback((command: string): boolean => {
    const cleanCommand = command.toLowerCase().trim()
    
    // Verificar comando exato
    if (cleanCommand in VOICE_COMMANDS) {
      const action = VOICE_COMMANDS[cleanCommand as keyof typeof VOICE_COMMANDS]
      
      if (typeof action === 'string') {
        router.push(action)
        return true
      } else if (typeof action === 'function') {
        action()
        return true
      }
    }
    
    // Verificar comandos parciais/similares
    const commandKeys = Object.keys(VOICE_COMMANDS)
    const similarCommand = commandKeys.find(key => 
      key.includes(cleanCommand) || cleanCommand.includes(key)
    )
    
    if (similarCommand) {
      const action = VOICE_COMMANDS[similarCommand as keyof typeof VOICE_COMMANDS]
      
      if (typeof action === 'string') {
        router.push(action)
        return true
      } else if (typeof action === 'function') {
        action()
        return true
      }
    }
    
    return false
  }, [router])
  
  // Iniciar escuta
  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || isListening) return
    
    try {
      setError(null)
      recognitionRef.current.start()
      
      // Timeout de segurança (30 segundos)
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.stop()
        }
      }, 30000) as unknown as number
      
    } catch (err) {
      console.error('Error starting recognition:', err)
      setError(new Error('Falha ao iniciar reconhecimento'))
    }
  }, [isSupported, isListening])
  
  // Parar escuta
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [isListening])
  
  // Toggle escuta
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])
  
  // Síntese de fala
  const speak = useCallback(async (text: string, options: SpeechSynthesisOptions = {}): Promise<void> => {
    if (!('speechSynthesis' in window)) {
      throw new Error('Síntese de fala não suportada')
    }
    
    return new Promise((resolve, reject) => {
      // Cancelar fala anterior
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Configurações
      utterance.lang = options.lang || 'pt-BR'
      utterance.rate = options.rate || 0.9
      utterance.pitch = options.pitch || 1
      utterance.volume = options.volume || 0.8
      
      // Event handlers
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        resolve()
      }
      utterance.onerror = (event) => {
        setIsSpeaking(false)
        reject(new Error(`Erro na síntese de fala: ${event.error}`))
      }
      
      // Iniciar fala
      window.speechSynthesis.speak(utterance)
    })
  }, [])
  
  // Inicializar quando o componente monta
  useEffect(() => {
    if (isSupported) {
      initializeRecognition()
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isSupported, initializeRecognition])
  
  // Cleanup na desmontagem
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])
  
  return {
    // Estados
    isListening,
    isProcessing,
    isSupported,
    isSpeaking,
    error,
    lastCommand,
    confidence,
    
    // Métodos
    startListening,
    stopListening,
    toggleListening,
    speak,
    processCommand,
  }
}