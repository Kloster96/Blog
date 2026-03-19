import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ToastContainer />
      </body>
    </html>
  )
}
