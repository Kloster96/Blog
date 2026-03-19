// ============================================================
// User Model (Mongoose Schema)
// ============================================================
// Implementación completa en Milestone 2

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUserDocument } from '../types'

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // No incluir password en queries por defecto
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
)

// Pre-save: hashear password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Método: comparar passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// toJSON: nunca exponer password
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password
    delete ret.__v
    return ret
  },
})

export const User = mongoose.model<IUserDocument>('User', userSchema)
