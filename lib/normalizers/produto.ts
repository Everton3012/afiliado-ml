import type { MlItem, Produto } from "@/lib/validators/produto"

function toHttps(url?: string) {
  if (!url) return undefined
  return url.startsWith("http://") ? url.replace("http://", "https://") : url
}

export function normalizarProdutoMl(item: MlItem): Produto {
  return {
    id: item.id,
    titulo: item.title,
    preco: item.price,
    link: item.permalink,
    imagem: toHttps(item.thumbnail),
    moeda: item.currency_id,
  }
}