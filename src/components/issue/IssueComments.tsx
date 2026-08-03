import { useState, type FormEvent } from 'react'
import portrait from '../../assets/portrait.png'

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() ?? ''

/** user@domain.tld with tld ∈ { com, edu, net, gov, org } (case-insensitive) */
const CONTACT_EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9][a-zA-Z0-9.-]*\.(?:com|edu|gov|net|org)$/i

export function IssueComments() {
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
        'Sending isn’t configured yet. Add VITE_FORMSPREE_FORM_ID to .env.local.',
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
    <section id="comments" className="issue-panel" aria-labelledby="comments-heading">
      <h2 id="comments-heading">Comments</h2>

      <div className="comment-composer">
        <img
          src={portrait}
          alt=""
          className="issue-avatar issue-avatar--sm"
          width={32}
          height={32}
        />
        <form className="comment-form" onSubmit={handleSubmit} noValidate>
          <p className="comment-composer-label">Reach out</p>
          {!FORMSPREE_FORM_ID ? (
            <p className="form-hint" role="note">
              Add <code>VITE_FORMSPREE_FORM_ID</code> to <code>.env.local</code> to
              enable sending.
            </p>
          ) : null}
          <div className="comment-fields">
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
                placeholder="Your email"
                autoComplete="email"
                required
              />
            </label>
          </div>
          <label className="field">
            <span className="field-label">Comment</span>
            <textarea
              name="message"
              rows={4}
              placeholder="Write a comment…"
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
            {submitting ? 'Sending…' : 'Save'}
          </button>
          {submitted ? (
            <p className="form-hint form-hint--success" role="status">
              Thanks — your comment was sent.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
