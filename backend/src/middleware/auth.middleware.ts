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
 * Verify JWT from cookie or Authorization header
 */
export function verifyJWT(req: Request, res: Response, next: NextFunction): void {
  let token: string | undefined

  // 1.优先从 cookie 读取 (producción con credentials: 'include')
  if (req.cookies?.auth_token) {
    token = req.cookies.auth_token
  }
  // 2. fallback al Authorization header
  else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized', message: 'No token provided' })
    return
  }

  try {
    const payload = authService.verifyToken(token)
    req.user = payload
    next()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid token'
    res.status(401).json({ error: 'Unauthorized', message })
  }
}
