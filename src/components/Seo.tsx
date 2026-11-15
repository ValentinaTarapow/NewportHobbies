import { useEffect } from "react"
import { site } from "../data/site"

type SeoProps = {
  title?: string
  description?: string
  path?: string
  image?: string
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  const existing = document.head.querySelector(`meta[${attribute}="${key}"]`)
  const element = existing instanceof HTMLMetaElement ? existing : document.createElement("meta")
  if (!(existing instanceof HTMLMetaElement)) {
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

export function Seo({ title, description = site.description, path = "/", image }: SeoProps) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · Catálogo de productos importados`
  const url = `${site.url}${path === "/" ? "/" : path}`

  useEffect(() => {
    document.title = fullTitle
    setMeta("name", "description", description)
    setMeta("property", "og:title", fullTitle)
    setMeta("property", "og:description", description)
    setMeta("property", "og:url", url)
    setMeta("property", "og:type", "website")
    setMeta("property", "og:locale", site.locale)
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary")
    if (image) {
      setMeta("property", "og:image", image)
      setMeta("name", "twitter:image", image)
    }

    const existingCanonical = document.querySelector("link[rel='canonical']")
    const canonical = existingCanonical instanceof HTMLLinkElement ? existingCanonical : document.createElement("link")
    if (!(existingCanonical instanceof HTMLLinkElement)) {
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [description, fullTitle, image, url])

  return null
}
