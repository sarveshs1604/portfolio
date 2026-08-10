import { useState } from 'react'
import { Send } from 'lucide-react'
import { profile } from '../../data/profile'
import SectionWrapper from '../layout/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

/**
 * Polished contact UI with placeholder submit handler.
 * Ready to wire to Formspree, EmailJS, or a serverless function later.
 */
export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const params = new URLSearchParams({
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: `Portfolio inquiry from ${form.name}`,
        _replyto: form.email,
        _captcha: 'false',
      })

      const response = await fetch('https://formsubmit.co/ajax/sarveshs160405@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })

      if (!response.ok) {
        throw new Error('Message could not be sent')
      }

      setForm({ name: '', email: '', message: '' })
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('The message could not be sent right now. Please email me directly at sarveshs160405@gmail.com.')
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-[border,box-shadow] focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/30'

  return (
    <SectionWrapper id="contact" ariaLabelledBy="contact-title">
      <SectionTitle
        id="contact-title"
        eyebrow="Contact"
        title="Let’s connect"
        description="Open to collaborations, internships, and interesting full-stack or AI projects."
      />

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-slate-400 leading-relaxed">
            Prefer email or LinkedIn for the fastest response. Based in Chennai and open to hybrid or remote opportunities.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-blue-300 hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 rounded"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 rounded"
                >
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="mt-1 text-slate-200">{profile.location}</dd>
            </div>
          </dl>
        </div>

        <form
          className="glass-card rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-400">
              Name
              <input
                className={`${fieldClass} mt-2`}
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
              />
            </label>
            <label className="block text-sm text-slate-400">
              Email
              <input
                className={`${fieldClass} mt-2`}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm text-slate-400">
            Message
            <textarea
              className={`${fieldClass} mt-2 min-h-[140px] resize-y`}
              name="message"
              required
              value={form.message}
              onChange={onChange}
              placeholder="What would you like to talk about?"
            />
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button type="submit" variant="primary">
              Send message
              <Send size={14} aria-hidden />
            </Button>
            {status === 'success' ? (
              <p className="text-sm text-emerald-400" role="status">
                Message sent successfully. Thanks for reaching out.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="text-sm text-rose-400" role="status">
                {errorMessage}
              </p>
            ) : null}
            {status === 'sending' ? (
              <p className="text-sm text-slate-400" role="status">
                Sending message...
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </SectionWrapper>
  )
}
