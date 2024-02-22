import { Router } from 'express'

import { login, register, 
    verifyToken, getUserByUsername,
    updateUser, updateUserImage, 
    checkUsername, deleteUserImage,
    followUser, 
    getUsers, getUsersByUsername, unfollowUser
} from '../controllers/user.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verifyToken', verifyToken)

router.get('/username/:username', getUserByUsername)
router.get('/checkUsername/:username', checkUsername)
router.put('/updateUser/:username', updateUser)
router.put('/updateUserImage', updateUserImage)
router.delete('/deleteUserImage', deleteUserImage)
router.post('/followUser', followUser)
router.post('/unfollowUser', unfollowUser)
router.get('/users', getUsers)
router.get('/users/:username', getUsersByUsername)

export default router