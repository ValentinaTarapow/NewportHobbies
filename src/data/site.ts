export const site = {
  name: "Newport Hobbies",
  description:
    "Catálogo digital de Newport Hobbies. Productos importados, fotografías, variantes de color y consultas de disponibilidad por WhatsApp.",
  url: "https://valentintarapow.github.io/NewportHobbies",
  locale: "es_AR",
  // Número internacional, sin + ni espacios.
  whatsappNumber: "5491156035644",
} as const

export function whatsappLink(message: string) {
  const phone = site.whatsappNumber.replace(/\D/g, "")
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "")
  const match = digits.match(/^54(9)(\d{2})(\d{4})(\d{4})$/)
  if (!match) return `+${digits}`
  return `+54 ${match[1]} ${match[2]} ${match[3]}-${match[4]}`
}
