// ============================================================
// Auth Service
// ============================================================
// Implementación completa en Milestone 3

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/User'
import { env } from '../config'

export interface JWTPayload {
  userId: string
  username: string
  role: string
}

export class AuthService {
  /**
   * Login: valida credenciales y retorna JWT
   */
  async login(
    username: string,
    password: string
  ): Promise<{ token: string; user: { username: string; role: string } }> {
    // Buscar usuario con password incluido (+password en select)
    const user = await User.findOne({ username: username.toLowerCase() }).select(
      '+password'
    )

    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw new Error('Credenciales inválidas')
    }

    const payload: JWTPayload = {
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    }

    const token = jwt.sign(payload, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn as string | number,
    } as jwt.SignOptions)

    return {
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    }
  }

  /**
   * Verificar y decodificar JWT
   */
  verifyToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, env.jwtSecret) as JWTPayload
      return decoded
    } catch {
      throw new Error('Token inválido o expirado')
    }
  }

  /**
   * Hashear password (para seed)
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }
}

export const authService = new AuthService()
