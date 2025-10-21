'use client'

import { useEffect } from 'react'
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { useToast, Toast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

interface ToastItemProps {
  toast: Toast
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const { id, title, description, variant, action } = toast

  // Auto dismiss após duration
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id)
      }, toast.duration)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [id, toast.duration, onDismiss])

  // Ícone baseado na variante
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      case 'destructive':
        return <AlertCircle className="w-5 h-5" />
      case 'info':
        return <Info className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  // Classes baseadas na variante
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100'
      case 'destructive':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100'
      default:
        return 'bg-background border-border text-foreground'
    }
  }

  return (
    <div className={cn(
      'pointer-events-auto relative flex w-full max-w-sm items-start gap-3',
      'rounded-lg border p-4 shadow-lg',
      'animate-slide-in-right',
      getVariantClasses()
    )}>
      {/* Ícone */}
      <div className="flex-shrink-0 pt-0.5">
        {getIcon()}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">
          {title}
        </div>
        {description && (
          <div className="mt-1 text-sm opacity-90">
            {description}
          </div>
        )}
        
        {/* Ação opcional */}
        {action && (
          <div className="mt-3">
            <button
              onClick={action.onClick}
              className="text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>

      {/* Botão de fechar */}
      <button
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 rounded-lg p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-current"
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Barra de progresso (para toasts com duração) */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-current opacity-50 rounded-b-lg animate-toast-progress"
            style={{
              animationDuration: `${toast.duration}ms`
            }}
          />
        </div>
      )}
    </div>
  )
}

export function ToastContainer() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-toast pointer-events-none">
      <div className="flex flex-col gap-2 max-h-screen overflow-hidden">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={dismiss}
          />
        ))}
      </div>
    </div>
  )
}