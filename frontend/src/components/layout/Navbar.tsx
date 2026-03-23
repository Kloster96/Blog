'use client'

// ============================================================
// Navbar — Glassmorphism sticky header
// ============================================================

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/admin/dashboard', label: 'Admin' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-5xl px-6">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 px-5 py-3 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <span className="text-sm font-bold text-black">B</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
              Tech
            </span>
            <span className="text-[15px] font-light tracking-tight text-zinc-500">
              Blog
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200',
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
