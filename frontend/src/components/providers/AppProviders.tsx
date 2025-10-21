'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { ToastProvider } from '@/hooks/useToast'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  )
}