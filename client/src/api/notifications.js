import axios from './axios'

export const readNotificationsRequest = async (userId) => 
    await axios.put(`/readNotifications/${userId}`)

export const readNotificationRequest = async (notificationId) => 
    await axios.put(`/readNotification/${notificationId}`)

export const removeNotificationsRequest = async (userId) => 
    await axios.delete(`/removeNotifications/${userId}`)

export const removeNotificationRequest = async (notificationId) => 
    await axios.delete(`/removeNotification/${notificationId}`)

