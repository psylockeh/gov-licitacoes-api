require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./libs/logger");

const health = require("./routes/health");
const status = require("./routes/status");
const licitacoes = require("./routes/licitacoes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// request-id simples
app.use((req, _res, next) => {
  req.requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  next();
});

// rotas
app.use(health);
app.use(status);
app.use(licitacoes);

// erro não tratado
app.use((err, _req, res, _next) => {
  logger.error({ err }, "unhandled_error");
  res.status(500).json({ code: "INTERNAL_ERROR", message: "Erro interno" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info({ port }, "api_up"));

module.exports = app;
