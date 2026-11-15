import { useState } from "react"
import { Link } from "react-router-dom"
import { priceOf, type Product } from "../data/products"
import { formatPrice } from "../lib/price"
import { ProductVisual } from "./ProductMark"
import { VariantSwatch } from "./VariantSwatch"

type ProductCardProps = {
  product: Product
  clampName?: boolean
}

export function ProductCard({ product, clampName = false }: ProductCardProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const variant = product.variants[hoverIndex ?? 0]

  return (
    <article className="h-full bg-graphite">
      <Link to={`/producto/${product.slug}`} className="group flex h-full flex-col">
        <div className="relative overflow-hidden">
          <span className="absolute top-0 left-0 z-10 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
          <ProductVisual
            image={variant?.images?.[0] ?? product.images?.[0]}
            kind={product.kind}
            scene={product.scene}
            variant={variant}
            className="aspect-square w-full motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col px-3 pt-3 pb-4">
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-gold">{product.category}</p>
          <h2 className={`mt-2 font-serif text-lg leading-snug text-ivory ${clampName ? "line-clamp-3" : ""}`} title={clampName ? product.name : undefined}>
            {product.name}
          </h2>
          <p className="mt-3 text-[0.62rem] uppercase tracking-[0.18em] text-muted">Precio</p>
          <p className="mt-1 text-base text-ivory">{formatPrice(priceOf(product, variant))}</p>
          {product.wholesale ? (
            <p className="mt-1 text-xs leading-snug text-muted">
              Desde {product.wholesale.from} {product.wholesale.unit}: {formatPrice(product.wholesale.price)}
            </p>
          ) : null}
          {product.variants.length > 1 ? (
            <ul className="mt-3.5 grid w-fit grid-cols-4 gap-2" aria-label={product.variantLabel ?? "Variantes"}>
              {product.variants.map((item, index) => (
                <li
                  key={item.name}
                  className="group/length"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <VariantSwatch variant={item} />
                  <span className="sr-only">{item.name}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
