import type { ReactNode } from "react"

type PageIntroProps = {
  eyebrow: string
  title: string
  children?: ReactNode
}

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <header className="max-w-2xl">
      <p className="text-[0.72rem] uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-normal leading-[1.02] text-ivory">
        {title}
      </h1>
      {children ? <div className="mt-6 max-w-xl text-base leading-relaxed text-muted">{children}</div> : null}
    </header>
  )
}
