'use client'

// ============================================================
// Navbar Component
// ============================================================

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/admin/dashboard', label: 'Admin' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-brand-600">
            Blog
          </span>
          <span className="text-xl font-bold tracking-tight">Técnico</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-brand-600'
                  : 'text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
