import { useState, createContext, useContext, useEffect } from "react";
import { io } from 'socket.io-client';
import {
    readNotificationsRequest, readNotificationRequest,
    removeNotificationsRequest, removeNotificationRequest
} from '../api/notifications'
import { useUser } from '../context/userContext';
import { showNotificationToast } from '../components/notifications/NotificationToast'

const NotificationContext = createContext();

export const useNotification = () => {
    const notificationContext = useContext(NotificationContext);
    return notificationContext;
}

export const NotificationProvider = ({ children }) => {
    const { user } = useUser();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let socket;

        if (user) {
            socket = io('http://localhost:4000', {
                query: {
                    userId: user._id
                }
            });

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
    }, [user]);

    const readNotifications = async (userId) => {
        try {
            const res = await readNotificationsRequest(userId)
            console.log(res);
        } catch (error) {
            console.error(error)
        }
    }

    const readNotification = async (notificationId) => {
        try {
            const res = await readNotificationRequest(notificationId)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    const removeNotifications = async (userId) => {
        try {
            await removeNotificationsRequest(userId)
            setNotifications([])
        } catch (error) {
            console.error(error)
        }
    }

    const removeNotification = async (notificationId) => {
        try {
            await removeNotificationRequest(notificationId);
            setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== notificationId));
        } catch (error) {
            console.error(error);
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
