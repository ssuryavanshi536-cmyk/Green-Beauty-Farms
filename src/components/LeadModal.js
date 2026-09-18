'use client'
import { useState, useEffect } from 'react'

const WEB3FORMS_ACCESS_KEY = '8f24ac60-8971-4ce1-bca8-b80ebdc035a3'
const interestOptions = ['Plot Only', 'Ready Farmhouse', 'Not Sure Yet']

const PHONE_DISPLAY = '+91 83682 07535'

const inputClass = (hasError) =>
  `w-full rounded-lg border px-4 py-3 text-sm text-ink-900 outline-none transition-colors bg-white placeholder:text-ink-400 ${
    hasError ? 'border-danger' : 'border-white/20 focus:border-ochre-500'
  }`

const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/90'

export default function LeadModal({ isOpen, onClose, triggerText = '', inline = false }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (isOpen && !inline) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen, inline])

  useEffect(() => {
    if (!isOpen && !inline) {
      const t = setTimeout(() => { setSubmitted(false); setErrors({}); setServerError('') }, 300)
      return () => clearTimeout(t)
    }
  }, [isOpen, inline])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Enter your name'
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit number'
    if (!form.interest) e.interest = 'Pick one option'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    setSubmitting(true)
    setServerError('')

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Enquiry – Green Beauty Farms | ${triggerText || 'Website'}`,
        from_name: 'Green Beauty Farms Website',
        name: form.name,
        mobile: form.mobile,
        email: form.email || 'Not provided',
        interested_in: form.interest,
        message: form.message || 'No message provided',
        source: triggerText || 'Lead Modal',
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        if (typeof window !== 'undefined' && window.gtag) {
          // TODO: replace with the real Google Ads conversion label
          window.gtag('event', 'conversion', {
            send_to: 'AW-XXXXXXXXXX/CONVERSION_LABEL',
            value: 1.0,
            currency: 'INR',
          })
        }
      } else {
        setServerError(data.message || 'That did not go through. Try again, or call us directly.')
      }
    } catch {
      setServerError('Network error. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen && !inline) return null

  const body = (
    <div
      className={`relative w-full ${inline ? 'max-w-full' : 'max-w-md modal-card'} rounded-2xl bg-moss-800 p-7 shadow-deep sm:p-8`}
    >
      {!inline && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg font-bold text-white"
        >
          ×
        </button>
      )}

      {submitted ? (
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a2cd15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h3 className="mb-2 font-display text-2xl font-semibold text-white">Thank you, {form.name.split(' ')[0]}!</h3>
          <p className="mb-5 text-sm leading-relaxed text-white/75">
            Our farm advisor will call you shortly to walk you through available plots and arrange a site visit. In a hurry? Call {PHONE_DISPLAY}.
          </p>
          {!inline && (
            <button onClick={onClose} className="text-sm text-white/60 underline">Close</button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <h2 className="mb-1 text-center font-display text-2xl font-semibold text-white">Enquire now</h2>
          <p className="mb-6 text-center text-xs text-ochre-500">
            Farmhouse plots in Noida starting from ₹8,500 / Sq. Yd.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })) }}
                className={inputClass(errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
            </div>

            <div>
              <label className={labelClass}>Mobile No. *</label>
              <input
                type="tel"
                placeholder="10-digit mobile"
                value={form.mobile}
                onChange={(e) => { setForm((f) => ({ ...f, mobile: e.target.value })); setErrors((er) => ({ ...er, mobile: '' })) }}
                className={inputClass(errors.mobile)}
              />
              {errors.mobile && <p className="mt-1 text-xs text-danger">{errors.mobile}</p>}
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass(false)}
              />
            </div>

            <div>
              <label className={labelClass}>Looking for</label>
              <select
                value={form.interest}
                onChange={(e) => { setForm((f) => ({ ...f, interest: e.target.value })); setErrors((er) => ({ ...er, interest: '' })) }}
                className={`${inputClass(errors.interest)} cursor-pointer appearance-none ${form.interest ? 'text-ink-900' : 'text-ink-400'}`}
              >
                <option value="" disabled>Select an option</option>
                {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.interest && <p className="mt-1 text-xs text-danger">{errors.interest}</p>}
            </div>

            {serverError && (
              <div className="rounded-lg border border-danger/40 bg-danger/15 px-3.5 py-2.5 text-xs text-white">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-ochre-500 py-3.5 font-semibold text-night-900 transition-colors hover:bg-ochre-600 disabled:cursor-not-allowed disabled:bg-ink-400 disabled:text-white"
            >
              {submitting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Submitting…
                </>
              ) : 'Submit enquiry'}
            </button>

            <p className="text-center text-[11px] text-white/50">Your details stay private and are only used to reach you.</p>
          </div>
        </form>
      )}
    </div>
  )

  if (inline) return body

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-night-900/85 p-5 backdrop-blur-sm"
    >
      {body}
    </div>
  )
}