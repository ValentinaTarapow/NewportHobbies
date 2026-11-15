import { Link } from "react-router-dom"
import { Container } from "../components/Container"
import { PageIntro } from "../components/PageIntro"
import { ProductMark } from "../components/ProductMark"
import { Seo } from "../components/Seo"
import { WhatsAppButton } from "../components/WhatsAppButton"

const traits = ["Elegante", "Moderna", "Minimalista", "Exclusiva", "Confiable"]

export function AboutPage() {
  return (
    <Container className="py-16 lg:py-24">
      <Seo
        title="Nosotros"
        description="Newport Hobbies es una importadora. Una selección corta de productos, presentada con fotografías y consulta directa por WhatsApp."
        path="/nosotros"
      />
      <div className="grid items-start gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <PageIntro eyebrow="La importadora" title="Una selección corta, presentada con claridad.">
            <p>
              Newport Hobbies importa piezas para quienes buscan objetos con presencia y buen oficio. El catálogo se
              mantiene acotado: menos productos, mejor mostrados.
            </p>
            <p className="mt-4">
              Cada ficha reúne las variantes y la información necesaria para consultar stock antes de decidir. No hay
              carrito ni pago en línea. La conversación empieza en la pieza que te interesa, por WhatsApp.
            </p>
          </PageIntro>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {traits.map((trait) => (
              <li key={trait} className="font-serif text-2xl text-gold italic">
                {trait}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="btn btn-solid" to="/catalogo">
              Ver catálogo
            </Link>
            <WhatsAppButton message="Hola, quiero conocer la selección de Newport Hobbies." variant="line">
              WhatsApp
            </WhatsAppButton>
          </div>
        </div>
        <figure className="lg:col-span-6">
          <div className="bg-ivory p-2 sm:p-3" role="img" aria-label="Maqueta miniatura de librero con luz">
            <ProductMark kind="book-topper" scene="library" className="aspect-[4/5] w-full" />
          </div>
          <figcaption className="mt-4 text-[0.68rem] uppercase tracking-[0.22em] text-muted">Librero con luz</figcaption>
        </figure>
      </div>
    </Container>
  )
}
