import { useState, createContext, useContext, useEffect } from "react";
import {
    readNotificationsRequest, readNotificationRequest,
    removeNotificationsRequest, removeNotificationRequest
} from '../api/notifications'

const NotificationContext = createContext();

export const useNotification = () => {
    const notificationContext = useContext(NotificationContext);
    return notificationContext;
}

export const NotificationProvider = ({ children }) => {
    const [notificationUpdated, setNotificationUpdated] = useState(null)

    const readNotifications = (userId) => {
        try {
            readNotificationsRequest(userId)
        } catch (error) {
            console.error(error)
        }
    }

    const readNotification = (notificationId) => {
        try {
            readNotificationRequest(notificationId)
        } catch (error) {
            console.error(error)
        }
    }

    const removeNotifications = (userId) => {
        try {
            console.log(userId)
            const res = removeNotificationsRequest(userId)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    const removeNotification = (notificationId) => {
        try {
            removeNotificationRequest(notificationId)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <NotificationContext.Provider value={{ 
            notificationUpdated, 

            setNotificationUpdated,
            readNotifications,
            readNotification,
            removeNotifications,
            removeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    )
}
