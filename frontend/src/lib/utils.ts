import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases de Tailwind, resolviendo conflictos
 * Uso: <div className={cn('base-class', condition && 'conditional-class')} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea fecha a formato legible
 * Uso: formatDate(new Date('2024-01-15')) → "15 de enero, 2024"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/**
 * Formatea fecha relativa (hace 2 días, hace 1 hora)
 * Uso: timeAgo(new Date(Date.now() - 86400000)) → "hace 1 día"
 */
export function timeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `hace ${years} año${years > 1 ? 's' : ''}`
  if (months > 0) return `hace ${months} mes${months > 1 ? 'es' : ''}`
  if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`
  if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
  return 'justo ahora'
}
