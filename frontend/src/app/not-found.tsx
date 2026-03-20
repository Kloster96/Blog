import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-8xl font-bold text-zinc-800">404</div>
      <h1 className="mb-2 text-xl font-semibold text-zinc-100">Página no encontrada</h1>
      <p className="mb-8 text-sm text-zinc-500">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>
    </main>
  )
}
