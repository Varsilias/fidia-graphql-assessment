import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String, required: true },
  country: { type: String, required: true},
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const User = model('User', UserSchema)
export default User