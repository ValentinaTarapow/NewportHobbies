import type { MaquetaScene, ProductKind, Variant } from "../data/products"
import { asset } from "../lib/asset"

type ProductMarkProps = {
  kind: ProductKind
  variant?: Variant
  scene?: MaquetaScene
  className?: string
}

function DeckBox({ primary, secondary }: { primary: string; secondary: string }) {
  const stitch = "#f4efd2"
  return (
    <g transform="translate(104 72)">
      <rect width="192" height="312" rx="10" fill={primary} />
      <rect x="14" y="14" width="164" height="284" rx="6" fill="none" stroke={stitch} strokeWidth="1.3" strokeDasharray="2.2 2.4" />
      <path d="M22 58 H170" stroke={stitch} strokeWidth="1.2" strokeDasharray="2.2 2.4" />
      <rect x="36" y="84" width="120" height="176" rx="12" fill="none" stroke={stitch} strokeWidth="1.3" strokeDasharray="2.2 2.4" />
      <rect x="48" y="96" width="96" height="152" rx="8" fill={secondary} />
    </g>
  )
}

function StorageBox({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <g transform="translate(58 140)">
      <rect width="284" height="196" rx="6" fill={primary} />
      <rect width="284" height="64" rx="6" fill={secondary} />
      <rect y="50" width="284" height="14" fill={secondary} />
      <path d="M0 64 H284" stroke="#b7a276" strokeWidth="1.5" />
      <rect x="28" y="96" width="228" height="64" rx="2" fill="#f3f1ec" opacity="0.08" />
    </g>
  )
}

function Sleeves({ back }: { back: string }) {
  return (
    <g transform="translate(108 96)">
      <rect x="18" y="16" width="132" height="188" rx="6" fill={back} />
      <rect width="132" height="188" rx="6" fill="#161616" />
      <rect x="12" y="14" width="108" height="128" rx="3" fill="#f3f1ec" opacity="0.08" />
      <rect y="156" width="132" height="32" rx="6" fill={back} />
      <rect y="156" width="132" height="10" fill={back} />
    </g>
  )
}

function CafeScene() {
  return (
    <g transform="translate(78 168)">
      <rect x="28" y="118" width="188" height="16" rx="2" fill="#c4b49a" />
      <rect x="40" y="134" width="16" height="48" fill="#2a2c2e" />
      <rect x="188" y="134" width="16" height="48" fill="#2a2c2e" />
      <rect x="96" y="62" width="52" height="56" rx="4" fill="#f3f1ec" />
      <path d="M148 78 H168 C180 78 180 102 168 102 H148" fill="none" stroke="#b7a276" strokeWidth="3" />
      <path d="M108 62 C114 40 130 40 136 62" fill="none" stroke="#b7a276" strokeWidth="1.4" />
    </g>
  )
}

function LibraryScene() {
  return (
    <g transform="translate(92 120)">
      <rect width="216" height="250" rx="4" fill="#1a2433" />
      {[0, 1, 2, 3].map((shelf) => (
        <g key={shelf} transform={`translate(16 ${28 + shelf * 54})`}>
          <rect width="184" height="6" fill="#b7a276" />
          <rect y="-28" width="22" height="28" fill="#9d2f35" />
          <rect x="26" y="-36" width="18" height="36" fill="#24568f" />
          <rect x="48" y="-24" width="26" height="24" fill="#e7dcc8" />
          <rect x="78" y="-32" width="16" height="32" fill="#2f8a52" />
          <rect x="98" y="-22" width="30" height="22" fill="#6a2c9a" />
          <rect x="132" y="-30" width="20" height="30" fill="#c8b48a" />
        </g>
      ))}
      <circle cx="188" cy="18" r="4" fill="#b7a276" />
    </g>
  )
}

function TavernScene() {
  return (
    <g transform="translate(70 130)">
      <path d="M40 240 V90 H150 L190 130 V240 Z" fill="#1c2430" />
      <path d="M40 90 H150 L190 130" fill="none" stroke="#b7a276" strokeWidth="2" />
      <rect x="62" y="120" width="36" height="48" fill="#e7dcc8" opacity="0.85" />
      <rect x="112" y="120" width="28" height="40" fill="#e7dcc8" opacity="0.55" />
      <rect x="78" y="188" width="34" height="52" fill="#9d2f35" />
      <circle cx="168" cy="70" r="5" fill="#b7a276" />
      <path d="M168 75 V98" stroke="#b7a276" strokeWidth="1.4" />
    </g>
  )
}

function Hdmi({ size, metal }: { size: number; metal: string }) {
  const drop = 36 + size * 26
  return (
    <g>
      <path
        d={`M78 210 C 130 ${210 + drop}, 270 ${210 + drop}, 322 210`}
        fill="none"
        stroke="#2c2e30"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="48" y="192" width="36" height="36" rx="3" fill={metal} />
      <rect x="316" y="192" width="36" height="36" rx="3" fill={metal} />
      <rect x="56" y="202" width="16" height="16" fill="#161616" />
      <rect x="328" y="202" width="16" height="16" fill="#161616" />
    </g>
  )
}

export function ProductVisual({ image, kind, variant, scene = "cafe", className = "" }: ProductMarkProps & { image?: string }) {
  if (image) {
    const src = asset(image)
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img src={src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-contain" />
      </div>
    )
  }
  return <ProductMark kind={kind} variant={variant} scene={scene} className={className} />
}

export function ProductMark({ kind, variant, scene = "cafe", className = "" }: ProductMarkProps) {
  const primary = variant?.primary ?? "#1c1c1e"
  const secondary = variant?.secondary ?? "#b7a276"

  return (
    <svg viewBox="0 0 400 500" className={className} aria-hidden="true">
      <rect width="400" height="500" fill="#0e182a" />
      {kind === "deck-box" ? <DeckBox primary={primary} secondary={secondary} /> : null}
      {kind === "storage-box" ? <StorageBox primary={primary} secondary={secondary} /> : null}
      {kind === "sleeves" ? <Sleeves back={primary} /> : null}
      {kind === "book-topper" && scene === "cafe" ? <CafeScene /> : null}
      {kind === "book-topper" && scene === "library" ? <LibraryScene /> : null}
      {kind === "book-topper" && scene === "tavern" ? <TavernScene /> : null}
      {kind === "hdmi" ? <Hdmi size={variant?.size ?? 2} metal={secondary} /> : null}
    </svg>
  )
}
