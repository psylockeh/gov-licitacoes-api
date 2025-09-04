# ADR 0001: Escolha do Express

## Contexto

Precisei de um framework leve para construir a API REST do projeto.  
A escolha deveria priorizar simplicidade, comunidade ativa e documentação acessível.

## Decisão

Adotei o **Express.js** como framework principal para o backend.

## Consequências

- ✅ Framework amplamente usado, o que facilita encontrar exemplos e suporte.
- ✅ Integração simples com middlewares (CORS, Helmet, etc.).
- ⚠️ Menor suporte nativo para TypeScript, exigindo configuração manual.
