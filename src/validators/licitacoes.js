const { z } = require("zod");

// uf: 2 letras; modalidade/q opcionais; pagina/limite com defaults
const listQuerySchema = z.object({
  uf: z
    .string()
    .trim()
    .length(2, "UF deve ter 2 letras")
    .transform((v) => v.toUpperCase())
    .optional(),
  modalidade: z.string().trim().min(1).optional(),
  q: z.string().trim().min(2, "q deve ter pelo menos 2 caracteres").optional(),
  pagina: z.preprocess((v) => Number(v ?? 1), z.number().int().min(1)).default(1),
  limite: z.preprocess((v) => Number(v ?? 20), z.number().int().min(1).max(100)).default(20),
});

module.exports = { listQuerySchema };
