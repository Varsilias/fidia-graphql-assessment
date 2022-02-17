import express from 'express';
import usersController from '../src/users/controllers/users.controller'
const router = express.Router()

router.get('/sign-up', (req, res) => {
  res.json(usersController.getUsers())
})

export default router