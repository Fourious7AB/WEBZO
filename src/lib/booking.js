import { site } from './site'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** "12 Aug 2026" */
export function formatDate(date) {
  if (!date) return ''
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

/** "Wed, 12 Aug 2026" */
export function formatDateLong(date) {
  if (!date) return ''
  return `${DAYS[date.getDay()]}, ${formatDate(date)}`
}

/** Compare two dates by calendar day only. */
export const isSameDay = (a, b) =>
  !!a &&
  !!b &&
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear()

/** Midnight today, for disabling past dates. */
export function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Half-hour slots between 10:00 and 20:00, as display strings. */
export function buildTimeSlots() {
  const slots = []
  for (let h = 10; h <= 19; h++) {
    for (const m of [0, 30]) {
      const period = h >= 12 ? 'PM' : 'AM'
      const hour12 = h > 12 ? h - 12 : h
      slots.push(`${hour12}:${String(m).padStart(2, '0')} ${period}`)
    }
  }
  slots.push('8:00 PM')
  return slots
}

/**
 * Slots already in the past are useless if the user picked today.
 * Also keeps a 60-minute buffer so nobody books a call for 4 minutes from now.
 */
export function isSlotAvailable(slot, date) {
  if (!date || !isSameDay(date, new Date())) return true
  const [time, period] = slot.split(' ')
  const [h, m] = time.split(':').map(Number)
  let hour24 = h % 12
  if (period === 'PM') hour24 += 12
  const slotDate = new Date(date)
  slotDate.setHours(hour24, m, 0, 0)
  return slotDate.getTime() > Date.now() + 60 * 60 * 1000
}

/** Build the human-readable WhatsApp message body. */
export function buildMessage(booking) {
  const lines = [
    '*New WebzoLabs Demo Booking*',
    '',
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
  ]
  if (booking.email) lines.push(`Email: ${booking.email}`)
  if (booking.businessType) lines.push(`Business: ${booking.businessType}`)
  if (booking.date) lines.push(`Date: ${formatDate(booking.date)}`)
  if (booking.time) lines.push(`Time: ${booking.time}`)
  if (booking.message) lines.push('', `Message: ${booking.message}`)
  lines.push('', 'Sent from webzolabs.com')
  return lines.join('\n')
}

/**
 * Deep link that opens WhatsApp (app on mobile, web on desktop) with the
 * booking pre-filled and addressed to the studio number.
 */
export function buildWhatsAppUrl(booking) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(buildMessage(booking))}`
}

/** Generic "chat to us" link with an optional opening line. */
export function chatUrl(text = "Hi WebzoLabs! I'd like to know more about your websites.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}

/** Indian mobile numbers, tolerant of spaces, dashes and +91. */
export function validatePhone(value) {
  const digits = value.replace(/\D/g, '')
  const local = digits.startsWith('91') && digits.length > 10 ? digits.slice(2) : digits
  return /^[6-9]\d{9}$/.test(local)
}

export function validateEmail(value) {
  if (!value) return true // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}
