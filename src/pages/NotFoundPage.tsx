import { Link } from "react-router-dom"
import { Container } from "../components/Container"
import { Seo } from "../components/Seo"

export function NotFoundPage() {
  return (
    <Container className="py-20">
      <Seo title="Página no encontrada" path="/404" />
      <p className="text-[0.72rem] uppercase tracking-[0.32em] text-gold">404</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl font-normal leading-none text-ivory">Esa página no está en el catálogo.</h1>
      <Link to="/" className="btn btn-solid mt-8">
        Volver al inicio
      </Link>
    </Container>
  )
}
