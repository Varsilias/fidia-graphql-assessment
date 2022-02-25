import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  country: { type: String, required: true},
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date().toISOString() },
  updatedAt: { type: Date, default: new Date().toISOString() }
})

const User = model('User', UserSchema)
export default User