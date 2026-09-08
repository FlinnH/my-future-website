import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-28">
        <div className="relative">
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/flynn-headshot.png"
                alt="Flynn Huynh at work"
                width={480}
                height={480}
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            About Me
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            A web developer with a soft spot for great hospitality.
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a web developer with three years of experience turning
              messy, real-world problems into calm, functional software. My work
              lives at the intersection of technology and hospitality — I build
              tools that help hotels understand their guests and grow with
              confidence.
            </p>
            <p>
              Outside of code, I&apos;m an amateur cook who treats every dish like
              a small product: source good ingredients, respect the process, and
              obsess over the finishing touches. That same mindset shows up in the
              interfaces and data pipelines I design.
            </p>
            <p>
              Whether I&apos;m extracting feature requests from customer calls or
              shipping a boutique hotel&apos;s new website, I care about the whole
              experience — from the first click to the last checkout.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {[
              { k: '3+', v: 'Years building' },
              { k: '10+', v: 'Projects shipped' },
              { k: '∞', v: 'Cups of coffee' },
            ].map((item) => (
              <div key={item.v}>
                <dt className="font-serif text-3xl font-medium">{item.k}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
