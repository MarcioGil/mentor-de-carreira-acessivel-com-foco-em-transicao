# 📱 Frontend Mobile-First - Next.js 14

## 🚀 **Setup para Uso em Transporte Público**

Este frontend foi especificamente projetado para funcionar **perfeitamente em ônibus, trens e metrôs**, considerando:

- 📶 **Conectividade instável** (3G/4G intermitente)
- 🔋 **Economia de bateria** 
- 🎧 **Ambientes ruidosos** (comandos de voz + fones)
- 👆 **Uso com uma mão** (interface adaptada)
- ⚡ **Carregamento ultrarrápido** (< 2 segundos)

---

## 🛠️ **Setup Inicial**

```bash
cd frontend/
npm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install
```

## 📦 **Dependências Especializadas**

```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@next/pwa": "5.6.0",
    "workbox-webpack-plugin": "7.0.0",
    "framer-motion": "10.16.4",
    "zustand": "4.4.1",
    "react-hook-form": "7.47.0",
    "react-speech-kit": "3.0.1",
    "@headlessui/react": "1.7.17",
    "@heroicons/react": "2.0.18",
    "tailwindcss": "3.3.5",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.31"
  },
  "devDependencies": {
    "@types/node": "20.8.0",
    "@types/react": "18.2.25",
    "@types/react-dom": "18.2.11",
    "typescript": "5.2.2",
    "eslint": "8.51.0",
    "eslint-config-next": "14.0.0"
  }
}
```

---

## 🚌 **Otimizações para Transporte Público**

### **1. PWA (Progressive Web App)**
```javascript
// next.config.js
const withPWA = require('@next/pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
      },
    },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
})

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
})
```

### **2. Modo Offline**
```typescript
// hooks/useOfflineMode.ts
import { useEffect, useState } from 'react';

export const useOfflineMode = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [queuedActions, setQueuedActions] = useState<any[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Processar ações em fila quando voltar online
      processQueuedActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addToQueue = (action: any) => {
    if (!isOnline) {
      setQueuedActions(prev => [...prev, action]);
    }
  };

  return { isOnline, addToQueue };
};
```

### **3. Interface Otimizada para Uma Mão**
```typescript
// components/MobileOptimizedLayout.tsx
export default function MobileOptimizedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com altura mínima para thumb reach */}
      <header className="h-16 bg-white shadow-sm fixed top-0 w-full z-50">
        <div className="flex items-center justify-between px-4 h-full">
          {/* Menu hamburguer no lado direito (thumb-friendly) */}
          <div></div>
          <h1 className="text-lg font-semibold">Mentor IA</h1>
          <button className="p-2 rounded-lg">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Conteúdo principal com padding para thumb zone */}
      <main className="pt-16 pb-20 px-4">
        {children}
      </main>

      {/* Bottom navigation na thumb zone */}
      <nav className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around h-full">
          <NavButton icon={HomeIcon} label="Início" />
          <NavButton icon={DocumentIcon} label="Análise" />
          <VoiceButton /> {/* Botão central maior */}
          <NavButton icon={ChatIcon} label="Chat" />
          <NavButton icon={UserIcon} label="Perfil" />
        </div>
      </nav>
    </div>
  );
}
```

### **4. Botão de Voz Central (Sempre Acessível)**
```typescript
// components/VoiceButton.tsx
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';

export default function VoiceButton() {
  const { isListening, startListening, stopListening } = useVoiceCommands();

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`
        relative w-14 h-14 rounded-full shadow-lg transition-all duration-200
        ${isListening 
          ? 'bg-red-500 scale-110 animate-pulse' 
          : 'bg-blue-500 hover:bg-blue-600'
        }
      `}
      aria-label={isListening ? 'Parar comando de voz' : 'Ativar comando de voz'}
    >
      {isListening ? (
        <StopIcon className="w-8 h-8 text-white mx-auto" />
      ) : (
        <MicrophoneIcon className="w-8 h-8 text-white mx-auto" />
      )}
      
      {/* Indicador visual de escuta */}
      {isListening && (
        <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
      )}
    </button>
  );
}
```

---

## 🎧 **Comandos de Voz para Transporte**

