import { Router } from "express"
import { readAllNotifications,
    readNotification, removeNotification,
    removeAllNotifications
} from "../controllers/notification.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = Router()

router.put('/readNotifications/:userId', authMiddleware, readAllNotifications)
router.put('/readNotification/:id', authMiddleware, readNotification)
router.delete('/removeNotifications/:userId', authMiddleware, removeAllNotifications)
router.delete('/removeNotification/:id', authMiddleware, removeNotification)

export default router