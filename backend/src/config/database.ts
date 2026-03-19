import mongoose from 'mongoose'
import { env } from './env'

// Singleton para la conexión
let isConnected = false

export async function connectDB(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log('📦 MongoDB: usando conexión existente')
    return mongoose
  }

  console.log(`🔌 MongoDB: conectando a ${env.mongoUri}...`)

  try {
    const db = await mongoose.connect(env.mongoUri)

    isConnected = db.connections[0].readyState === 1
    console.log(`✅ MongoDB conectado exitosamente`)

    // Event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB desconectado')
      isConnected = false
    })

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconectado')
      isConnected = true
    })

    return db
  } catch (error) {
    console.error('❌ MongoDB: error al conectar:', error)
    throw error
  }
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) return

  await mongoose.disconnect()
  isConnected = false
  console.log('🔌 MongoDB desconectado')
}
