import { Link } from "react-router-dom"
import { Container } from "../components/Container"
import { ProductCard } from "../components/ProductCard"
import { Seo } from "../components/Seo"
import { WhatsAppButton } from "../components/WhatsAppButton"
import { products } from "../data/products"

export function HomePage() {
  return (
    <>
      <Seo path="/" />

      <section className="border-b border-line">
        <Container className="py-16 lg:py-24">
          <h1 className="font-serif text-[clamp(2.7rem,5.6vw,5.15rem)] font-normal leading-[0.98] text-ivory">
            Newport Hobbies
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Piezas importadas para el mazo, la maqueta y la pantalla. Elegí la tuya.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="btn btn-solid" to="/catalogo">
              Ver catálogo
            </Link>
            <WhatsAppButton message="Hola, quiero consultar el catálogo de Newport Hobbies." variant="line">
              WhatsApp
            </WhatsAppButton>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <h2 className="font-serif text-5xl font-normal text-ivory">Catálogo</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
