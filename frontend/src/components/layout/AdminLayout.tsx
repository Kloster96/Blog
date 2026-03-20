'use client'

// ============================================================
// Admin Layout — Premium dark sidebar
// ============================================================

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, LogOut, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface AdminLayoutProps {
  children: React.ReactNode
}

const adminNavLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/editor', label: 'Nuevo Post', icon: PenLine },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, username, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router, isLoginPage])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-white/[0.06] bg-zinc-950">
        {/* Header */}
        <div className="flex h-16 items-center gap-2.5 border-b border-white/[0.06] px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
            <span className="text-xs font-bold text-black">B</span>
          </div>
          <span className="text-sm font-semibold text-zinc-100">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {adminNavLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200',
                  isActive
                    ? 'bg-white/[0.06] font-medium text-white'
                    : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300'
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* User info + logout */}
        <div className="border-t border-white/[0.06] p-3">
          <div className="mb-2 px-3 text-xs text-zinc-600">
            {username}
          </div>
          <button
            onClick={() => void logout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-white/[0.03] hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
