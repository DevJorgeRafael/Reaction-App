import { useState, createContext, useContext, useEffect } from "react";
import {
    readNotificationsRequest, readNotificationRequest,
    removeNotificationsRequest, removeNotificationRequest
} from '../api/notifications'
import { useUser } from '../context/userContext';
import { showNotificationToast } from '../components/notifications/NotificationToast'
import { useSocket } from "./socketContext";

const NotificationContext = createContext();

export const useNotification = () => {
    const notificationContext = useContext(NotificationContext);
    return notificationContext;
}

export const NotificationProvider = ({ children }) => {
    const { user } = useUser();
    const socket = useSocket()
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user && socket) {
            socket.on('notifications', (notifications) => {
                setNotifications(notifications);
            });

            socket.on('notification', (notification) => {
                setNotifications(prevNotifications => {
                    if (!prevNotifications.some(n => n._id === notification._id)) {
                        return [notification, ...prevNotifications];
                    } else {
                        return prevNotifications;
                    }
                });
                showNotificationToast(notification);
            });
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user, socket]);

    const readNotifications = async (userId) => {
        try {
            const res = await readNotificationsRequest(userId)
            setNotifications(res.data)
        } catch (error) {
            console.error('error on readNotification', error.message)
        }
    }

    const readNotification = async (notificationId) => {
        try {
            const res = await readNotificationRequest(notificationId);
            setNotifications(prevNotifications => prevNotifications.map(notification =>
                notification._id === notificationId ? res.data : notification
            ));
        } catch (error) {
            console.error(error);
        }
    };


    const removeNotifications = async (userId) => {
        try {
            await removeNotificationsRequest(userId)
            setNotifications([])
        } catch (error) {
            console.error('Error on removeNotifications ', error.message)
        }
    }

    const removeNotification = async (notificationId) => {
        try {
            await removeNotificationRequest(notificationId);
            setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== notificationId));
        } catch (error) {
            console.error('error on removeNotification', error.message);
        }
    };


    return (
        <NotificationContext.Provider value={{
            notifications,

            readNotifications,
            readNotification,
            removeNotifications,
            removeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    )
}
