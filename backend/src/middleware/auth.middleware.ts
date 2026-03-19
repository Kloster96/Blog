// ============================================================
// Auth Middleware
// ============================================================
// Implementación completa en Milestone 3

import { Request, Response, NextFunction } from 'express'
import { authService, JWTPayload } from '../services/auth.service'

// Extender Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}

/**
 * Middleware: verificar JWT de cookie
 * Extrae el token de la cookie y valida
 */
export function verifyJWT(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.auth_token

  if (!token) {
    res.status(401).json({ error: 'Unauthorized', message: 'No autenticado' })
    return
  }

  try {
    const payload = authService.verifyToken(token)
    req.user = payload
    next()
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Token inválido'
    res.status(401).json({ error: 'Unauthorized', message })
  }
}
