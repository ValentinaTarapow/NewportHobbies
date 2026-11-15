import type { ReactNode } from "react"
import { whatsappLink } from "../data/site"

type WhatsAppButtonProps = {
  message: string
  children: ReactNode
  variant?: "solid" | "line"
  className?: string
}

export function WhatsAppButton({ message, children, variant = "solid", className = "" }: WhatsAppButtonProps) {
  return (
    <a
      className={`btn ${variant === "solid" ? "btn-solid" : "btn-line"} ${className}`}
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  )
}
