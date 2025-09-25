
# Nexa Frontend – Classificação Inteligente, Rápida e Assíncrona

O Nexa Frontend é a interface moderna e responsiva para o sistema Nexa, uma solução inovadora para classificação automática de partnumbers e itens industriais. Com integração em tempo real via WebSocket, notificações instantâneas e uma experiência de usuário fluida, o Nexa permite que empresas acelerem processos de classificação, reduzam erros e ganhem produtividade.

---

## Principais Funcionalidades

- **Classificação Assíncrona:** Submeta partnumbers e acompanhe o progresso em tempo real, sem travar seu fluxo de trabalho.
- **Notificações Globais:** Receba alertas instantâneos sobre o status da sua classificação, sucesso ou falha, em qualquer página do sistema.
- **Resultados Detalhados:** Visualize o resultado final da classificação com todos os campos relevantes (NCM, descrição, fabricante, exceções, etc.).
- **Experiência Moderna:** Interface construída com React, Vite e TypeScript, garantindo performance, escalabilidade e fácil manutenção.
- **Navegação Intuitiva:** Rotas claras para submissão, acompanhamento e visualização de resultados.

---

## Como Funciona?

1. **Submissão:** Preencha o formulário com o partnumber e dados opcionais.
2. **Processamento:** O backend Nexa processa sua solicitação de forma assíncrona.
3. **Acompanhamento:** Acompanhe o status em tempo real via WebSocket.
4. **Resultado:** Receba o resultado final assim que a classificação for concluída.

---

## Tecnologias Utilizadas

- **React + Vite:** Frontend ultrarrápido e moderno.
- **TypeScript:** Segurança e produtividade no desenvolvimento.
- **Socket.IO:** Comunicação em tempo real para feedback instantâneo.
- **React Context API:** Gerenciamento global de notificações.
- **TailwindCSS (ou similar):** Visual moderno e responsivo.

---

## Como rodar o projeto

```bash
# Instale as dependências
npm install

# Rode o projeto em modo desenvolvimento
npm run dev
```

> Certifique-se de que a API Nexa está rodando em http://localhost:5000

