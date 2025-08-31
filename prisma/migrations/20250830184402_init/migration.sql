-- CreateTable
CREATE TABLE "public"."Licitacao" (
    "id" TEXT NOT NULL,
    "orgao" TEXT,
    "modalidade" TEXT,
    "objeto" TEXT,
    "uf" VARCHAR(2),
    "municipio" TEXT,
    "valorEstimado" DECIMAL(14,2),
    "dataAbertura" TIMESTAMP(3),
    "fonte" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Licitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Interesse" (
    "id" TEXT NOT NULL,
    "palavraChave" TEXT NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interesse_pkey" PRIMARY KEY ("id")
);
