import { Router } from 'express'

import { login, register, verifyToken, getUserByUsername } from '../controllers/user.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verifyToken', verifyToken)

router.get('/username/:username', getUserByUsername)

export default router