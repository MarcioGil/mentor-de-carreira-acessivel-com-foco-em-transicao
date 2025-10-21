import { hostname } from 'os'

// Função para obter o IP local da máquina
export function getLocalIP(): string {
  if (typeof window !== 'undefined') {
    return window.location.hostname
  }
  
  try {
    const interfaces = require('os').networkInterfaces()
    
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        // Pular interfaces internas e não IPv4
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address
        }
      }
    }
  } catch (error) {
    console.warn('Erro ao obter IP local:', error)
  }
  
  return 'localhost'
}

// Função para gerar URL para acesso mobile
export function getMobileURL(): string {
  const ip = getLocalIP()
  const port = process.env.PORT || 3000
  return `http://${ip}:${port}`
}

// Instruções para usuário
export function getMobileInstructions(): string {
  const url = getMobileURL()
  
  return `
📱 ACESSO MOBILE - MENTOR DE CARREIRA IA

🌐 URL para celular: ${url}

📋 INSTRUÇÕES RÁPIDAS:

1. 📱 Abra o navegador do celular
2. 🔗 Digite o link acima 
3. 📑 Salve nos favoritos
4. 🎤 Use comandos de voz no transporte!

🎯 COMANDOS DE VOZ:
• "analisar currículo" 
• "simular entrevista"
• "buscar vagas"
• "página inicial"

✅ FUNCIONA EM:
• 🚌 Ônibus, trem, metrô
• 📴 Modo offline (após carregamento)
• 🎧 Com ou sem fones de ouvido
• 🌙 Modo escuro automático

❓ PROBLEMAS?
• Permita acesso ao microfone
• Mesma rede WiFi obrigatória
• Fale pausadamente

💡 DICA: Instale como app tocando "Adicionar à tela inicial"!
`
}

// Exibir instruções no console quando o servidor iniciar
if (typeof window === 'undefined') {
  console.log('\n' + '='.repeat(60))
  console.log('🚀 MENTOR DE CARREIRA IA - SERVIDOR INICIADO')
  console.log('='.repeat(60))
  console.log(getMobileInstructions())
  console.log('='.repeat(60) + '\n')
}