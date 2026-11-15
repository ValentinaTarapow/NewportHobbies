import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { lengthMark, priceOf, type Product, type Variant } from "../data/products"
import { formatPrice } from "../lib/price"
import { ProductVisual } from "./ProductMark"
import { VariantSwatch } from "./VariantSwatch"

type ProductCardProps = {
  product: Product
  clampName?: boolean
}

function LengthChip({ name, active }: { name: string; active: boolean }) {
  return (
    <span
      className={`rounded-md border px-1.5 py-1 text-[0.62rem] leading-none tracking-[0.06em] ${
        active ? "border-carbon bg-ivory text-carbon" : "border-carbon/15 bg-ivory/70 text-carbon"
      }`}
    >
      {lengthMark(name)}
    </span>
  )
}

function VariantRow({
  variants,
  label,
  activeIndex,
  onHover,
}: {
  variants: Variant[]
  label: string
  activeIndex: number
  onHover: (index: number | null) => void
}) {
  const lengths = Boolean(variants[0]?.size)
  const measureRef = useRef<HTMLUListElement>(null)
  const [visible, setVisible] = useState(variants.length)

  useLayoutEffect(() => {
    const list = measureRef.current
    if (!list) return

    const measure = () => {
      const swatches = [...list.querySelectorAll<HTMLElement>("[data-swatch]")]
      const more = list.querySelector<HTMLElement>("[data-more]")
      const pill = list.nextElementSibling
      const pad = pill ? Number.parseFloat(getComputedStyle(pill).paddingLeft) + Number.parseFloat(getComputedStyle(pill).paddingRight) : 0
      const max = list.clientWidth - pad
      const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0
      const moreWidth = more?.offsetWidth ?? 0
      let used = 0
      let count = swatches.length

      for (let index = 0; index < swatches.length; index += 1) {
        const next = used + (index > 0 ? gap : 0) + swatches[index].offsetWidth
        const hasMore = index < swatches.length - 1
        const limit = hasMore ? max - gap - moreWidth : max
        if (next > limit) {
          count = index
          break
        }
        used = next
      }

      setVisible((current) => (current === count ? current : count))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [variants])

  const hidden = variants.length - visible

  return (
    <div className="relative">
      <ul ref={measureRef} className={`pointer-events-none invisible absolute inset-x-0 flex ${lengths ? "gap-1" : "gap-1.5"}`} aria-hidden="true">
        {variants.map((item) => (
          <li key={item.name} data-swatch className="shrink-0">
            {lengths ? <LengthChip name={item.name} active={false} /> : <VariantSwatch variant={item} onLight className="size-[15px]" />}
          </li>
        ))}
        <li data-more className="ml-1 shrink-0 text-[0.7rem] leading-none text-carbon">
          +{variants.length}
        </li>
      </ul>
      <div className={lengths ? "inline-flex max-w-full" : "inline-flex max-w-full rounded-full bg-ivory/40 px-3 py-0.5 backdrop-blur-[2px]"}>
        <ul className={`flex items-center ${lengths ? "gap-1" : "gap-1.5"}`} aria-label={label}>
          {variants.slice(0, visible).map((item, index) => (
            <li key={item.name} className="shrink-0" onMouseEnter={() => onHover(index)} onMouseLeave={() => onHover(null)}>
              {lengths ? (
                <LengthChip name={item.name} active={index === activeIndex} />
              ) : (
                <VariantSwatch variant={item} onLight className="size-[15px]" />
              )}
              <span className="sr-only">{item.name}</span>
            </li>
          ))}
          {hidden > 0 ? (
            <li className="ml-1 shrink-0 text-[0.7rem] leading-none text-carbon" aria-label={`${hidden} más`}>
              +{hidden}
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  )
}

export function ProductCard({ product, clampName = false }: ProductCardProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const variant = product.variants[hoverIndex ?? 0]

  return (
    <article className="h-full overflow-hidden rounded-md border border-ivory/10 bg-[#17243a] shadow-[0_14px_32px_rgb(0_0_0/0.22)]">
      <Link to={`/producto/${product.slug}`} className="group flex h-full flex-col">
        <div className="relative overflow-hidden bg-carbon">
          <span className="absolute top-0 left-0 z-10 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
          <ProductVisual
            image={variant?.images?.[0] ?? product.images?.[0]}
            kind={product.kind}
            scene={product.scene}
            variant={variant}
            className="aspect-square w-full motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
          />
          {product.variants.length > 1 ? (
            <div className="absolute inset-x-3 bottom-3 z-20">
              <VariantRow
                variants={product.variants}
                label={product.variantLabel ?? "Variantes"}
                activeIndex={hoverIndex ?? 0}
                onHover={setHoverIndex}
              />
            </div>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col px-3 pt-3 pb-4">
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-gold">{product.category}</p>
          <h2 className={`mt-2 font-serif text-lg leading-snug text-ivory ${clampName ? "line-clamp-3" : ""}`} title={clampName ? product.name : undefined}>
            {product.name}
          </h2>
          <div className="mt-auto pt-4">
            <div className="border-t border-line pt-3">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">Precio</p>
              <p className="mt-1 text-xl text-ivory">{formatPrice(priceOf(product, variant))}</p>
              {product.wholesale ? (
                <p className="mt-1 text-xs leading-snug text-muted">
                  Desde {product.wholesale.from} {product.wholesale.unit}: {formatPrice(product.wholesale.price)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
