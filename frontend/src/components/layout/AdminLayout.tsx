'use client'

// ============================================================
// Admin Layout — Wrapper para rutas /admin/*
// ============================================================

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, LayoutDashboard, LogOut, PenLine } from 'lucide-react'
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

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
          <span className="text-lg font-bold">Admin Panel</span>
        </div>

        {/* Nav */}
        <nav className="space-y-1 p-4">
          {adminNavLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* User info + logout */}
        <div className="absolute bottom-0 w-64 border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            Conectado como <span className="font-medium">{username}</span>
          </div>
          <button
            onClick={() => void logout()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
