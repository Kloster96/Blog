// ============================================================
// User Model Types
// ============================================================

import { Document, Types } from 'mongoose'

export interface IUser {
  username: string
  password: string
  role: 'admin'
  createdAt: Date
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId
  comparePassword(candidatePassword: string): Promise<boolean>
}

export type UserPublic = Pick<IUser, 'username' | 'role' | 'createdAt'>
