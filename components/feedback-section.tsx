'use client'

import { useEffect, useState, type FormEvent } from 'react'
import useSWR from 'swr'
import { Star, Send, Check, Loader2, MessageSquareQuote } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type Feedback = {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

const supabase = createClient()

async function fetchFeedback(): Promise<Feedback[]> {
  const { data, error } = await supabase
    .from('feedback')
    .select('id, name, message, rating, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as Feedback[]) ?? []
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Stars({
  value,
  onChange,
  size = 'sm',
}: {
  value: number
  onChange?: (v: number) => void
  size?: 'sm' | 'lg'
}) {
  const [hover, setHover] = useState(0)
  const interactive = typeof onChange === 'function'
  const dim = size === 'lg' ? 'size-7' : 'size-4'

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n
        const star = (
          <Star
            className={cn(
              dim,
              'transition-colors',
              active ? 'fill-primary text-primary' : 'text-muted-foreground/40',
            )}
          />
        )

        if (!interactive) {
          return <span key={n}>{star}</span>
        }

        return (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-pressed={value === n}
            onClick={() => onChange?.(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="rounded-sm p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {star}
          </button>
        )
      })}
    </div>
  )
}

export function FeedbackSection() {
  const { data: feedback = [], isLoading, mutate } = useSWR('feedback', fetchFeedback)

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Live updates: refresh the list whenever a row is inserted.
  useEffect(() => {
    const channel = supabase
      .channel('feedback-inserts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'feedback' },
        () => {
          mutate()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [mutate])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !message.trim() || rating < 1) {
      setError('Please add your name, a message, and a rating.')
      return
    }

    setSubmitting(true)

    const { data, error: insertError } = await supabase
      .from('feedback')
      .insert({ name: name.trim(), message: message.trim(), rating })
      .select('id, name, message, rating, created_at')
      .single()

    setSubmitting(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    // Show the new feedback immediately.
    mutate((current = []) => {
      const next = current.filter((f) => f.id !== (data as Feedback).id)
      return [data as Feedback, ...next]
    }, false)

    setName('')
    setMessage('')
    setRating(0)
    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="feedback" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Feedback
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Tell me what you think
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            Have an idea for a hospitality tool, a note on something I&apos;ve
            built, or just a hello? Leave a rating and a message below — it shows
            up here right away.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="fb-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="fb-name"
                  name="name"
                  type="text"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="fb-message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Feedback
                </label>
                <textarea
                  id="fb-message"
                  name="message"
                  required
                  rows={4}
                  maxLength={2000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  Rating
                </span>
                <Stars value={rating} onChange={setRating} size="lg" />
              </div>

              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting
                  </>
                ) : sent ? (
                  <>
                    <Check className="size-4" />
                    Thank you!
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl font-medium">
                What people are saying
              </h3>
              {feedback.length > 0 ? (
                <span className="text-sm text-muted-foreground">
                  {feedback.length}{' '}
                  {feedback.length === 1 ? 'note' : 'notes'}
                </span>
              ) : null}
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Loading feedback…
              </div>
            ) : feedback.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
                <MessageSquareQuote className="size-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  No feedback yet — be the first to leave a note.
                </p>
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {feedback.map((f) => (
                  <li
                    key={f.id}
                    className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-sans text-sm font-semibold text-primary">
                          {f.name.trim().charAt(0).toUpperCase()}
                        </span>
                        <span className="font-medium text-foreground">
                          {f.name}
                        </span>
                      </div>
                      <Stars value={f.rating} />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {f.message}
                    </p>
                    <time
                      dateTime={f.created_at}
                      className="mt-4 text-xs text-muted-foreground/70"
                    >
                      {formatDate(f.created_at)}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
