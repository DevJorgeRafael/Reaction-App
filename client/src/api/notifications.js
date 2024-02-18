import axios from './axios'

export const getNotificationsRequest = async (userId) => await axios.get(`/notifications/${userId}`)

