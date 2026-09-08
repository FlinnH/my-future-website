import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/social-icons'

const SOCIALS = [
  { label: 'Email', href: 'mailto:hello@flynnhuynh.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flynn Huynh. Built with care.
        </p>
        <div className="flex gap-2">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
