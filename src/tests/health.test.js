const request = require("supertest");
const express = require("express");
const health = require("../src/routes/health");

describe("GET /health", () => {
  const app = express();
  app.use(health);

  it("deve responder com ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
