// ============================================================
// Footer — Minimal dark design
// ============================================================

import { SITE_NAME } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {year} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-zinc-700">
            Built with Next.js · Express · MongoDB
          </p>
        </div>
      </div>
    </footer>
  )
}
