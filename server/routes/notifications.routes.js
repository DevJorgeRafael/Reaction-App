import { Router } from "express"
import { readAllNotifications,
    readNotification, removeNotification,
    removeAllNotifications
} from "../controllers/notification.controller.js"

const router = Router()

router.put('/readNotifications/:userId', readAllNotifications)
router.put('readNotification/:id', readNotification)
router.delete('/removeNotifications/:userId', removeAllNotifications)
router.delete('/removeNotification/:id', removeNotification)

export default router