import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '../context/userContext';

export const useSocket = () => {
    const { user } = useUser();

    useEffect(() => {
        let socket;

        if (user) {
            socket = io('http://localhost:4000', {
                query: {
                    userId: user._id
                }
            });

            socket.on('notification', (notification) => {
                console.log('Nueva notificación:', notification);
            });
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user]);
};
