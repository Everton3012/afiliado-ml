import { z } from "zod"

export const MlItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  permalink: z.string().url(),
  price: z.number(),
  currency_id: z.string().optional(),
  thumbnail: z.string().optional(),
})

export const MlSearchResponseSchema = z.object({
  results: z.array(MlItemSchema),
})

export type MlItem = z.infer<typeof MlItemSchema>

export const ProdutoSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  preco: z.number(),
  link: z.string().url(),
  imagem: z.string().url().optional(),
  moeda: z.string().optional(),
})

export type Produto = z.infer<typeof ProdutoSchema>