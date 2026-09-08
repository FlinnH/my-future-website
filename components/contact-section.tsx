'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Send, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/social-icons'

const SOCIALS = [
  { label: 'Email', href: 'mailto:hello@flynnhuynh.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
]

export function ContactSection() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
    e.currentTarget.reset()
    window.setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <div>
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Feedback
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Have an idea or some feedback? Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Whether it&apos;s a hospitality tool you wish existed or a note about
            something I&apos;ve built, I read every message.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="mailto:hello@flynnhuynh.com"
              className="inline-flex items-center gap-3 text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              <Mail className="size-5 text-primary" />
              hello@flynnhuynh.com
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="What's on your mind?"
                className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {sent ? (
                <>
                  <Check className="size-4" />
                  Message sent
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
