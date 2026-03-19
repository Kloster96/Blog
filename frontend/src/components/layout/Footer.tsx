// ============================================================
// Footer Component
// ============================================================

import { SITE_NAME } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {year} {SITE_NAME}. Todos los derechos reservados.
        </p>
        <p className="mt-1">
          Desarrollado con Next.js, Express y MongoDB.
        </p>
      </div>
    </footer>
  )
}
