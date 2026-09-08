import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:pt-24 md:pb-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Hospitality × Technology
          </p>

          <h1 className="font-serif text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
            Hi, I&apos;m Flynn Huynh,
            <span className="block text-muted-foreground">or Nhat Huynh</span>
          </h1>

          <p className="mt-6 text-lg font-medium text-foreground">
            Amateur Cook &amp; Hospitality Enthusiast
          </p>

          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            I create and advise on functional tools that help hotels grow —
            blending a love for hospitality with a builder&apos;s eye for detail.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              View My Work
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/60" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl shadow-foreground/5">
            <Image
              src="/images/flynn-headshot.png"
              alt="Portrait of Flynn Huynh"
              width={640}
              height={720}
              priority
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg shadow-foreground/5">
            <p className="font-serif text-2xl font-medium">3+ yrs</p>
            <p className="text-xs text-muted-foreground">building for hotels</p>
          </div>
        </div>
      </div>
    </section>
  )
}
