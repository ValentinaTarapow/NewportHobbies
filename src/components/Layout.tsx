import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="absolute top-4 left-4 z-[60] -translate-y-24 bg-ivory px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-carbon focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" className="page flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
