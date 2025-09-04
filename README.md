# gov-licitacoes-api

API para consulta de licitações públicas, construída como estudo de boas práticas de desenvolvimento de software.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) (ORM)
- [PostgreSQL](https://www.postgresql.org/) hospedado no [Neon](https://neon.tech/)
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) para testes
- ESLint + Prettier para linting e formatação

## 📂 Estrutura do Projeto

gov-licitacoes-api/
├── src/
│ ├── routes/
│ ├── prisma/
│ └── ...
├── docs/
│ └── adr/
├── .gitignore
├── LICENSE
├── README.md
└── package.json

## ⚙️ Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/gov-licitacoes-api.git
   cd gov-licitacoes-api
   ```

npm install

Configure as variáveis de ambiente:
Crie um arquivo .env na raiz:
DATABASE_URL="sua-string-de-conexao-do-neon"

Rode as migrações do banco:
npx prisma migrate dev --name init

Inicie o servidor:

npm run dev

npm test

As decisões arquiteturais estão documentadas em docs/adr.
