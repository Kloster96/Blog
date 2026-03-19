'use client'

// ============================================================
// Login Page — Admin Login
// ============================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(username, password)
    if (success) {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ingresá tus credenciales para acceder al panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            autoComplete="username"
            required
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          <Button type="submit" className="w-full" loading={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          Credenciales por defecto: admin / admin123
        </p>
      </Card>
    </div>
  )
}
