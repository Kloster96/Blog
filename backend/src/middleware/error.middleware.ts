// ============================================================
// Global Error Handler Middleware
// ============================================================
// Implementación completa en Milestone 3

import { Request, Response, NextFunction } from 'express'
import { env } from '../config'

export interface AppError extends Error {
  statusCode?: number
  status?: string
}

/**
 * Middleware global de errores
 * SIEMPRE debe ir al FINAL de la cadena de middlewares
 */
export function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Loguear error (para debugging)
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)
  if (env.nodeEnv === 'development') {
    console.error(err.stack)
  }

  const statusCode = err.statusCode ?? 500
  const status = err.status ?? 'error'

  // En producción, no exponer detalles de errores 500
  const isProduction = env.nodeEnv === 'production'
  const message =
    statusCode >= 500 && isProduction ? 'Internal Server Error' : err.message

  res.status(statusCode).json({
    error: status.toUpperCase(),
    ...(message !== 'Internal Server Error' ? { message } : {}),
  })
}

/**
 * 404 Handler para rutas inexistentes
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: 'NOT FOUND',
    message: `Ruta ${req.method} ${req.path} no encontrada`,
  })
}

/**
 * Helper para crear errores con status code
 */
export function createError(message: string, statusCode: number): AppError {
  const error = new Error(message) as AppError
  error.statusCode = statusCode
  error.status =
    statusCode === 400
      ? 'Bad Request'
      : statusCode === 401
      ? 'Unauthorized'
      : statusCode === 404
      ? 'Not Found'
      : statusCode === 409
      ? 'Conflict'
      : 'error'
  return error
}
