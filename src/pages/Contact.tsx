import { useState, type FormEvent } from 'react'
import './pages.css'

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() ?? ''

/** user@domain.tld with tld ∈ { com, edu, net, gov, org } (case-insensitive) */
const CONTACT_EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9][a-zA-Z0-9.-]*\.(?:com|edu|gov|net|org)$/i

export function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    setSubmitted(false)
    setFormError(null)

    if (!name || !email || !message) {
      setFormError('Please fill in name, email, and message.')
      return
    }

    if (!CONTACT_EMAIL_REGEX.test(email)) {
      setFormError(
        'Use a valid email like name@domain.com, .edu, .net, .gov, or .org.',
      )
      return
    }

    if (!FORMSPREE_FORM_ID) {
      setFormError(
        'Sending isn’t configured yet. Add VITE_FORMSPREE_FORM_ID to .env.local (Formspree form id only—your inbox is set on Formspree, not in this site).',
      )
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })
      const data: { error?: string } = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || `Could not send (${res.status}).`)
      }
      form.reset()
      setSubmitted(true)
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong. Try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page contact">
      <header className="page-header">
        <h1>Contact</h1>
        <p className="page-intro">
          Send a message or connect with me below.
        </p>
      </header>

      <div className="contact-layout">
        <section className="contact-card card">
          <h2>Message</h2>
          {!FORMSPREE_FORM_ID ? (
            <p className="form-hint form-hint--config" role="note">
              Add your Formspree form id to <code>.env.local</code> as{' '}
              <code>VITE_FORMSPREE_FORM_ID</code>. Register your real email only on
              Formspree—it never appears on this page or as a mailto link.
            </p>
          ) : null}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span className="field-label">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label className="field">
              <span className="field-label">Your email</span>
              <input
                type="email"
                name="email"
                placeholder="So I can reply"
                autoComplete="email"
                required
              />
            </label>
            <label className="field">
              <span className="field-label">Message</span>
              <textarea
                name="message"
                rows={6}
                placeholder="Write a short message…"
                required
              />
            </label>
            {formError ? (
              <p className="form-error" role="alert">
                {formError}
              </p>
            ) : null}
            <button
              type="submit"
              className="btn btn--primary"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? 'Sending…' : 'Send message'}
            </button>
            {submitted ? (
              <p className="form-hint form-hint--success" role="status">
                Thanks — your message was sent.
              </p>
            ) : null}
          </form>
        </section>

        <section className="contact-card card">
          <h2>Elsewhere</h2>
          <p className="contact-links-inline">
            <a
              href="https://www.linkedin.com/in/yuyang-zhang"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <span className="contact-links-separator" aria-hidden>
              •
            </span>
            <a
              href="https://yuyangthephotographer.com/"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Yuyang the Photographer — photography portfolio"
            >
              Photography
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
