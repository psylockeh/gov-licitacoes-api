# ADR 0002: Escolha do Prisma

## Contexto

O projeto exige um ORM moderno para facilitar a comunicação entre Node.js e PostgreSQL.  
Avaliações incluíram Sequelize, TypeORM e Prisma.

## Decisão

Adotei o **Prisma** como ORM do projeto.

## Consequências

- ✅ Tipagem forte com TypeScript, aumentando segurança no desenvolvimento.
- ✅ Migrações automáticas e fáceis de versionar.
- ✅ Client gerado automaticamente a partir do schema.
- ⚠️ Menor flexibilidade em queries extremamente complexas comparado ao SQL bruto.
