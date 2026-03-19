import dotenv from 'dotenv'

// Cargar .env en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

// Validar variables de entorno requeridas
const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRES_IN'] as const

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`❌ Falta variable de entorno requerida: ${varName}`)
  }
}

export const env = {
  port: process.env.PORT!,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN!,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    apiKey: process.env.CLOUDINARY_API_KEY ?? '',
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  },
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
} as const

export type Env = typeof env
