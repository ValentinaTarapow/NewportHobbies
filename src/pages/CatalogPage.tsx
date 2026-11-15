import { useSearchParams } from "react-router-dom"
import { Container } from "../components/Container"
import { PageIntro } from "../components/PageIntro"
import { ProductCard } from "../components/ProductCard"
import { Seo } from "../components/Seo"
import { categories, products } from "../data/products"

export function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const requested = params.get("categoria")
  const filter = requested && categories.includes(requested) ? requested : "Todas"
  const visible = filter === "Todas" ? products : products.filter((product) => product.category === filter)

  function select(next: string) {
    if (next === "Todas") setParams({})
    else setParams({ categoria: next })
  }

  return (
    <Container className="py-16 lg:py-24">
      <Seo
        title="Catálogo"
        description="Catálogo de Newport Hobbies. Deck boxes, storage, folios, maquetas y cables, con precio y ficha de cada producto."
        path="/catalogo"
      />
      <PageIntro eyebrow="Selección" title="Catálogo" />

      <div className="mt-10 flex flex-wrap gap-2" role="toolbar" aria-label="Filtrar por categoría">
        {["Todas", ...categories].map((category) => {
          const selected = category === filter
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => select(category)}
              className={`px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] ${
                selected ? "bg-ivory text-carbon" : "border border-line text-muted hover:text-ivory"
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Container>
  )
}