### **Anti-Ruído e Ambientes Barulhentos**
```typescript
// hooks/useNoiseResistantVoice.ts
export const useNoiseResistantVoice = () => {
  const recognition = new (window as any).webkitSpeechRecognition();
  
  // Configurações para ambientes ruidosos
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3; // Múltiplas alternativas
  recognition.lang = 'pt-BR';
  
  // Filtros de confiança para reduzir falsos positivos
  const CONFIDENCE_THRESHOLD = 0.7;
  
  recognition.onresult = (event: any) => {
    const results = event.results[event.results.length - 1];
    const transcript = results[0].transcript.toLowerCase().trim();
    const confidence = results[0].confidence;
    
    // Só executa comando se confiança for alta
    if (confidence >= CONFIDENCE_THRESHOLD) {
      processVoiceCommand(transcript);
    }
  };
  
  // Comandos simples e distintos para reduzir confusão
  const commands = {
    'analisar': () => navigate('/analyze'),
    'entrevista': () => navigate('/interview'),
    'vagas': () => navigate('/jobs'),
    'perfil': () => navigate('/profile'),
    'ajuda': () => showHelp(),
    'parar': () => stopAllActions(),
  };
};
```

---

## 📱 **Componentes Mobile-First**

### **1. Analisador de Currículo Mobile**
```typescript
// components/mobile/CVAnalyzer.tsx
export default function MobileCVAnalyzer() {
  return (
    <div className="space-y-4">
      {/* Header com progresso */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Análise de Currículo</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
        </div>
      </div>

      {/* Upload otimizado para mobile */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-2 block">
            Seu Currículo
          </span>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Toque para colar ou falar seu currículo
            </p>
            <div className="flex gap-2 justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                Colar Texto
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">
                🎙️ Falar
              </button>
            </div>
          </div>
        </label>
      </div>

      {/* Botão de análise sempre visível */}
      <button className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold text-lg">
        🔍 Analisar Agora
      </button>
    </div>
  );
}
```

### **2. Chat com IA Otimizado**
```typescript
// components/mobile/MobileChat.tsx
export default function MobileChat() {
  return (
    <div className="flex flex-col h-full">
      {/* Mensagens com scroll suave */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-xs px-4 py-2 rounded-lg
                ${message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
                }
              `}
            >
              <p className="text-sm">{message.text}</p>
              
              {/* Botão para ler mensagem */}
              {message.sender === 'ai' && (
                <button 
                  onClick={() => speakText(message.text)}
                  className="mt-1 text-xs opacity-70 hover:opacity-100"
                >
                  🔊 Ouvir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input otimizado para mobile */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Digite ou fale sua pergunta..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full pr-12"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2">
              🎙️
            </button>
          </div>
          <button className="bg-blue-500 text-white p-3 rounded-full">
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔋 **Otimizações de Performance**

### **1. Lazy Loading Inteligente**
```typescript
// Carregamento sob demanda para economizar dados
const CVAnalyzer = dynamic(() => import('@/components/mobile/CVAnalyzer'), {
  loading: () => <MobileLoader />,
  ssr: false,
});

const InterviewSimulator = dynamic(() => import('@/components/mobile/InterviewSimulator'), {
  loading: () => <MobileLoader />,
  ssr: false,
});
```

### **2. Cache Strategy**
```typescript
// utils/mobileCache.ts
export class MobileCache {
  static set(key: string, data: any, ttl: number = 300000) { // 5 min default
    const item = {
      data,
      expiry: Date.now() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static get(key: string) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  }
}
```

---

## 📋 **Estrutura de Arquivos Mobile-First**

```
frontend/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (mobile)/          # Grupo de rotas mobile
│   │   │   ├── analyze/       # Análise de currículo
│   │   │   ├── interview/     # Simulador entrevista
│   │   │   ├── chat/          # Chat com IA
│   │   │   └── profile/       # Perfil do usuário
│   │   ├── globals.css        # Estilos globais mobile-first
│   │   └── layout.tsx         # Layout principal
│   ├── components/
│   │   ├── mobile/            # Componentes específicos mobile
│   │   ├── voice/             # Componentes de comandos de voz
│   │   └── ui/                # Componentes base
│   ├── hooks/
│   │   ├── useVoiceCommands.ts
│   │   ├── useOfflineMode.ts
│   │   └── useMobileOptimized.ts
│   ├── lib/
│   │   ├── mobileCache.ts
│   │   ├── voiceEngine.ts
│   │   └── offlineQueue.ts
│   └── styles/
│       └── mobile.css         # Estilos específicos mobile
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service Worker
│   └── icons/                 # Ícones PWA
└── docs/
    └── MOBILE_DESIGN.md       # Documentação de design mobile
```

---

## 🎯 **Próximos Passos**

1. **Implementar PWA** completo
2. **Testes em dispositivos reais** (ônibus, metrô)
3. **Otimização de voz** para ambientes ruidosos
4. **Analytics mobile** para melhorar UX
5. **Testes de acessibilidade** em transporte público

---

*Este frontend foi pensado para funcionar perfeitamente quando você está no 🚌 ônibus indo para uma entrevista de emprego!*