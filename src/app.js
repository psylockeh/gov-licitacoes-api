require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./libs/logger");

const health = require("./routes/health");
const status = require("./routes/status");
const licitacoes = require("./routes/licitacoes");
const sandbox = require("./routes/sandbox");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use((req, _res, next) => {
  req.requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  next();
});

// rotas
app.use(health);
app.use(status);
app.use(licitacoes);
app.use(sandbox);

app.use((err, _req, res, _next) => {
  logger.error({ err }, "unhandled_error");
  const status = err.status || err.statusCode || 500;
  const body = {
    code: status >= 500 ? "INTERNAL_ERROR" : "BAD_REQUEST",
    message: process.env.NODE_ENV === "production" && status >= 500 ? "Erro interno" : err.message,
  };
  if (process.env.NODE_ENV !== "production" && err.cause) {
    body.details = err.cause;
  }
  res.status(status).json(body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info({ port }, "api_up"));

module.exports = app;
