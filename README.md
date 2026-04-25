# Afiliado ML 🚀

Plataforma de afiliados orientada a SEO programático, focada em recomendação e comparação de produtos utilizando dados do Mercado Livre.

> Projeto desenvolvido com foco em **escalabilidade, performance e geração de receita**, aplicando conceitos reais de produto digital e engenharia de software.

---

## 📌 Objetivo

Construir um sistema capaz de gerar múltiplas páginas com intenção de compra, capturando tráfego orgânico e monetizando via afiliados.

---

## 🧠 Conceitos Aplicados

* Programmatic SEO
* Server-Side Rendering (SSR) e Static Generation (SSG)
* Arquitetura modular (separação de responsabilidades)
* Consumo e tratamento de APIs externas
* Normalização de dados não estruturados
* Performance e otimização para SEO (Core Web Vitals)
* Conversão (UX orientado a clique)

---

## 🏗️ Stack Tecnológica

### Frontend & Backend

* Next.js (App Router, Server Components, SSR, SSG)
* React
* TypeScript

### Estilização

* Tailwind CSS

### UI

* shadcn/ui
* Lucide

### Formulários & SEO

* React Hook Form
* next-seo

### Validação

* Zod (validação e tipagem de dados)

### Integrações

* API do Mercado Livre

### Backend (API Routes)

- Endpoints internos para busca e processamento de produtos
- Camada de serviço desacoplada da UI
- Preparado para cache e otimização futura

---

## 📂 Arquitetura do Projeto

```bash
/src
  /app
    /teclados/[slug]
    /mouses/[slug]
    /headsets/[slug]
    /comparar/[slug]
    /api

  /components
    ProductCard.tsx
    ComparisonTable.tsx

  /lib
    /services        # integração com APIs externas
    /normalizers     # padronização de dados
    /validators      # schemas Zod

  /data
    paginas.ts       # fonte de verdade das páginas SEO

  /types
```

---

## ⚙️ Funcionamento

### 1. Programmatic SEO

As páginas são geradas dinamicamente a partir de uma estrutura de dados:

```ts
export const paginas = [
  {
    slug: "melhor-teclado-ate-200",
    query: "teclado mecânico até 200",
    categoria: "teclados"
  }
];
```

---

### 2. Consumo de API externa

* Integração com a API do Mercado Livre
* Normalização de atributos inconsistentes (ex: RAM, DPI, etc.)
* Transformação de dados para exibição padronizada

---

### 3. Validação de dados (Zod)

Os dados externos são validados antes de serem utilizados:

```ts
import { z } from "zod";

export const ProdutoSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  preco: z.number(),
  link: z.string().url(),
});

export type Produto = z.infer<typeof ProdutoSchema>;
```

**Benefícios:**

* Segurança ao consumir APIs externas
* Tipagem confiável
* Redução de erros em runtime

---

### 4. Renderização

* SSR/SSG para melhor indexação no Google
* Páginas otimizadas para Core Web Vitals

---

## 💰 Monetização

* Links de afiliado do Mercado Livre
* Estrutura preparada para:

  * Google AdSense
  * Email marketing

---

## 📈 Escalabilidade

O sistema permite crescimento através de:

* Adição de novas páginas via configuração
* Reutilização de templates
* Expansão por nichos (teclados, mouses, headsets)

---

## 🧪 Desafios Técnicos Resolvidos

* Normalização de dados inconsistentes de API externa
* Geração dinâmica de páginas SEO-friendly
* Separação clara entre UI, lógica e integração
* Estrutura preparada para cache e alta escala

---

## 🚀 Roadmap

### Fase 1

* [ ] Integração com API
* [ ] Listagem de produtos
* [ ] Links afiliados

### Fase 2

* [ ] Comparador de produtos
* [ ] SEO avançado
* [ ] Deploy

### Fase 3

* [ ] Sistema de usuários
* [ ] Email marketing
* [ ] Automações

---

## ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar ambiente de desenvolvimento
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🧠 Decisões Técnicas

- Uso de Programmatic SEO ao invés de CMS tradicional para escala
- Estrutura baseada em configuração (paginas.ts) para facilitar expansão
- Normalização de dados para lidar com inconsistência da API externa
- Separação entre camada de dados, UI e integração

---

## 🎯 Diferenciais do Projeto

* Aplicação real com potencial de monetização
* Arquitetura pensada para escala
* Uso de SEO como estratégia de produto
* Integração com API externa em ambiente real
* Validação robusta de dados com Zod
* Foco em performance e conversão

---

## 👨‍💻 Autor

Everton Brandão de Moura

* GitHub: https://github.com/Everton3012
* LinkedIn: https://www.linkedin.com/in/evertonbrandao/

---

## 📄 Licença

MIT
