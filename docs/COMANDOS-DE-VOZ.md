# 🎙️ Comandos de Voz e Acessibilidade

## 🌟 **Por que Comandos de Voz são Essenciais?**

Para tornar a mentoria de carreira **verdadeiramente acessível**, nossa plataforma implementa comandos de voz nativos que permitem:

- **♿ Acessibilidade Total**: Pessoas com deficiências motoras podem navegar completamente
- **📱 Uso Mobile**: Mãos livres em dispositivos móveis
- **⚡ Eficiência**: Navegação mais rápida para usuários experientes
- **🌍 Inclusão Digital**: Reduz barreiras tecnológicas

---

## 🎯 **Comandos de Voz Implementados**

### **Navegação Principal**
```
"Iniciar análise de currículo"    → /analyze
"Começar simulação de entrevista" → /interview  
"Abrir meu dashboard"             → /dashboard
"Ver meu plano de carreira"       → /career-plan
"Buscar vagas"                    → /jobs
"Configurações"                   → /settings
"Ajuda"                          → /help
"Sair"                           → Logout
```

### **Análise de Currículo**
```
"Colar currículo"                 → Foca no textarea
"Colar descrição da vaga"         → Foca no campo de vaga
"Analisar agora"                  → Executa análise
"Ler resultado"                   → TTS do resultado
"Salvar análise"                  → Salva no histórico
"Nova análise"                    → Limpa formulário
```

### **Simulação de Entrevista**
```
"Começar entrevista"              → Inicia simulação
"Próxima pergunta"                → Avança pergunta
"Repetir pergunta"                → Repete via TTS
"Finalizar entrevista"            → Encerra e mostra feedback
"Ver feedback"                    → Lê feedback via TTS
```

### **Chat com Mentor IA**
```
"Perguntar ao mentor"             → Ativa entrada de voz
"Parar gravação"                  → Para reconhecimento
"Ler resposta"                    → TTS da resposta da IA
"Limpar conversa"                 → Reset do chat
"Histórico de conversas"          → Mostra conversas anteriores
```

---

## 🛠️ **Implementação Técnica**

### **Web Speech API - Frontend**

```javascript
// hooks/useVoiceCommands.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar suporte do navegador
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Browser não suporta reconhecimento de voz');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    // Configurações
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'pt-BR';

    // Comandos mapeados
    const commands = {
      'iniciar análise de currículo': () => router.push('/analyze'),
      'começar simulação de entrevista': () => router.push('/interview'),
      'abrir meu dashboard': () => router.push('/dashboard'),
      'ver meu plano de carreira': () => router.push('/career-plan'),
      'buscar vagas': () => router.push('/jobs'),
      'configurações': () => router.push('/settings'),
      'ajuda': () => router.push('/help'),
      'sair': () => handleLogout(),
    };

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      
      // Executar comando se encontrado
      if (commands[transcript]) {
        commands[transcript]();
        // Feedback sonoro
        playCommandExecutedSound();
      }
    };

    setRecognition(recognitionInstance);
  }, [router]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return { startListening, stopListening, isListening };
};
```

### **Text-to-Speech - Feedback de Voz**

```javascript
// utils/textToSpeech.js
export class TextToSpeechService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voice = null;
    this.initVoice();
  }

  initVoice() {
    // Preferir vozes em português
    const voices = this.synth.getVoices();
    this.voice = voices.find(voice => voice.lang === 'pt-BR') || voices[0];
  }

  speak(text, options = {}) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    this.synth.speak(utterance);
  }

  // Métodos específicos
  announceNavigation(page) {
    this.speak(`Navegando para ${page}`);
  }

  readAnalysisResult(result) {
    const text = `Análise concluída. Compatibilidade: ${result.score}%. ${result.summary}`;
    this.speak(text);
  }

  readInterviewQuestion(question) {
    this.speak(`Pergunta: ${question}`);
  }
}
```

