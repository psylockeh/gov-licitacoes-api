# ADR 0003: Uso do Neon para PostgreSQL

## Contexto

Era necessário um banco de dados PostgreSQL em nuvem, com custo zero inicial, escalabilidade e integração simples com Prisma.

## Decisão

Adotei o **Neon** como serviço de hospedagem de banco de dados PostgreSQL.

## Consequências

- ✅ Plano gratuito com bom desempenho inicial.
- ✅ String de conexão simples, compatível com Prisma.
- ✅ Escalabilidade elástica sob demanda.
- ⚠️ Dependência de serviço externo (lock-in).
- ⚠️ Necessidade de configurar variáveis de ambiente seguras (`.env`).
