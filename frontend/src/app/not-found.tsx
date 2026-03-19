import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl font-bold text-brand-600">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Página no encontrada</h2>
      <p className="mb-8 text-muted-foreground">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-700"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
