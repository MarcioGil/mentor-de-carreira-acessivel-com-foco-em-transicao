'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// Tipos do sistema de toast
export interface Toast {
  id: string
  title: string
  description?: string
  variant: 'default' | 'success' | 'warning' | 'destructive' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface ToastContextType {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
  dismissAll: () => void
}

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Provider Component
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  // Adicionar toast
  const toast = useCallback((newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const toastWithId: Toast = {
      ...newToast,
      id,
      duration: newToast.duration ?? 5000, // Default 5 segundos
    }

    setToasts((prev: Toast[]) => [...prev, toastWithId])

    // Auto-dismiss após duration
    if (toastWithId.duration && toastWithId.duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, toastWithId.duration)
    }
  }, [])

  // Remover toast específico
  const dismiss = useCallback((id: string) => {
    setToasts((prev: Toast[]) => prev.filter((toast: Toast) => toast.id !== id))
  }, [])

  // Remover todos os toasts
  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
    </ToastContext.Provider>
  )
}

// Hook para usar o toast
export function useToast() {
  const context = useContext(ToastContext)
  
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider')
  }
  
  return context
}