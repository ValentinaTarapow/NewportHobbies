export type Variant = {
  name: string
  primary: string
  secondary?: string
  size?: number
  /** Precio de esta variante, si difiere del precio del producto. */
  price?: number
  /** Fotos de esta variante, relativas a public/. */
  images?: string[]
}

export type ProductKind = "deck-box" | "storage-box" | "sleeves" | "book-topper" | "hdmi"

export type MaquetaScene = "cafe" | "library" | "tavern"

export type Product = {
  slug: string
  name: string
  category: string
  summary: string
  description: string
  features: string[]
  dimensions?: string[]
  kind: ProductKind
  scene?: MaquetaScene
  variantLabel?: string
  variants: Variant[]
  /** Fotos del producto, relativas a public/. Se usan si no hay fotos por variante. */
  images?: string[]
  /** Precio en pesos argentinos. */
  price: number
  /** Precio por cantidad. */
  wholesale?: {
    from: number
    unit: string
    price: number
    each: string
  }
}

const negro = "#161616"
const rojo = "#9d2f35"
const azul = "#3d5bd9"
const marino = "#1a2b4a"
const gris = "#8d9096"
const violeta = "#6a2c9a"
const verde = "#1a5c42"
const amarillo = "#f0d34a"
const crema = "#c8b48a"
const naranja = "#e07a2a"
const hdmi21Photos = ["productos/hdmi-21-caja.jpg", "productos/hdmi-21-cable.jpg"]

