import { Router } from 'express'
import { getPosts, 
    createPost, 
    updatePost, 
    deletePost, 
    getPost, 
    likePost, 
    unlikePost } from '../controllers/post.controller.js'
import { verifyToken } from '../controllers/user.controller.js'

const router = Router()

router.get('/posts', getPosts)

router.post('/posts', createPost)

router.put('/posts/:id', updatePost)

router.delete('/posts/:id', deletePost)

router.get('/posts/:id', getPost)

router.put('/posts/:id/like', likePost)

router.put('/posts/:id/unlike', unlikePost)

export default router