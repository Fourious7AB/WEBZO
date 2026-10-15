import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
} from 'lucide-react'
import Calendar from '@/components/ui/Calendar'
import Button from '@/components/ui/Button'
import { businessTypes } from '@/lib/site'
import {
  buildTimeSlots,
  buildWhatsAppUrl,
  formatDateLong,
  isSlotAvailable,
  validateEmail,
  validatePhone,
} from '@/lib/booking'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/utils'

const SLOTS = buildTimeSlots()

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  businessType: '',
  message: '',
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-muted/60 transition-colors duration-300 focus:border-glow/60 focus:bg-white/[0.05] focus:outline-none'

function Field({ label, error, hint, children, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-white/85">
          {label}
          {required && <span className="text-glow-soft"> *</span>}
        </span>
        {hint && <span className="text-2xs text-muted">{hint}</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-rose-400">
          {error}
        </span>
      )}
    </label>
  )
}

export default function BookingModal({ open, onClose, seed }) {
  const [step, setStep] = useState(0) // 0 = when, 1 = details, 2 = sent
  const [date, setDate] = useState(null)
  const [time, setTime] = useState('')
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sentUrl, setSentUrl] = useState('')

  const dialogRef = useRef(null)
  const lastFocused = useRef(null)

  useLockBodyScroll(open)

  const availableSlots = useMemo(
    () => SLOTS.map((s) => ({ slot: s, ok: isSlotAvailable(s, date) })),
    [date]
  )

  const reset = useCallback(() => {
    setStep(0)
    setDate(null)
    setTime('')
    setForm(EMPTY)
    setErrors({})
    setSentUrl('')
  }, [])

  // Remember what had focus, restore it on close. Any details already typed
  // into the contact form arrive as `seed` so nobody types them twice.
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement
      if (seed) setForm((f) => ({ ...f, ...seed }))
      requestAnimationFrame(() => dialogRef.current?.focus())
    } else {
      const t = setTimeout(reset, 350)
      lastFocused.current?.focus?.()
      return () => clearTimeout(t)
    }
    // `seed` is intentionally read only at open time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset])

  // Escape to close, Tab kept inside the dialog.
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return

      const list = Array.from(focusables).filter((el) => el.offsetParent !== null)
      const first = list[0]
      const last = list[list.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please tell us your name.'
    if (!validatePhone(form.phone))
      next.phone = 'Enter a 10-digit Indian mobile number.'
    if (!validateEmail(form.email)) next.email = 'That email address looks off.'
    if (!form.businessType) next.businessType = 'Pick the closest match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const url = buildWhatsAppUrl({ ...form, date, time })
    setSentUrl(url)
    setStep(2)
    // Opened after state so the success screen is already behind the tab switch.
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const canContinue = Boolean(date && time)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-base/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-surface shadow-2xl outline-none sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
              <div>
                <h2
                  id="booking-title"
                  className="font-display text-lg font-semibold tracking-tight"
                >
                  {step === 2 ? 'Booking ready to send' : 'Book your free demo'}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {step === 0 && 'Pick a day and a time that suits you.'}
                  {step === 1 && 'Last part — how should we reach you?'}
                  {step === 2 && 'One tap in WhatsApp and it is with us.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking"
                className="-mr-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step rail */}
            {step < 2 && (
              <div className="flex gap-1.5 px-6 pt-4" aria-hidden="true">
                {[0, 1].map((s) => (
                  <span
                    key={s}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors duration-500',
                      s <= step
                        ? 'bg-gradient-to-r from-glow to-violet-glow'
                        : 'bg-white/10'
                    )}
                  />
                ))}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Step 1 — when */}
              {step === 0 && (
                <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_190px]">
                  <Calendar value={date} onChange={setDate} />

                  <div className="min-w-0">
                    <p className="mb-3 flex items-center gap-2 text-xs font-medium text-white/85">
                      <Clock className="h-3.5 w-3.5 text-glow-soft" aria-hidden="true" />
                      Available times
                    </p>

                    {!date ? (
                      <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-xs text-muted">
                        Choose a date first
                      </p>
                    ) : (
                      <div
                        className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-1"
                        role="group"
                        aria-label="Available times"
                      >
                        {availableSlots.map(({ slot, ok }) => (
                          <button
                            key={slot}
                            type="button"
                            disabled={!ok}
                            onClick={() => setTime(slot)}
                            aria-pressed={time === slot}
                            className={cn(
                              'rounded-lg border px-3 py-2 text-sm tnum transition-all duration-200',
                              'disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/15',
                              time === slot
                                ? 'border-transparent bg-gradient-to-r from-glow to-violet-glow font-medium text-white'
                                : 'border-white/10 text-white/80 hover:border-glow/50 hover:bg-white/[0.05]'
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2 — details */}
              {step === 1 && (
                <form id="booking-form" onSubmit={submit} className="grid gap-4" noValidate>
                  <div className="glass flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl px-4 py-3 text-sm">
                    <span className="flex items-center gap-2 text-white">
                      <CalendarDays className="h-4 w-4 text-glow-soft" aria-hidden="true" />
                      {formatDateLong(date)}
                    </span>
                    <span className="flex items-center gap-2 text-white">
                      <Clock className="h-4 w-4 text-glow-soft" aria-hidden="true" />
                      {time}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="ml-auto text-xs text-muted underline underline-offset-4 transition-colors hover:text-white"
                    >
                      Change
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name" required error={errors.name}>
                      <input
                        className={inputClass}
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Ritika Sharma"
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Phone / WhatsApp" required error={errors.phone}>
                      <input
                        className={inputClass}
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="98765 43210"
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </Field>
                  </div>

                  <Field label="Email" hint="optional" error={errors.email}>
                    <input
                      className={inputClass}
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@yourbusiness.com"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Business type" required error={errors.businessType}>
                    <select
                      className={cn(inputClass, 'appearance-none bg-surface')}
                      value={form.businessType}
                      onChange={set('businessType')}
                    >
                      <option value="">Select one</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Anything we should know?" hint="optional">
                    <textarea
                      rows={3}
                      className={cn(inputClass, 'resize-none')}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="I run a saree shop and want to start taking online orders."
                    />
                  </Field>
                </form>
              )}

              {/* Step 3 — sent */}
              {step === 2 && (
                <div className="py-6 text-center">
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-whatsapp/15 ring-1 ring-whatsapp/40"
                  >
                    <CheckCircle2 className="h-8 w-8 text-whatsapp" aria-hidden="true" />
                  </motion.span>

                  <p className="mt-6 text-base text-white">
                    WhatsApp should have opened with your booking filled in.
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                    Press send there and we will confirm your{' '}
                    <span className="text-white">{formatDateLong(date)}</span> slot at{' '}
                    <span className="text-white">{time}</span> within a few hours.
                  </p>

                  <div className="mt-7 flex flex-col items-center gap-3">
                    <Button variant="whatsapp" size="lg" href={sentUrl}>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Open WhatsApp again
                    </Button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-white"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            {step < 2 && (
              <div className="flex items-center justify-between gap-3 border-t border-white/8 bg-base/40 px-6 py-4">
                {step === 0 ? (
                  <p className="text-xs text-muted">
                    Free, 20 minutes, no obligation.
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}

                {step === 0 ? (
                  <Button onClick={() => setStep(1)} disabled={!canContinue}>
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button type="submit" form="booking-form">
                    Send on WhatsApp
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
