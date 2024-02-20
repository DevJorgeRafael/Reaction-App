import { Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ShowNotification } from "./showNotification"; 
import toast from "react-hot-toast";

export const showNotificationToast = (notification) => {
    toast((t) => (
        <Box sx={{ display: 'flex' }}>
            <ShowNotification notification={notification} bg={false} />
            <IconButton onClick={() => toast.dismiss(t.id)}
                sx={{ borderRadius: 0 }}
            >
                <CloseIcon />
            </IconButton>
        </Box>
    ), {
        duration: 5000,
        position: 'top-center',
        style: {
            backgroundColor: 'white',
            boxShadow: '0 0 5px #E0E0E0',
            width: '150%',
        },
        icon: '🔔',
    });
}
