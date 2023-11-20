import express from 'express'
import { google, login, signout, signup } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/google', google)
router.get('/signout', signout)


export default router;