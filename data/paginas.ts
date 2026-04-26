export type Categoria = "teclados" | "mouses" | "headsets"

export type PaginaSeo = {
  categoria: Categoria
  slug: string
  titulo: string
  query: string
}

export const paginas: PaginaSeo[] = [
  {
    categoria: "teclados",
    slug: "melhor-teclado-ate-200",
    titulo: "Melhores teclados até R$ 200",
    query: "teclado mecânico até 200",
  },
  {
    categoria: "mouses",
    slug: "melhor-mouse-para-fps",
    titulo: "Melhores mouses para FPS",
    query: "mouse gamer fps",
  },
  {
    categoria: "headsets",
    slug: "melhor-headset-custo-beneficio",
    titulo: "Melhores headsets custo-benefício",
    query: "headset gamer custo beneficio",
  },
]

export function getPagina(categoria: string, slug: string) {
  return paginas.find((p) => p.categoria === categoria && p.slug === slug)
}