// ============================================================
// Express App — Configuración de middlewares y routes
// ============================================================

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import routes from './routes'
import { globalErrorHandler, notFoundHandler } from './middleware/error.middleware'
import { env } from './config'

const app = express()

// Security & Logging middlewares
app.use(helmet())
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true, // Permitir cookies cross-origin
  })
)
app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'))

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// API Routes
app.use('/api', routes)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use(notFoundHandler)

// Global error handler (SIEMPRE al final)
app.use(globalErrorHandler)

export default app
