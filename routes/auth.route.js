import express from 'express';
const router = express.Router()

router.post('/sign-up', async (req, res) => {
  console.log(req.body)
  res.status(200).json({ message: 'Testing Post request'})
})

router.get('/sign-in', async (req, res) => {
  res.status(200).json({ message: 'Testing get request'})
})

export default router