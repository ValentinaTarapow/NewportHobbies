import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Link, NavLink, useLocation } from "react-router-dom"
import { whatsappLink } from "../data/site"

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/catalogo", label: "Catálogo", end: false },
  { to: "/como-comprar", label: "Cómo comprar", end: false },
  { to: "/contacto", label: "Contacto", end: false },
]

function linkClass(isActive: boolean) {
  return `text-[0.72rem] uppercase tracking-[0.22em] transition-colors ${
    isActive ? "text-gold" : "text-muted hover:text-ivory"
  }`
}

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-carbon/90 backdrop-blur-md">
      <div className="h-px bg-gold" />
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-[1.7rem] leading-none tracking-wide text-ivory">Newport</span>
          <span className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">Hobbies</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => linkClass(isActive)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          className="hidden text-[0.72rem] uppercase tracking-[0.22em] text-gold transition-colors hover:text-ivory lg:inline"
          href={whatsappLink("Hola, quiero consultar el catálogo de Newport Hobbies.")}
          target="_blank"
          rel="noreferrer noopener"
        >
          WhatsApp
        </a>

        <button
          type="button"
          className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen(true)}
        >
          Menú
        </button>
      </div>

      {open
        ? createPortal(
            <div id="menu-movil" className="fixed inset-0 z-50 bg-carbon px-6 pt-6 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
              <div className="flex items-center justify-between">
                <p className="font-serif text-2xl text-ivory">Newport</p>
                <button type="button" className="text-[0.72rem] uppercase tracking-[0.22em] text-gold" onClick={() => setOpen(false)}>
                  Cerrar
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-4" aria-label="Móvil">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) => `font-serif text-[1.65rem] leading-none ${isActive ? "text-gold" : "text-ivory"}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <a
                  className="mt-6 text-[0.72rem] uppercase tracking-[0.22em] text-gold"
                  href={whatsappLink("Hola, quiero consultar el catálogo de Newport Hobbies.")}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  WhatsApp
                </a>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
