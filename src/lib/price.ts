import type { Product } from "../data/products"

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}

export function wholesaleNote(product: Product) {
  const offer = product.wholesale
  if (!offer) return undefined
  return `En compras de ${offer.from} ${offer.unit} o más, ${formatPrice(offer.price)} ${offer.each}.`
}
