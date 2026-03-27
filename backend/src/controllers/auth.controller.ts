// ============================================================
// Auth Controller
// ============================================================
// Implementación completa en Milestone 3

import { Request, Response, NextFunction } from 'express'
import { authService } from '../services/auth.service'
import { env } from '../config'
import { createError } from '../middleware/error.middleware'
import { LoginRequest } from '../types'

/**
 * POST /api/auth/login
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { username, password } = req.body as LoginRequest

    if (!username || !password) {
      throw createError('Username y password son requeridos', 400)
    }

    const { token, user } = await authService.login(username, password)

    // Return token in response body (frontend stores in Zustand)
    res.json({ message: 'Login successful', token, user })
  } catch (error) {
    if (error instanceof Error && error.message === 'Credenciales inválidas') {
      res.status(401).json({ error: 'Unauthorized', message: 'Credenciales inválidas' })
      return
    }
    next(error)
  }
}

/**
 * POST /api/auth/logout
 */
export function logout(_req: Request, res: Response): void {
  res.json({ message: 'Logged out' })
}

/**
 * GET /api/auth/me
 */
export async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      throw createError('No autenticado', 401)
    }

    res.json({
      username: req.user.username,
      role: req.user.role,
    })
  } catch (error) {
    next(error)
  }
}
