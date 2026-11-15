import { Link } from "react-router-dom"
import { Container } from "../components/Container"
import { Seo } from "../components/Seo"
import { WhatsAppButton } from "../components/WhatsAppButton"

export function HowToBuyPage() {
  return (
    <Container className="py-16 lg:py-24">
      <Seo
        title="Cómo comprar"
        description="Por el momento, las compras de Newport Hobbies se coordinan directamente por WhatsApp."
        path="/como-comprar"
      />
      <div className="max-w-xl">
        <h1 className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-normal leading-[1.02] text-ivory">Cómo comprar</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
          <p>Por el momento, las compras se coordinan directamente por WhatsApp.</p>
          <p>
            Explorá nuestro catálogo, elegí la pieza que más te guste y seleccioná el color que prefieras. Desde la ficha
            del producto, podés consultar la disponibilidad por WhatsApp.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn btn-solid" to="/catalogo">
            Ver catálogo
          </Link>
          <WhatsAppButton message="Hola, quiero consultar la disponibilidad de una pieza de Newport Hobbies." variant="line">
            WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </Container>
  )
}
