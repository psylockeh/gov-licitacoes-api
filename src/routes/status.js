const { Router } = require("express");
const prisma = require("../libs/prisma");

const router = Router();

router.get("/status/licitacoes", async (_req, res, next) => {
  try {
    const total = await prisma.licitacao.count();
    res.json({
      status: "ok",
      totalRegistros: total,
      atualizadoEm: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
