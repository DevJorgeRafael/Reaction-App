// socketContext.js
import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useUser } from "./userContext";

const SocketContext = createContext();

export const useSocket = () => {
    const socketContext = useContext(SocketContext)
    return socketContext
}

export const SocketProvider = ({ children }) => {
    const { user } = useUser()
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user) {
            const newSocket = io("http://localhost:4000", {
                query: { userId: user?._id },
            });
            setSocket(newSocket);
            
            return () => {
                newSocket.close();
            };
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