### **Componente de Controle de Voz**

```jsx
// components/VoiceControl.jsx
import { useState } from 'react';
import { useVoiceCommands } from '../hooks/useVoiceCommands';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';

export default function VoiceControl() {
  const { startListening, stopListening, isListening } = useVoiceCommands();
  const [showCommands, setShowCommands] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botão principal */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-4 rounded-full shadow-lg transition-all ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        aria-label={isListening ? 'Parar comando de voz' : 'Ativar comando de voz'}
      >
        {isListening ? (
          <StopIcon className="w-6 h-6 text-white" />
        ) : (
          <MicrophoneIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Lista de comandos */}
      {showCommands && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <h3 className="font-bold mb-2">Comandos Disponíveis:</h3>
          <div className="space-y-1 text-sm">
            <div>"Iniciar análise de currículo"</div>
            <div>"Começar simulação de entrevista"</div>
            <div>"Abrir meu dashboard"</div>
            <div>"Ver meu plano de carreira"</div>
            <div>"Buscar vagas"</div>
          </div>
        </div>
      )}

      {/* Botão de ajuda */}
      <button
        onClick={() => setShowCommands(!showCommands)}
        className="mt-2 p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
        aria-label="Ver comandos de voz disponíveis"
      >
        ?
      </button>
    </div>
  );
}
```

---

## ♿ **Padrões de Acessibilidade (WCAG 2.1 AA)**

### **Suporte a Screen Readers**
- **ARIA Labels**: Todos os elementos interativos
- **Landmarks**: Navigation, main, aside adequados  
- **Live Regions**: Anúncios de mudanças dinâmicas
- **Focus Management**: Navegação lógica por Tab

### **Navegação por Teclado**
```
Tab         → Próximo elemento
Shift+Tab   → Elemento anterior
Enter/Space → Ativar botão/link
Escape      → Fechar modal/dropdown
Arrow Keys  → Navegação em menus
```

### **Suporte Visual**
- **Alto Contraste**: Modo específico para baixa visão
- **Zoom até 200%**: Layout responsivo
- **Texto Legível**: Fontes de pelo menos 16px
- **Cores Semânticas**: Não apenas cor para indicar estado

---

## 🔧 **Configurações de Acessibilidade**

### **Painel de Preferências**
```jsx
// Configurações que o usuário pode ajustar
const accessibilitySettings = {
  voiceCommands: true,
  textToSpeech: true,
  speechRate: 1.0,        // Velocidade de fala
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  autoTTS: true,          // Leitura automática de respostas
  voiceLanguage: 'pt-BR'
};
```

---

## 📱 **Compatibilidade**

### **Navegadores Suportados**
- ✅ **Chrome/Edge**: Suporte completo
- ✅ **Firefox**: Suporte parcial (sem voz)
- ✅ **Safari**: Suporte mobile limitado
- ❌ **IE**: Não suportado

### **Dispositivos**
- ✅ **Desktop**: Experiência completa
- ✅ **Mobile**: Comandos de voz otimizados
- ✅ **Tablet**: Interface adaptada
- ✅ **Screen Readers**: NVDA, JAWS, VoiceOver

---

## 🧪 **Testes de Acessibilidade**

### **Ferramentas de Teste**
- **axe-core**: Testes automáticos de acessibilidade
- **WAVE**: Validação visual
- **Screen Reader Testing**: Testes manuais
- **Keyboard Navigation**: Verificação completa

### **Cenários de Teste**
1. **Usuário com deficiência visual**: Screen reader + comandos de voz
2. **Usuário com deficiência motora**: Apenas comandos de voz
3. **Usuário em ambiente ruidoso**: Modo texto apenas
4. **Usuário mobile**: Comandos otimizados para touch

---

*A acessibilidade não é um "extra" - é um **requisito fundamental** para democratizar verdadeiramente o acesso à mentoria de carreira.*