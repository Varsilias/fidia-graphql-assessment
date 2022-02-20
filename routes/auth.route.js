import express from 'express';
import authController from '../src/auth/controllers/auth.controller'
const router = express.Router()

router.post('/sign-up', async (req, res) => {
  console.log(req.body)
  res.status(200).json(await authController.createUser(req.body))
})

router.get('/sign-in', async (req, res) => {
  const users = await authController.getUsers()
  console.log(users)
  res.status(200).json(users)
})

export default router