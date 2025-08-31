jest.mock("../src/libs/prisma", () => ({
  licitacao: {
    count: jest.fn().mockResolvedValue(2),
    findMany: jest.fn().mockResolvedValue([
      {
        id: "uuid-1",
        orgao: "Secretaria de Saúde",
        modalidade: "pregão",
        objeto: "Aquisição de medicamentos",
        uf: "SP",
        municipio: "São Paulo",
        valorEstimado: "150000.00",
        dataAbertura: new Date().toISOString(),
        fonte: "dataset_teste",
        createdAt: new Date().toISOString(),
      },
      {
        id: "uuid-2",
        orgao: "Prefeitura",
        modalidade: "concorrência",
        objeto: "Obra de pavimentação",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        valorEstimado: "500000.00",
        dataAbertura: new Date().toISOString(),
        fonte: "dataset_teste",
        createdAt: new Date().toISOString(),
      },
    ]),
  },
}));

const request = require("supertest");
const express = require("express");
const licitacoesRouter = require("../src/routes/licitacoes");

const app = express();
app.use(licitacoesRouter);

describe("GET /licitacoes", () => {
  it("deve listar com paginação default", async () => {
    const res = await request(app).get("/licitacoes");
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);
    expect(Array.isArray(res.body.itens)).toBe(true);
  });

  it("deve validar UF com 2 letras", async () => {
    const res = await request(app).get("/licitacoes?uf=S");
    expect(res.status).toBe(400);
    expect(res.body.code).toBe("BAD_REQUEST");
  });

  it("deve aceitar filtros", async () => {
    const res = await request(app).get(
      "/licitacoes?uf=sp&modalidade=pregao&q=medi&pagina=1&limite=10",
    );
    expect(res.status).toBe(200);
    expect(res.body.pagina).toBe(1);
    expect(res.body.limite).toBe(10);
  });
});
