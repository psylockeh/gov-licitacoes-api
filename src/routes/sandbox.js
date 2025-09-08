const { Router } = require("express");
const { z } = require("zod");
const { consultarLicitacoes } = require("../connectors/comprasLegado");

const router = Router();

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "Data deve estar no formato YYYY-MM-DD",
});

const toIntParam = (min, max, def) =>
  z
    .union([z.string(), z.number(), z.undefined(), z.null()])
    .transform((v) => {
      if (typeof v === "number") return v;
      if (typeof v === "string") {
        const t = v.trim();
        if (t === "") return def;
        const n = Number(t);
        return Number.isFinite(n) ? n : def;
      }
      return def;
    })
    .pipe(z.number().int().min(min).max(max));

const toOptionalInt = () =>
  z
    .union([z.string(), z.number(), z.undefined(), z.null()])
    .transform((v) => {
      if (v === undefined || v === null || (typeof v === "string" && v.trim() === ""))
        return undefined;
      const n = typeof v === "number" ? v : Number(String(v).trim());
      return Number.isFinite(n) ? n : undefined;
    })
    .optional();

const Query = z.object({
  pagina: z.coerce.number().int().min(1).default(1),
  tamanhoPagina: z.coerce.number().int().min(10).max(500).default(20),
  uasg: z.coerce.number().int().optional(),
  numero_aviso: z.coerce.number().int().optional(),
  modalidade: z.coerce.number().int().optional(),
  data_publicacao_inicial: dateSchema.optional(),
  data_publicacao_final: dateSchema.optional(),
});

router.get("/sandbox/licitacoes-reais", async (req, res, next) => {
  try {
    const q = Query.parse(req.query);

    // default últimos 7 dias
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const fmt = (d) => d.toISOString().slice(0, 10);

    const data = await consultarLicitacoes({
      ...q,
      data_publicacao_inicial: q.data_publicacao_inicial ?? fmt(weekAgo),
      data_publicacao_final: q.data_publicacao_final ?? fmt(today),
    });

    res.json({ fonte: "modulo-legado/1_consultarLicitacao", params: q, ...data });
  } catch (err) {
    console.error("[sandbox]", err.status || 500, err.message, err.cause || "");
    next(err);
  }
});

module.exports = router;
