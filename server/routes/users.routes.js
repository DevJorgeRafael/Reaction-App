import { Router } from 'express'

import { login, register, 
    verifyToken, getUserByUsername,
    updateUser, updateUserImage, 
    checkUsername, deleteUserImage,
    followUser, 
    getUsers, getUsersByUsername, unfollowUser
} from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verifyToken', verifyToken)

router.get('/username/:username', authMiddleware, getUserByUsername)
router.get('/checkUsername/:username', authMiddleware, checkUsername)
router.put('/updateUser/:username', authMiddleware, updateUser)
router.put('/updateUserImage', authMiddleware, updateUserImage)
router.delete('/deleteUserImage', authMiddleware, deleteUserImage)
router.post('/followUser', authMiddleware, followUser)
router.post('/unfollowUser', authMiddleware, unfollowUser)
router.get('/users', authMiddleware, getUsers)
router.get('/users/:username', authMiddleware, getUsersByUsername)

export default router