import { Link } from "react-router-dom"
import { formatPhone, site, whatsappLink } from "../data/site"

const links = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/como-comprar", label: "Cómo comprar" },
  { to: "/contacto", label: "Contacto" },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <nav className="flex flex-col gap-3" aria-label="Pie">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="text-[0.72rem] uppercase tracking-[0.22em] text-muted hover:text-ivory">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <a
            className="text-[0.72rem] uppercase tracking-[0.22em] text-gold hover:text-ivory"
            href={whatsappLink("Hola, quiero hacer una consulta a Newport Hobbies.")}
            target="_blank"
            rel="noreferrer noopener"
          >
            {formatPhone(site.whatsappNumber)}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-[0.68rem] uppercase tracking-[0.18em] text-muted sm:px-8">
          <span>Newport Hobbies</span>
          <span>Argentina</span>
        </div>
      </div>
    </footer>
  )
}
