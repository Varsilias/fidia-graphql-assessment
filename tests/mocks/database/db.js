import mongoose from "mongoose"
const mongoUri = process.env.TEST_MONGO_URI


export const testConnection = {
  connect: async () => {
    return await mongoose.connect(mongoUri)
  },

  disconnect: async () => {
    return await mongoose.disconnect()
  }
}