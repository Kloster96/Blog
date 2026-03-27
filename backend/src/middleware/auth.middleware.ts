// ============================================================
// Auth Middleware
// ============================================================

import { Request, Response, NextFunction } from 'express'
import { authService, JWTPayload } from '../services/auth.service'

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}

/**
 * Verify JWT from Authorization header
 */
export function verifyJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized', message: 'No token provided' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = authService.verifyToken(token)
    req.user = payload
    next()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid token'
    res.status(401).json({ error: 'Unauthorized', message })
  }
}
