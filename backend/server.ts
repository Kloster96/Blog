// ============================================================
// Server Entry Point
// ============================================================

import app from './app'
import { connectDB, env } from './config'

async function bootstrap() {
  try {
    // Conectar a MongoDB
    await connectDB()

    // Iniciar servidor
    app.listen(env.port, () => {
      console.log(`
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   🚀 Blog API corriendo en http://localhost:${env.port}   ║
║   📦 Entorno: ${env.nodeEnv.padEnd(40)}║
║   🔗 API: http://localhost:${env.port}/api              ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
      `)
    })
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error)
    process.exit(1)
  }
}

bootstrap()
