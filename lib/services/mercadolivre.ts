import { MlSearchResponseSchema } from "@/lib/validators/produto"

const ML_BASE = "https://api.mercadolibre.com"

export async function buscarProdutosMl(query: string, limit = 12) {
  const url = new URL(`${ML_BASE}/sites/MLB/search`)
  url.searchParams.set("q", query)
  url.searchParams.set("limit", String(limit))

  const res = await fetch(url, {
    // cache simples (ajuste depois)
    next: { revalidate: 60 * 30 },
    headers: { Accept: "application/json" },
  })

  if (!res.ok) {
    throw new Error(`MercadoLivre API erro: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  const parsed = MlSearchResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error("Resposta da API do Mercado Livre fora do schema esperado")
  }

  return parsed.data.results
}