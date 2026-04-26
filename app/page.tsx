import Link from "next/link"
import { paginas } from "@/data/paginas"

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Afiliado ML</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Páginas geradas via <code>src/data/paginas.ts</code>.
      </p>

      <ul className="mt-6 space-y-2">
        {paginas.map((p) => (
          <li key={`${p.categoria}/${p.slug}`}>
            <Link className="underline" href={`/${p.categoria}/${p.slug}`}>
              {p.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}