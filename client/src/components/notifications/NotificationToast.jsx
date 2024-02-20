import React, { useEffect } from 'react';
import { ShowNotification } from './showNotification';
import toast from "react-hot-toast";
import { Box } from "@mui/material";

function NotificationToast({ notification }) {
    useEffect(() => {
        toast((t) => (
            <div
                className="d-flex justify-content-between align-items-center bg-white border 
                border-light rounded w-100"
                style={{ height: 'auto', minHeight: '50px' }}
            >
                <div style={{ width: '80%', height: 'auto' }}>
                    <Box>
                        <ShowNotification notification={notification} bg={false} />
                    </Box>
                </div>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-20 h-100 border-0 rounded-0 rounded-end p-2 d-flex align-items-center 
                    justify-content-center fs-6 fw-medium text-primary hover:text-dark focus:outline-none 
                    focus:ring-2 focus:ring-primary"
                    style={{ height: 'auto' }}
                >
                    Close
                </button>
            </div>
        ), { duration: 5000 });
    }, [notification]);

    return null;
}

export default NotificationToast;
