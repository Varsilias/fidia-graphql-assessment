import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String, required: true },
  country: { type: String, required: true},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const User = model('User', UserSchema)
export default User