export const products: Product[] = [
  {
    slug: "deck-box-tcg",
    name: "Deck Box - Caja Cuero Premium magnética con visor para 100+ Cartas TCG",
    category: "TCG",
    summary: "Deck box de cuero premium, magnética y con visor, para 100+ cartas.",
    description:
      "Una opción bien fachera, compacta y liviana para llevar tu mazo de cartas. Tiene el valor agregado del display para poner a tu comandante (u otra carta pertinente a tu TCG predilecto) y así identificar rápidamente qué tenés metido ahí adentro.",
    features: [
      "Espacio para 230+ cartas sin enfoliar, 130+ cartas con folio simple o 100+ cartas con doble folio",
      "Cuerpo exterior negro con interior de color",
      "Revestimiento interno de microfibra que protege a tus cartas del daño",
      "Tapa imantada para mantener cerrada la caja",
      "Exterior impermeable de cuero ecológico",
    ],
    dimensions: ["11,18 (alto) × 8,38 (ancho) × 9,91 cm (profundidad)"],
    kind: "deck-box",
    price: 25000,
    wholesale: { from: 5, unit: "unidades", price: 21000, each: "cada una" },
    variantLabel: "Color",
    variants: [
      {
        name: "Negro/Rojo",
        primary: negro,
        secondary: rojo,
        images: [
          "productos/deck-box-negro-rojo-frente.jpg",
          "productos/deck-box-negro-rojo-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
      {
        name: "Negro/Azul",
        primary: negro,
        secondary: azul,
        images: [
          "productos/deck-box-negro-azul-frente.jpg",
          "productos/deck-box-negro-azul-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
      {
        name: "Negro/Gris",
        primary: negro,
        secondary: gris,
        images: [
          "productos/deck-box-negro-gris-frente.jpg",
          "productos/deck-box-negro-gris-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
      {
        name: "Negro/Violeta",
        primary: negro,
        secondary: violeta,
        images: [
          "productos/deck-box-negro-violeta-frente.jpg",
          "productos/deck-box-negro-violeta-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
      {
        name: "Negro/Verde",
        primary: negro,
        secondary: verde,
        images: [
          "productos/deck-box-negro-verde-frente.jpg",
          "productos/deck-box-negro-verde-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
      {
        name: "Azul/Verde",
        primary: marino,
        secondary: verde,
        images: [
          "productos/deck-box-azul-verde-frente.jpg",
          "productos/deck-box-azul-verde-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
      {
        name: "Azul/Amarillo",
        primary: marino,
        secondary: amarillo,
        images: [
          "productos/deck-box-azul-amarillo-frente.jpg",
          "productos/deck-box-azul-amarillo-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
      {
        name: "Negro/Crema",
        primary: negro,
        secondary: crema,
        images: [
          "productos/deck-box-negro-crema-frente.jpg",
          "productos/deck-box-negro-crema-abierta.jpg",
          "productos/deck-box-todas.jpg",
        ],
      },
    ],
  },
  {
    slug: "estuche-tcg-4-filas",
    name: "Storage Box - Caja Estuche para guardado de Cartas TCG 3000+ cartas",
    category: "TCG",
    summary: "Storage box de 4 filas para más de 3000 cartas.",
    description:
      "Te cebaste comprando precons que al final nunca usaste? Te pintó gestionarte un draft y ahora no sabés qué hacer con todo el bulk? Te pintó flashear scalper pokemon y ahora no sabés cómo esconderle todas las cartas que no vas a poder vender a tu señora? No te preocupes, Newport Hobbies tiene la solución para vos! No te podemos salvar de pelear con tu mujer pero sí de tener todas tus cartas desparramadas.",
    features: [
      "4 filas",
      "Espacio para 3000 cartas sin enfoliar, 1800 con folio simple o 1300 con doble folio. No admite cartas con toploaders.",
      "Cuerpo exterior negro con interior de color",
      "Revestimiento interno de microfibra que protege a tus cartas del daño",
      "Tapa imantada para mantener cerrada la caja",
      "Exterior impermeable de cuero ecológico",
    ],
    dimensions: [
      "31 cm (profundidad) x 28,8 cm (ancho) x 9,8 cm (alto)",
      "Cada canal tiene 7,2 cm de ancho",
    ],
    kind: "storage-box",
    price: 60000,
    wholesale: { from: 5, unit: "unidades", price: 50000, each: "cada una" },
    variantLabel: "Color",
    variants: [
      {
        name: "Negro/Gris",
        primary: negro,
        secondary: gris,
        images: [
          "productos/estuche-negro-gris-abierta.jpg",
          "productos/estuche-negro-gris-frente.jpg",
          "productos/estuche-todas.jpg",
        ],
      },
      {
        name: "Negro/Violeta",
        primary: negro,
        secondary: violeta,
        images: [
          "productos/estuche-negro-violeta-abierta.jpg",
          "productos/estuche-negro-violeta-frente.jpg",
          "productos/estuche-todas.jpg",
        ],
      },
      {
        name: "Negro/Rojo",
        primary: negro,
        secondary: rojo,
        images: ["productos/estuche-negro-rojo-abierta.jpg"],
      },
      {
        name: "Negro/Azul",
        primary: negro,
        secondary: azul,
        images: [
          "productos/estuche-negro-azul-abierta.jpg",
          "productos/estuche-negro-azul-frente.jpg",
          "productos/estuche-todas.jpg",
        ],
      },
    ],
  },
  {
    slug: "folios-tcg",
    name: "Pack de 100 folios para cartas TCG, frente negro y dorso color brillo",
    category: "TCG",
    summary: "Protectores duales con interior negro opaco, frente transparente y dorso texturizado de color.",
    description:
      "Los protectores duales de Newport Hobbies se distinguen por tener un interior elegante, opaco, de color negro. Con frente transparente y parte posterior texturizada de color, dan una sensación superior al mezclar. Son sin PVC y libres de ácidos.",
    features: [
      "Sin PVC · Libre de ácidos",
      "100 protectores tamaño standard",
      "Para cartas de hasta 63×88 mm",
      "Espesor de calidad",
      "Para Magic: The Gathering, Pokémon y otros juegos",
    ],
    kind: "sleeves",
    price: 9500,
    wholesale: { from: 20, unit: "unidades", price: 7000, each: "cada una" },
    variantLabel: "Color",
    variants: [
      {
        name: "Negro",
        primary: negro,
        images: ["productos/folios-negro-caras.jpg", "productos/folios-negro-pack.jpg"],
      },
      {
        name: "Azul",
        primary: azul,
        images: ["productos/folios-azul-caras.jpg", "productos/folios-azul-pack.jpg"],
      },
      {
        name: "Violeta",
        primary: violeta,
        images: ["productos/folios-violeta-caras.jpg", "productos/folios-violeta-pack.jpg"],
      },
      {
        name: "Verde",
        primary: verde,
        images: ["productos/folios-verde-caras.jpg", "productos/folios-verde-pack.jpg"],
      },
      {
        name: "Rojo",
        primary: rojo,
        images: ["productos/folios-rojo-caras.jpg", "productos/folios-rojo-pack.jpg"],
      },
      {
        name: "Naranja",
        primary: naranja,
        images: ["productos/folios-naranja-caras.jpg", "productos/folios-naranja-pack.jpg"],
      },
    ],
  },
  {
    slug: "maqueta-cafe",
    name: "Kit maqueta miniatura para armar café, modelismo y decoración",
    category: "Maquetas",
    summary: "Miniatura de café para armar.",
    description:
      "Kit de maqueta miniatura para armar, de un café. Pensada para modelismo y decoración.",
    features: ["Maqueta para armar", "Miniatura de café", "Modelismo", "Decoración"],
    kind: "book-topper",
    scene: "cafe",
    price: 45000,
    wholesale: { from: 5, unit: "unidades", price: 30000, each: "cada una" },
    images: ["productos/maqueta-cafe-1.jpg", "productos/maqueta-cafe-2.jpg"],
    variants: [],
  },
  {
    slug: "maqueta-librero",
    name: "Maqueta para armar miniatura librero biblioteca con luz",
    category: "Maquetas",
    summary: "Miniatura de librero con luz, para armar.",
    description: "Maqueta miniatura de un librero biblioteca, para armar. Incluye luz.",
    features: ["Maqueta para armar", "Miniatura de librero", "Biblioteca", "Con luz"],
    kind: "book-topper",
    scene: "library",
    price: 67500,
    images: ["productos/maqueta-librero-1.jpg", "productos/maqueta-librero-2.jpg"],
    variants: [],
  },
  {
    slug: "maqueta-taberna",
    name: "Maqueta miniatura esquina taberna para armar, decoración con luz",
    category: "Maquetas",
    summary: "Miniatura de una esquina de taberna, con luz.",
    description: "Maqueta miniatura de una esquina de taberna, para armar y usar como decoración. Incluye luz.",
    features: ["Maqueta para armar", "Esquina de taberna", "Decoración", "Con luz"],
    kind: "book-topper",
    scene: "tavern",
    price: 67500,
    images: ["productos/maqueta-taberna-1.jpg", "productos/maqueta-taberna-2.jpg"],
    variants: [],
  },
  {
    slug: "cable-hdmi-21",
    name: "Cable HDMI fibra óptica 2.1, 8K 60Hz, 4K 144Hz, 48Gbps",
    category: "Tecnología",
    summary: "HDMI 2.1 de fibra óptica activa, en 5, 10 y 15 metros.",
    description:
      "Un cable de **altísima calidad** que es capaz de mantener la mejor calidad incluso en **distancias más largas**. Al ser de **fibra óptica** evita el problema que tienen los cables convencionales donde a partir de los 2/5 mts de largo empiezan a perder calidad por cada nuevo metro que se extienden. A su vez, sus excelentes prestaciones le permiten garantizar una resolución de **8K a 60 Hz** o bien **4K o inferiores a 144 Hz**.\n\nEste cable se vende dentro de una vistosa caja, **¡ideal para regalar dentro del mundo de la tecnología!** Podés ver cómo se ve en la primera imagen.\n\nResoluciones posibles: **8K a 60 Hz**, y **4K o inferiores a 144 Hz**.\n\n¿Sirve para distancias más cortas? Obvio que sí, aunque estarías usando una ferrari para ir al supermercado, podés sacarle más jugo que eso aprovechándolo sin miedo para hacer conexiones más largas, quizás como una computadora y una televisión que están en ambientes separados, o una consola a una tele en la otra punta del cuarto. Podés hacer uso de todo el largo con la tranquilidad de que **no vas a notar la más mínima pérdida de calidad** de imagen y sonido.",
    features: [
      "Largo: 5, 10 o 15 metros",
      "Versión HDMI: 2.1",
      "Resolución máxima: 7680 × 4320 (8K)",
      "Frecuencia de actualización máxima: 144 Hz (según resolución)",
      "Ancho de banda: 48 Gbps",
      "Calidad de color: 10 bits (ideal para contenidos HDR)",
      "Fibra óptica activa",
    ],
    kind: "hdmi",
    price: 66500,
    variantLabel: "Largo",
    variants: [
      { name: "5 metros", primary: "#1c1c1e", secondary: "#b7a276", size: 1, price: 66500, images: hdmi21Photos },
      { name: "10 metros", primary: "#1c1c1e", secondary: "#b7a276", size: 2, price: 82500, images: hdmi21Photos },
      { name: "15 metros", primary: "#1c1c1e", secondary: "#b7a276", size: 3, price: 94000, images: hdmi21Photos },
    ],
  },
  {
    slug: "cable-hdmi-22",
    name: "Cable HDMI fibra óptica 2.2, 16K 60Hz, 8K 120Hz, 96Gbps, 10 metros",
    category: "Tecnología",
    summary: "HDMI 2.2 de fibra óptica, de 10 metros.",
    description:
      "Cable HDMI de fibra óptica, versión 2.2, de 10 metros. Llega a 16K 60Hz y 8K 120Hz, con 96Gbps.",
    features: ["Fibra óptica", "HDMI 2.2", "16K 60Hz y 8K 120Hz", "96Gbps", "10 metros"],
    kind: "hdmi",
    price: 105000,
    variants: [
      {
        name: "10 metros",
        primary: "#1c1c1e",
        secondary: "#b7a276",
        size: 2,
        price: 105000,
        images: ["productos/hdmi-22-caja.jpg", "productos/hdmi-22-cable.jpg"],
      },
    ],
  },
]

export function priceOf(product: Product, variant?: Variant) {
  return variant?.price ?? product.price
}

export function lengthMark(name: string) {
  const meters = name.match(/\d+/)
  return meters ? `${meters[0]}M` : name
}

export const categories = [...new Set(products.map((product) => product.category))]

export function getProduct(slug: string | undefined) {
  return products.find((product) => product.slug === slug)
}
