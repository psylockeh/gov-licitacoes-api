const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.licitacao.createMany({
    data: [
      {
        orgao: "Secretaria de Saúde",
        modalidade: "pregão",
        objeto: "Aquisição de medicamentos",
        uf: "SP",
        municipio: "São Paulo",
        valorEstimado: "150000.00",
        dataAbertura: new Date(),
        fonte: "dataset_teste",
      },
      {
        orgao: "Prefeitura",
        modalidade: "concorrência",
        objeto: "Obra de pavimentação",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        valorEstimado: "500000.00",
        dataAbertura: new Date(),
        fonte: "dataset_teste",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Seed ok");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
