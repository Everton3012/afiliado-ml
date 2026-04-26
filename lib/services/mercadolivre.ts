import { MlSearchResponseSchema } from "@/lib/validators/produto"

const ML_BASE = "https://api.mercadolibre.com"

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  const text = await res.text()

  if (!res.ok) {
    // inclui corpo pra entender o motivo (alguns 403 vêm com mensagem)
    throw new Error(
      `MercadoLivre API erro: ${res.status} ${res.statusText} | body: ${text.slice(0, 300)}`
    )
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`MercadoLivre API retornou não-JSON | body: ${text.slice(0, 300)}`)
  }
}

export async function buscarProdutosMl(query: string, limit = 12) {
  // tenta endpoint padrão
  const url = new URL(`${ML_BASE}/sites/MLB/search`)
  url.searchParams.set("q", query)
  url.searchParams.set("limit", String(limit))

  const commonHeaders = {
    Accept: "application/json",
    // alguns WAFs bloqueiam requests "genéricos"
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
    Referer: "https://www.mercadolivre.com.br/",
    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
  }

  try {
    const json = await fetchJson(url.toString(), {
      next: { revalidate: 60 * 30 },
      headers: commonHeaders,
    })

    const parsed = MlSearchResponseSchema.safeParse(json)
    if (!parsed.success) {
      throw new Error("Resposta da API do Mercado Livre fora do schema esperado")
    }
    return parsed.data.results
  } catch (e) {
    // fallback: endpoint guest (algumas regiões bloqueiam o /sites/*)
    const guestUrl = new URL(`${ML_BASE}/products/search`)
    guestUrl.searchParams.set("status", "active")
    guestUrl.searchParams.set("site_id", "MLB")
    guestUrl.searchParams.set("q", query)
    guestUrl.searchParams.set("limit", String(limit))

    const json = await fetchJson(guestUrl.toString(), {
      next: { revalidate: 60 * 30 },
      headers: commonHeaders,
    })

    // esse endpoint costuma devolver { results: [...] } também, mas pode variar
    const parsed = MlSearchResponseSchema.safeParse(json)
    if (!parsed.success) {
      throw e instanceof Error ? e : new Error(String(e))
    }
    return parsed.data.results
  }
}