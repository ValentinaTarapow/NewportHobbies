import { Container } from "../components/Container"
import { PageIntro } from "../components/PageIntro"
import { Seo } from "../components/Seo"
import { WhatsAppButton } from "../components/WhatsAppButton"
import { formatPhone, site, whatsappLink } from "../data/site"

export function ContactPage() {
  const message = "Hola, quiero hacer una consulta a Newport Hobbies."

  return (
    <Container className="py-16 lg:py-24">
      <Seo
        title="Contacto"
        description="Consultas de disponibilidad de Newport Hobbies por WhatsApp."
        path="/contacto"
      />
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <PageIntro eyebrow="Contacto" title="Escribinos para confirmar disponibilidad.">
            <p>
              La atención de esta primera etapa es directa. Contanos qué pieza estás mirando y te respondemos si está
              disponible.
            </p>
          </PageIntro>
          <WhatsAppButton message={message} className="mt-10">
            Abrir WhatsApp
          </WhatsAppButton>
        </div>

        <dl className="border-t border-line lg:col-span-5 lg:col-start-8">
          <div className="border-b border-line py-6">
            <dt className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">WhatsApp</dt>
            <dd className="mt-3">
              <a className="text-2xl tracking-wide text-ivory hover:text-gold" href={whatsappLink(message)} target="_blank" rel="noreferrer noopener">
                {formatPhone(site.whatsappNumber)}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  )
}
