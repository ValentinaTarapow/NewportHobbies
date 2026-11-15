import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container } from "../components/Container"
import { ProductCard } from "../components/ProductCard"
import { ProductVisual } from "../components/ProductMark"
import { Seo } from "../components/Seo"
import { VariantSwatch } from "../components/VariantSwatch"
import { WhatsAppButton } from "../components/WhatsAppButton"
import { getProduct, lengthMark, priceOf, products, type Product } from "../data/products"
import { asset } from "../lib/asset"
import { formatPrice, wholesaleNote } from "../lib/price"
import { site } from "../data/site"

export function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [variantIndex, setVariantIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    setVariantIndex(0)
    setHoverIndex(null)
    setImageIndex(0)
  }, [slug])

  if (!product) {
    return (
      <Container className="py-20">
        <Seo title="Pieza no encontrada" path={`/producto/${slug ?? ""}`} />
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-gold">Catálogo</p>
        <h1 className="mt-4 font-serif text-5xl font-normal text-ivory">No encontramos esa pieza</h1>
        <Link to="/catalogo" className="btn btn-line mt-8">
          Volver al catálogo
        </Link>
      </Container>
    )
  }

  const selectedVariant = product.variants[variantIndex]
  const variant = hoverIndex === null ? selectedVariant : product.variants[hoverIndex]
  const previewingOther = hoverIndex !== null && hoverIndex !== variantIndex
  const selectedImages = selectedVariant?.images?.length ? selectedVariant.images : (product.images ?? [])
  const photos = previewingOther ? (variant?.images ?? []) : selectedImages
  const photo = photos[previewingOther ? 0 : imageIndex] ?? photos[0]
  const gallery = previewingOther ? [] : selectedImages
  const others = products.filter((item) => item.slug !== product.slug).slice(0, 3)
  const shownPrice = priceOf(product, variant)
  const selectedPrice = priceOf(product, selectedVariant)
  const wholesale = wholesaleNote(product)
  const features = product.features.map((feature) =>
    feature.startsWith("Largo:") && selectedVariant ? `Largo: ${selectedVariant.name}` : feature,
  )
  const message = selectedVariant
    ? `Hola, quiero consultar la disponibilidad de ${product.name} (${selectedVariant.name}). Precio publicado: ${formatPrice(selectedPrice)}.${wholesale ? ` ${wholesale}` : ""}`
    : `Hola, quiero consultar la disponibilidad de ${product.name}. Precio publicado: ${formatPrice(product.price)}.${wholesale ? ` ${wholesale}` : ""}`

  return (
    <Container className="py-8 lg:pt-10 lg:pb-16">
      <Seo
        title={product.name}
        description={product.summary}
        path={`/producto/${product.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description.replace(/\*\*/g, ""),
            brand: { "@type": "Brand", name: site.name },
            category: product.category,
            offers: offerJson(product),
          }),
        }}
      />

      <nav aria-label="Miga de pan" className="text-[0.72rem] uppercase tracking-[0.2em] text-muted">
        <Link to="/catalogo" className="hover:text-ivory">
          Catálogo
        </Link>
        <span className="px-2 text-gold" aria-hidden="true">
          /
        </span>
        <Link to={`/catalogo?categoria=${encodeURIComponent(product.category)}`} className="text-ivory hover:text-gold">
          {product.category}
        </Link>
      </nav>

      <div className="mt-8 grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden" role="img" aria-label={variant ? `${product.name}, ${variant.name}` : product.name}>
            <ProductVisual
              key={photo ?? variant?.name ?? product.slug}
              image={photo}
              kind={product.kind}
              scene={product.scene}
              variant={variant}
              className="aspect-[4/5] w-full sm:aspect-[5/4]"
            />
          </div>
          {gallery.length > 1 ? (
            <div className="mt-3 flex gap-2">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  aria-label={photoLabel(src)}
                  aria-pressed={index === imageIndex}
                  onClick={() => setImageIndex(index)}
                  className={`w-16 overflow-hidden bg-ivory ${index === imageIndex ? "ring-1 ring-gold" : "opacity-70"}`}
                >
                  <img src={asset(src)} alt="" className="aspect-[3/4] w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
          {variant ? (
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.22em] text-gold">{variant.name}</p>
          ) : null}
          <div className="mt-12 hidden lg:block">
            {product.dimensions ? (
              <div className="grid grid-cols-2 gap-x-10">
                <DetailList title="Características" items={features} />
                <DetailList title="Dimensiones" items={product.dimensions} />
              </div>
            ) : (
              <DetailList title="Características" items={features} columns />
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-gold">{product.category}</p>
          <h1 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.45rem)] font-normal leading-snug text-ivory">
            {product.name}
          </h1>
          <p className="mt-6 text-[0.72rem] uppercase tracking-[0.22em] text-gold">Precio</p>
          <p className="mt-2 text-3xl text-ivory">{formatPrice(shownPrice)}</p>
          {wholesale ? <p className="mt-3 text-sm leading-relaxed text-muted">{wholesale}</p> : null}

          {product.variants.length > 1 && product.variantLabel ? (
            <fieldset className="mt-6">
              <legend className="flex items-baseline gap-3">
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory">{product.variantLabel}</span>
                {product.variants.some((item) => item.size) || !selectedVariant ? null : (
                  <span className="text-sm text-ivory">{selectedVariant.name}</span>
                )}
              </legend>
              <div
                className={`mt-3 flex items-center ${product.variants.some((item) => item.size) ? "flex-nowrap gap-1.5" : "flex-wrap gap-3"}`}
                role="radiogroup"
                aria-label={product.variantLabel}
              >
                {product.variants.map((item, index) => {
                  const selected = index === variantIndex
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={item.size ? `${lengthMark(item.name)}${item.price != null ? ` - ${formatPrice(item.price)}` : ""}` : item.name}
                      onClick={() => {
                        setVariantIndex(index)
                        setImageIndex(0)
                      }}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                      className={item.size ? `flex shrink-0 items-baseline gap-1.5 whitespace-nowrap border px-1.5 py-2 text-left text-[0.8125rem] min-[420px]:px-2.5 min-[420px]:text-sm ${selected ? "border-gold text-ivory" : "border-transparent text-muted"}` : "p-0.5"}
                    >
                      {item.size ? (
                        <>
                          <span>{lengthMark(item.name)}</span>
                          {item.price != null ? (
                            <>
                              <span aria-hidden="true">-</span>
                              <span>{formatPrice(item.price)}</span>
                            </>
                          ) : null}
                        </>
                      ) : (
                        <VariantSwatch variant={item} selected={selected} className="size-9" />
                      )}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : null}

          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            {product.description.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{renderMarks(paragraph)}</p>
            ))}
          </div>

          <DetailList title="Características" items={features} className="mt-10 lg:hidden" />
          {product.dimensions ? (
            <DetailList title="Dimensiones" items={product.dimensions} className="mt-10 lg:hidden" />
          ) : null}

          <WhatsAppButton message={message} className="mt-8 w-full sm:w-auto">
            Consultar disponibilidad
          </WhatsAppButton>
        </div>
      </div>

      <section className="mt-20 border-t border-line pt-14">
        <h2 className="font-serif text-4xl font-normal text-ivory">Otras piezas</h2>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {others.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </Container>
  )
}

function renderMarks(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-semibold text-ivory">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

function DetailList({
  title,
  items,
  className = "",
  columns = false,
}: {
  title: string
  items: string[]
  className?: string
  columns?: boolean
}) {
  return (
    <div className={className}>
      <h2 className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory">{title}</h2>
      <ul className={`mt-4 border-t border-line ${columns ? "grid grid-cols-2 gap-x-10" : ""}`}>
        {items.map((item) => (
          <li key={item} className="border-b border-line py-3 text-sm text-ivory">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function photoLabel(src: string) {
  if (src.includes("abierta")) return "Caja abierta"
  if (src.includes("todas")) return "Todas juntas"
  if (src.includes("caras")) return "Frente y dorso"
  if (src.includes("pack")) return "Pack"
  if (src.includes("cable")) return "Cable"
  if (src.includes("caja")) return "Caja"
  if (src.includes("maqueta")) return "Foto"
  return "Caja cerrada"
}

function offerJson(product: Product) {
  const prices = product.variants.some((item) => item.price != null)
    ? product.variants.map((item) => item.price ?? product.price)
    : [product.price]
  const unique = [...new Set(prices)]
  if (unique.length === 1) {
    return {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: unique[0],
      availability: "https://schema.org/LimitedAvailability",
    }
  }
  return {
    "@type": "AggregateOffer",
    priceCurrency: "ARS",
    lowPrice: Math.min(...unique),
    highPrice: Math.max(...unique),
    offerCount: unique.length,
    availability: "https://schema.org/LimitedAvailability",
  }
}
