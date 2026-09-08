import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Audio2Features',
    subtitle: 'AI Feature Request Extraction Tool',
    description:
      'Turns raw customer calls and voice notes into structured, prioritized feature requests using speech-to-text and an LLM extraction pipeline.',
    image: '/images/project-audio2features.png',
    tags: ['Python', 'AI', 'Whisper'],
    href: '#contact',
  },
  {
    title: 'Hotel Website',
    subtitle: 'Boutique Hotel Digital Presence',
    description:
      'A warm, fast, mobile-first website for a boutique hotel — direct bookings, room galleries, and a content system the front desk actually enjoys using.',
    image: '/images/project-hotel.png',
    tags: ['TypeScript', 'Next.js', 'CMS'],
    href: '#contact',
  },
  {
    title: 'Occupancy Insights',
    subtitle: 'Revenue & Occupancy Dashboard',
    description:
      'A clean analytics dashboard that helps small hotels read occupancy, revenue, and channel performance at a glance and act on it.',
    image: '/images/project-dashboard.png',
    tags: ['SQL', 'Cypher', 'Charts'],
    href: '#contact',
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            My Projects
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Tools built for real hospitality problems.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            A selection of things I&apos;ve designed, built, and shipped — each one
            aimed at helping a team work a little smarter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} preview`}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 font-serif text-xl font-medium">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {project.subtitle}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <a
                  href={project.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  View Project
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
