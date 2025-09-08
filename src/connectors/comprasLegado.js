const BASE = "https://dadosabertos.compras.gov.br/modulo-legado/1_consultarLicitacao";

function asISO(d) {
  if (typeof d === "string") return d;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function ensureISO(d) {
  const s = asISO(d);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const err = new Error("Datas inválidas: use YYYY-MM-DD");
    err.status = 400;
    throw err;
  }
  return s;
}

async function consultarLicitacoes(params) {
  const {
    pagina = 1,
    tamanhoPagina = 20,
    uasg,
    numero_aviso,
    modalidade,
    data_publicacao_inicial,
    data_publicacao_final,
  } = params;

  const dIni = ensureISO(data_publicacao_inicial);
  const dFim = ensureISO(data_publicacao_final);

  const size = Math.min(500, Math.max(10, Number(tamanhoPagina) || 20));
  qs.set("tamanhoPagina", String(size));

  const diffDays = Math.ceil((new Date(dFim) - new Date(dIni)) / 86400000);
  if (diffDays < 0 || diffDays > 365) {
    const e = new Error("Janela de datas inválida: deve ser 0–365 dias");
    e.status = 400;
    throw e;
  }

  const qs = new URLSearchParams();
  qs.set("pagina", String(pagina));
  qs.set("tamanhoPagina", String(tamanhoPagina));
  if (uasg) qs.set("uasg", String(uasg));
  if (numero_aviso) qs.set("numero_aviso", String(numero_aviso));
  if (modalidade) qs.set("modalidade", String(modalidade));
  qs.set("data_publicacao_inicial", dIni);
  qs.set("data_publicacao_final", dFim);

  const url = `${BASE}?${qs.toString()}`;
  const res = await fetch(url, { headers: { accept: "application/json" } });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(
      `Compras API falhou: ${res.status} ${res.statusText} | ${body.slice(0, 300)}`,
    );
    err.status = res.status;
    err.cause = { url };
    throw err;
  }

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const body = await res.text().catch(() => "");
    const err = new Error(`Resposta não-JSON | CT=${ct} | ${body.slice(0, 300)}`);
    err.status = 502;
    err.cause = { url };
    throw err;
  }

  return res.json();
}

module.exports = { consultarLicitacoes };
