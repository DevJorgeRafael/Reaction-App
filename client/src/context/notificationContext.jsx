import { useState, createContext, useContext, useEffect } from "react";
import { io } from 'socket.io-client';
import {
    readNotificationsRequest, readNotificationRequest,
    removeNotificationsRequest, removeNotificationRequest
} from '../api/notifications'
import { useUser } from '../context/userContext';
import NotificationToast from "../components/notifications/NotificationToast";
import toast from "react-hot-toast";
import { ShowNotification } from "../components/notifications/showNotification";
import { Box, Button } from "@mui/material";

const NotificationContext = createContext();

export const useNotification = () => {
    const notificationContext = useContext(NotificationContext);
    return notificationContext;
}

export const NotificationProvider = ({ children }) => {
    const { user } = useUser();
    const [notifications, setNotifications] = useState([]);
    const [toastNotification, setToastNotification] = useState(null);

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
                    // Verificar si la notificación ya está en la lista
                    if (!prevNotifications.some(n => n._id === notification._id)) {
                        return [notification, ...prevNotifications];
                    } else {
                        return prevNotifications;
                    }
                });
                setToastNotification(notification);
            });

        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user]);

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

    const removeNotifications = async (userId) => {
        try {
            const res = await removeNotificationsRequest(userId)
            console.log('removeNotifications: ', res.data.deletedCount)

            setNotifications([])
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
            notifications,

            readNotifications,
            readNotification,
            removeNotifications,
            removeNotification
        }}>
            {children}
            {toastNotification && <NotificationToast notification={toastNotification} />}
        </NotificationContext.Provider>
    )
}
