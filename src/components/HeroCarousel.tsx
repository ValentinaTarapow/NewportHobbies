import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { products, type Product } from "../data/products"
import { asset } from "../lib/asset"

const labels: Record<string, string> = {
  "deck-box-tcg": "Deck box",
  "estuche-tcg-4-filas": "Estuche",
  "maqueta-cafe": "Café",
  "maqueta-librero": "Librero",
  "maqueta-taberna": "Taberna",
  "cable-hdmi-21": "HDMI 2.1",
  "cable-hdmi-22": "HDMI 2.2",
}

function coverImage(product: Product) {
  const images = [...(product.images ?? []), ...product.variants.flatMap((variant) => variant.images ?? [])]
  return images.find((src) => src.includes("frente") || src.includes("-1.") || src.includes("caja")) ?? images[0]
}

const slides = products.filter((product) => product.kind !== "sleeves" && coverImage(product))

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = slides.length

  useEffect(() => {
    if (paused || count < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, 4500)
    return () => window.clearInterval(id)
  }, [paused, count])

  if (count === 0) return null

  function go(next: number) {
    setIndex((next + count) % count)
  }

  const slide = slides[index]
  const label = labels[slide.slug] ?? slide.summary

  return (
    <div
      className="w-full min-w-0 max-w-[420px] sm:max-w-[460px] lg:ml-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
      }}
      onTouchStart={(event) => {
        touchX.current = event.changedTouches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        if (touchX.current == null) return
        const delta = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
        if (delta > 40) go(index - 1)
        if (delta < -40) go(index + 1)
        touchX.current = null
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-graphite" aria-roledescription="carrusel" aria-label="Productos">
        {slides.map((item, itemIndex) => {
          const src = coverImage(item)
          const name = labels[item.slug] ?? item.name
          const active = itemIndex === index
          return (
            <Link
              key={item.slug}
              to={`/producto/${item.slug}`}
              tabIndex={active ? 0 : -1}
              aria-hidden={!active}
              inert={active ? undefined : true}
              className={`absolute inset-0 block motion-safe:transition-opacity motion-safe:duration-700 ${
                active ? "z-10 opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img src={asset(src)} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
              <img src={asset(src)} alt={name} className="absolute inset-0 h-full w-full object-contain" />
            </Link>
          )
        })}

        <button
          type="button"
          aria-label="Foto anterior"
          className="absolute top-1/2 left-3 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center border border-line bg-carbon/70 text-xl text-ivory"
          onClick={() => go(index - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          className="absolute top-1/2 right-3 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center border border-line bg-carbon/70 text-xl text-ivory"
          onClick={() => go(index + 1)}
        >
          ›
        </button>

        <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2">
          {slides.map((item, itemIndex) => (
            <button
              key={item.slug}
              type="button"
              aria-label={labels[item.slug] ?? item.name}
              aria-current={itemIndex === index ? "true" : undefined}
              className={`h-px w-6 ${itemIndex === index ? "bg-gold" : "bg-ivory/40"}`}
              onClick={() => go(itemIndex)}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-[0.72rem] text-gold">
        <Link to={`/producto/${slide.slug}`} className="hover:text-ivory">
          <span className="uppercase tracking-[0.22em] mr-[-0.22em]">{slide.category}</span>
          <span className="px-[0.7em] text-ivory">-</span>
          <span className="text-ivory">{label}</span>
        </Link>
      </p>
    </div>
  )
}
