'use client'

import { useState, useEffect, useCallback } from 'react'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useVoiceCommands } from '@/hooks/useVoiceCommands'
import { cn } from '@/lib/utils'

interface VoiceButtonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'danger'
  position?: 'fixed' | 'relative'
}

export function VoiceButton({ 
  className, 
  size = 'lg', 
  variant = 'primary',
  position = 'fixed'
}: VoiceButtonProps) {
  const {
    isListening,
    isProcessing,
    isSupported,
    isSpeaking,
    startListening,
    stopListening,
    toggleListening,
    lastCommand,
    confidence,
    error
  } = useVoiceCommands()

  const [isPressed, setIsPressed] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Feedback visual para comandos
  useEffect(() => {
    if (lastCommand) {
      setShowFeedback(true)
      const timer = setTimeout(() => setShowFeedback(false), 2000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [lastCommand])

  // Vibração tátil no mobile
  const vibrate = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }, [])

  // Handler de clique/touch
  const handlePress = useCallback(() => {
    if (!isSupported) return
    
    setIsPressed(true)
    vibrate(50) // Feedback tátil curto
    
    toggleListening()
    
    setTimeout(() => setIsPressed(false), 150)
  }, [isSupported, toggleListening, vibrate])

  // Pressionar e segurar para modo contínuo
  const handlePressStart = useCallback(() => {
    if (!isSupported) return
    
    setIsPressed(true)
    vibrate(100)
    startListening()
  }, [isSupported, startListening, vibrate])

  const handlePressEnd = useCallback(() => {
    setIsPressed(false)
    if (isListening) {
      vibrate([50, 50, 50])
      stopListening()
    }
  }, [isListening, stopListening, vibrate])

  // Estados visuais
  const getButtonState = () => {
    if (error) return 'error'
    if (isProcessing) return 'processing'
    if (isListening) return 'listening'
    if (isSpeaking) return 'speaking'
    return 'idle'
  }

  const buttonState = getButtonState()

  // Classes dinâmicas baseadas no estado
  const buttonClasses = cn(
    // Base styles
    'thumb-zone rounded-full shadow-lg transition-all duration-200 ease-out',
    'flex items-center justify-center focus:outline-none focus:ring-4',
    'no-tap-highlight select-none border-2',
    
    // Size variants
    {
      'w-12 h-12': size === 'sm',
      'w-14 h-14': size === 'md', 
      'w-16 h-16': size === 'lg',
      'w-20 h-20': size === 'xl',
    },
    
    // Position
    {
      'fixed bottom-6 right-6 z-voice-button': position === 'fixed',
      'relative': position === 'relative',
    },
    
    // State-based styles
    {
      // Idle state
      'bg-primary-500 border-primary-600 text-white shadow-primary-500/20 hover:bg-primary-600 focus:ring-primary-500/50': 
        buttonState === 'idle' && variant === 'primary',
      'bg-gray-500 border-gray-600 text-white shadow-gray-500/20 hover:bg-gray-600 focus:ring-gray-500/50': 
        buttonState === 'idle' && variant === 'secondary',
      
      // Listening state (pulsing red)
      'bg-red-500 border-red-600 text-white animate-voice-pulse shadow-voice-listening focus:ring-red-500/50': 
        buttonState === 'listening',
      
      // Processing state (pulsing yellow)
      'bg-yellow-500 border-yellow-600 text-white animate-pulse shadow-yellow-500/30 focus:ring-yellow-500/50': 
        buttonState === 'processing',
      
      // Speaking state (pulsing green)
      'bg-green-500 border-green-600 text-white animate-voice-pulse shadow-voice-active focus:ring-green-500/50': 
        buttonState === 'speaking',
      
      // Error state
      'bg-red-600 border-red-700 text-white shadow-red-600/30 focus:ring-red-500/50': 
        buttonState === 'error',
      
      // Pressed state
      'scale-95 shadow-inner': isPressed,
      
      // Disabled state
      'opacity-50 cursor-not-allowed': !isSupported,
    },
    
    className
  )

  // Ícone baseado no estado
  const getIcon = () => {
    switch (buttonState) {
      case 'listening':
        return <Mic className="w-6 h-6" />
      case 'processing':
        return <Mic className="w-6 h-6 animate-spin" />
      case 'speaking':
        return <Volume2 className="w-6 h-6" />
      case 'error':
        return <MicOff className="w-6 h-6" />
      default:
        return isSpeaking ? <Volume2 className="w-6 h-6" /> : <Mic className="w-6 h-6" />
    }
  }

  // Tooltip text baseado no estado
  const getTooltipText = () => {
    if (!isSupported) return 'Comandos de voz não suportados'
    
    switch (buttonState) {
      case 'listening':
        return 'Ouvindo... (toque para parar)'
      case 'processing':
        return 'Processando comando...'
      case 'speaking':
        return 'Falando...'
      case 'error':
        return `Erro: ${error?.message || 'Problema com microfone'}`
      default:
        return 'Toque para ativar comandos de voz'
    }
  }

  if (!isSupported) {
    return null // Não renderiza se não há suporte
  }

  return (
    <>
      {/* Botão principal */}
      <button
        className={buttonClasses}
        onClick={handlePress}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        disabled={!isSupported}
        aria-label={getTooltipText()}
        title={getTooltipText()}
        role="button"
        tabIndex={0}
      >
        {getIcon()}
        
        {/* Indicador de confiança (quando ouvindo) */}
        {isListening && confidence && confidence > 0 && (
          <div 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-current"
            style={{
              opacity: confidence,
              transform: `scale(${0.8 + (confidence * 0.4)})`,
            }}
          />
        )}
      </button>

      {/* Feedback de comando executado */}
      {showFeedback && lastCommand && (
        <div className={cn(
          'fixed bottom-24 right-6 max-w-xs p-3 rounded-lg shadow-lg z-modal',
          'bg-green-500 text-white text-sm font-medium',
          'animate-slide-up',
          position === 'relative' && 'absolute bottom-full right-0 mb-2'
        )}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Comando: "{lastCommand}"</span>
          </div>
          
          {confidence && (
            <div className="text-xs opacity-75 mt-1">
              Confiança: {Math.round(confidence * 100)}%
            </div>
          )}
        </div>
      )}

      {/* Overlay de ajuda (primeira vez) */}
      {position === 'fixed' && typeof window !== 'undefined' && 
       !localStorage.getItem('voice-tutorial-seen') && (
        <div className="fixed inset-0 bg-black/50 z-modal flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">
              Comandos de Voz Ativados!
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Toque no botão azul e fale comandos como "analisar currículo" 
              ou "simular entrevista" para navegar sem usar as mãos.
            </p>
            
            <button
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
              onClick={() => {
                localStorage.setItem('voice-tutorial-seen', 'true')
                setShowFeedback(false)
              }}
            >
              Entendi!
            </button>
          </div>
        </div>
      )}
    </>
  )
}