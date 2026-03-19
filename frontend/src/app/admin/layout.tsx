'use client'

// ============================================================
// Admin Layout — Wrapper para todas las rutas /admin/*
// ============================================================

import { AdminLayout as AdminLayoutComponent } from '@/components/layout/AdminLayout'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>
}
