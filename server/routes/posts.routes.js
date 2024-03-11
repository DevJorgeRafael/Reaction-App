import { Router } from 'express'
import { getPosts, 
    createPost, 
    updatePost, 
    deletePost, 
    getPost, 
    likePost, 
    unlikePost 
} from '../controllers/post.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/posts', authMiddleware, getPosts)

router.post('/posts', authMiddleware, createPost)

router.put('/posts/:id', authMiddleware, updatePost)

router.delete('/posts/:id', authMiddleware, deletePost)

router.get('/posts/:id', authMiddleware, getPost)

router.put('/posts/:id/like', authMiddleware, likePost)

router.put('/posts/:id/unlike', authMiddleware, unlikePost)

export default router