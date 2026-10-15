import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { isSameDay, startOfToday } from '@/lib/booking'
import { cn } from '@/lib/utils'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/** Build a Monday-first 6x7 grid for the given month. */
function buildGrid(year, month) {
  const first = new Date(year, month, 1)
  // getDay() is Sunday-first; shift so Monday is column 0.
  const lead = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < lead; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

/**
 * Date picker. Sundays are unavailable because the studio is closed, and past
 * days are disabled rather than hidden so the month grid stays stable.
 */
export default function Calendar({ value, onChange, monthsAhead = 3 }) {
  const today = startOfToday()
  const [view, setView] = useState(() => ({
    year: (value || today).getFullYear(),
    month: (value || today).getMonth(),
  }))

  const cells = useMemo(() => buildGrid(view.year, view.month), [view])

  const limit = new Date(today.getFullYear(), today.getMonth() + monthsAhead, 1)
  const atStart =
    view.year === today.getFullYear() && view.month === today.getMonth()
  const atEnd =
    new Date(view.year, view.month, 1).getTime() >= limit.getTime()

  const step = (delta) => {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const isDisabled = (date) =>
    date.getTime() < today.getTime() || date.getDay() === 0

  return (
    <div className="select-none">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous month"
          className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <p aria-live="polite" className="text-sm font-medium">
          {MONTH_NAMES[view.month]} {view.year}
        </p>

        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next month"
          className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1" role="grid">
        {WEEKDAYS.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="pb-2 text-center font-mono text-2xs uppercase tracking-widest text-muted/70"
            aria-hidden="true"
          >
            {d}
          </div>
        ))}

        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} aria-hidden="true" />

          const disabled = isDisabled(date)
          const selected = isSameDay(date, value)
          const isToday = isSameDay(date, today)

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onChange(date)}
              aria-pressed={selected}
              aria-label={date.toDateString()}
              className={cn(
                'relative aspect-square rounded-lg text-sm tnum transition-all duration-200',
                'disabled:cursor-not-allowed disabled:text-white/15',
                !disabled && !selected && 'text-white/85 hover:bg-white/[0.07]',
                selected &&
                  'bg-gradient-to-br from-glow to-violet-glow font-semibold text-white shadow-[0_6px_20px_-6px_rgba(59,130,246,0.9)]'
              )}
            >
              {date.getDate()}
              {isToday && !selected && (
                <span
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-glow-soft"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-muted">
        Sundays are closed. Slots run 10:00 AM to 8:00 PM IST.
      </p>
    </div>
  )
}
