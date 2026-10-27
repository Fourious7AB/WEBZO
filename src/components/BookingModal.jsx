import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
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
  customBusinessType: '',
  message: '',
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-muted/60 transition-colors duration-300 focus:border-glow/60 focus:bg-white/[0.05] focus:outline-none'

function Field({ label, error, hint, children, required, as = 'label' }) {
  const Component = as
  return (
    <Component className="block">
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
    </Component>
  )
}

function BusinessTypeDropdown({ value, onChange, error, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between rounded-xl border bg-white/[0.03] px-4 py-3 text-left text-sm transition-all duration-200 outline-none cursor-pointer',
          error
            ? 'border-rose-400/80 ring-1 ring-rose-400/30'
            : 'border-white/10 hover:border-white/20',
          isOpen
            ? 'border-glow/60 bg-white/[0.06] shadow-[0_0_15px_rgba(0,240,255,0.15)]'
            : '',
          value ? 'text-white font-medium' : 'text-muted/60'
        )}
      >
        <span className="truncate pr-2">
          {value || 'Select your business type...'}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted transition-transform duration-200',
            isOpen && 'rotate-180 text-glow-soft'
          )}
          aria-hidden="true"
        />
      </button>

      {/* Styled Dropdown Menu Matching Theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-white/15 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-2xl overscroll-contain focus:outline-none scrollbar-thin"
          >
            {options.map((option) => {
              const isSelected = value === option
              return (
                <li
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-xs sm:text-sm transition-colors select-none',
                    isSelected
                      ? 'bg-gradient-to-r from-glow/20 to-violet-glow/20 text-white font-medium border border-cyan-400/30'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <span className="truncate pr-2">{option}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
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

  const handleBusinessTypeChange = (val) => {
    setForm((f) => ({ ...f, businessType: val }))
    setErrors((prev) => ({
      ...prev,
      businessType: undefined,
      customBusinessType: undefined,
    }))
  }

  const isOther =
    form.businessType === 'Other' || form.businessType.startsWith('Other')

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please tell us your name.'
    if (!validatePhone(form.phone))
      next.phone = 'Enter a 10-digit Indian mobile number.'
    if (!validateEmail(form.email)) next.email = 'That email address looks off.'
    if (!form.businessType) {
      next.businessType = 'Please select your business type.'
    } else if (isOther && !form.customBusinessType.trim()) {
      next.customBusinessType = 'Please write your specific business type.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const resolvedBusiness =
      isOther && form.customBusinessType.trim()
        ? form.customBusinessType.trim()
        : form.businessType

    const url = buildWhatsAppUrl({
      ...form,
      businessType: resolvedBusiness,
      date,
      time,
    })
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
            className="relative flex h-[88dvh] max-h-[92dvh] sm:h-auto sm:max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-surface shadow-2xl outline-none sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/8 px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <h2
                  id="booking-title"
                  className="font-display text-base sm:text-lg font-semibold tracking-tight"
                >
                  {step === 2 ? 'Booking ready to send' : 'Book your free demo'}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted">
                  {step === 0 && 'Pick a day and a time that suits you.'}
                  {step === 1 && 'Last part — how should we reach you?'}
                  {step === 2 && 'One tap in WhatsApp and it is with us.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking"
                className="-mr-1 sm:-mr-2 grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step rail */}
            {step < 2 && (
              <div className="flex shrink-0 gap-1.5 px-5 sm:px-6 pt-3 sm:pt-4" aria-hidden="true">
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

            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 sm:px-6 sm:py-6 overscroll-contain">
              {/* Step 1 — when */}
              {step === 0 && (
                <div className="grid gap-6 sm:gap-8 sm:grid-cols-[minmax(0,1fr)_190px]">
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
                        className="grid max-h-56 sm:max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-1"
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

                  {/* Business type dropdown */}
                  <Field as="div" label="Business type" required error={errors.businessType}>
                    <BusinessTypeDropdown
                      value={form.businessType}
                      onChange={handleBusinessTypeChange}
                      error={errors.businessType}
                      options={businessTypes}
                    />
                  </Field>

                  {/* If user selects Other, show "Write your specific business type *" section with NO logo */}
                  <AnimatePresence>
                    {isOther && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <Field
                          label="Write your specific business type"
                          required
                          error={errors.customBusinessType}
                        >
                          <input
                            className={cn(
                              inputClass,
                              'border-cyan-400/40 bg-white/[0.04] focus:border-glow focus:bg-white/[0.06] text-white',
                              errors.customBusinessType && 'border-rose-400 ring-1 ring-rose-400/30'
                            )}
                            value={form.customBusinessType}
                            onChange={set('customBusinessType')}
                            placeholder="e.g. Handloom Saree Store, Dental Clinic, Cafe, Cloud Kitchen..."
                            autoFocus
                          />
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
              <div className="sticky bottom-0 z-20 flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-surface/95 backdrop-blur-md px-5 sm:px-6 py-3.5 sm:py-4 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
                {step === 0 ? (
                  <p className="text-xs text-muted">
                    Free, 20 min • No obligation
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}

                {step === 0 ? (
                  <Button onClick={() => setStep(1)} disabled={!canContinue} className="shrink-0 font-semibold">
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button type="submit" form="booking-form" className="shrink-0 font-semibold">
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
