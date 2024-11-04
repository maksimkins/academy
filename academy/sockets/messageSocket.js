const { Server } = require('socket.io');

const Message = require('../models/Message');
const User = require('../models/User');
const Group = require('../models/Group');


const setUpMessageSocket = async (server) => {
    const io = new Server(server);


io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

   
    socket.on('joinGroup', ({ userId, groupId }) => {
        const roomName = `group_${groupId}`;
        socket.join(roomName);
        console.log(`User ${userId} joined room ${roomName}`);
    });

   
    socket.on('sendMessage', async ({ userId, groupId, text }) => {
        try {
           
            const user = await User.findByPk(userId);
            const group = await Group.findByPk(groupId);

            if (!user || !group) {
                socket.emit('error', { message: 'Invalid user or group' });
                return;
            }

            
            const message = await Message.create({ userId, groupId, text });

            const roomName = `group_${groupId}`;

            
            io.to(roomName).emit('receiveMessage', {
                message: {
                    id: message.id,
                    userId: message.userId,
                    groupId: message.groupId,
                    text: message.text,
                    createdAt: message.createdAt
                }
            });
        } catch (error) {
            console.error('Error saving or sending message:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

}

module.exports = setUpMessageSocket;