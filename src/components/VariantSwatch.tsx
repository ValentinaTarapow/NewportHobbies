import { lengthMark, type Variant } from "../data/products"

type VariantSwatchProps = {
  variant: Variant
  selected?: boolean
  className?: string
}

export function VariantSwatch({ variant, selected = false, className = "size-[18px]" }: VariantSwatchProps) {
  if (variant.size) {
    return (
      <span
        aria-hidden="true"
        className={`text-[0.68rem] tracking-[0.06em] ${selected ? "text-gold" : "text-ivory group-hover/length:text-gold"}`}
      >
        {lengthMark(variant.name)}
      </span>
    )
  }

  const stroke = selected ? "#B7A276" : "rgba(243,241,236,0.72)"
  const strokeWidth = selected ? 1.5 : 1.15

  return (
    <svg viewBox="0 0 20 20" className={`block shrink-0 ${className}`} aria-hidden="true">
      {variant.secondary ? (
        <>
          <path d="M3.4 10 A6.6 6.6 0 0 1 16.6 10 Z" fill={variant.secondary} />
          <path d="M3.4 10 A6.6 6.6 0 0 0 16.6 10 Z" fill={variant.primary} />
        </>
      ) : (
        <circle cx="10" cy="10" r="6.6" fill={variant.primary} />
      )}
      <circle cx="10" cy="10" r="6.6" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  )
}
