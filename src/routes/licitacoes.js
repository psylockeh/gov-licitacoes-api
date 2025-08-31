const { Router } = require("express");
const prisma = require("../libs/prisma");
const { listQuerySchema } = require("../validators/licitacoes");

const router = Router();

router.get("/licitacoes", async (req, res, next) => {
  try {
    const { uf, modalidade, q, pagina, limite } = listQuerySchema.parse(req.query);

    const where = {};
    if (uf) where.uf = uf;
    if (modalidade) where.modalidade = { equals: modalidade, mode: "insensitive" };
    if (q) where.objeto = { contains: q, mode: "insensitive" };

    const total = await prisma.licitacao.count({ where });
    const itens = await prisma.licitacao.findMany({
      where,
      orderBy: { dataAbertura: "desc" },
      skip: (pagina - 1) * limite,
      take: limite,
    });

    res.json({ pagina, limite, total, itens });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        code: "BAD_REQUEST",
        message: "Parâmetros inválidos",
        details: err.errors,
      });
    }
    next(err);
  }
});

module.exports = router;
