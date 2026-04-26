import type { Metadata } from "next"
import Link from "next/link"
import { getPagina } from "@/data/paginas"
import { buscarProdutosMl } from "@/lib/services/mercadolivre"
import { normalizarProdutoMl } from "@/lib/normalizers/produto"

type Params = { categoria: string; slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { categoria, slug } = await params
  const pagina = getPagina(categoria, slug)

  if (!pagina) return { title: "Página não encontrada" }

  return {
    title: pagina.titulo,
    description: `Recomendações de ${categoria} com base na busca: ${pagina.query}`,
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { categoria, slug } = await params
  const pagina = getPagina(categoria, slug)

  if (!pagina) {
    return (
      <div className="mx-auto w-full max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Página não encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Verifique o slug/categoria em <code>src/data/paginas.ts</code>.
        </p>
        <Link className="mt-4 inline-block underline" href="/">
          Voltar
        </Link>
      </div>
    )
  }

  const items = await buscarProdutosMl(pagina.query, 12)
  const produtos = items.map(normalizarProdutoMl)

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">{categoria}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{pagina.titulo}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Query: <code>{pagina.query}</code>
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {produtos.map((p) => (
          <li key={p.id} className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium line-clamp-2">{p.titulo}</div>
            <div className="mt-2 text-lg font-semibold">
              {p.moeda ?? "R$"} {p.preco.toFixed(2)}
            </div>
            <a
              className="mt-3 inline-block text-sm underline"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver no Mercado Livre
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}