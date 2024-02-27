import Chat from '../models/Chat.js'

export const getChats = async (userId, socket) => {
    try {
        const chats = await Chat.find({ users: userId })
            .populate({
                path: 'messages',
                options: { sort: { date: -1 } },
                populate: [
                    { path: 'sender', select: '_id username name image' },
                    { path: 'receiver', select: '_id username name image' }
                ]
            });

        const formattedChats = chats.map(chat => {
            const otherUser = chat.users.find(user => user._id.toString() !== userId);
            const lastMessage = chat.messages[0];
            return { user: otherUser, lastMessage };
        });

        socket.emit('chats', formattedChats);
    } catch (error) {
        console.log('Error on getChats', error.message);
    }
};