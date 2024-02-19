import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '../context/userContext';

export const useSocket = () => {
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
                console.log('Received new notification:', notification);
                setNotifications(prevNotifications => {
                    const updatedNotifications = [...prevNotifications, notification];
                    console.log('Updated notifications:', updatedNotifications);
                    return updatedNotifications;
                });
            });
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user]);


    return notifications;
};


