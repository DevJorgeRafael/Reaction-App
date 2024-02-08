import { Router } from 'express'

import { login, register, verifyToken } from '../controllers/user.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verifyToken', verifyToken)

export default router