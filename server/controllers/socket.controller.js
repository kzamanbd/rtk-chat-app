const { v4: uuidV4 } = require('uuid');

// module scaffolding
const handler = {};

const rooms = {};

handler.socketConnection = (socket) => {
    console.log('Client connected', socket.id);
    // create room
    const roomCreate = (userId) => {
        const roomId = uuidV4();
        socket.emit('room-created', { roomId, userId });
        rooms[roomId] = [];
    };

    // join room
    const joinRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            // if peerId not in rooms[roomId] then push it
            if (!rooms[roomId].includes(peerId)) {
                rooms[roomId].push(peerId);
            }
            socket.join(roomId);
            socket.to(roomId).emit('user-joined', { peerId });

            socket.emit('get-users', {
                roomId,
                participants: rooms[roomId]
            });
        }

        socket.on('disconnect', () => {
            console.log('Client disconnected', peerId);
            const index = rooms[roomId]?.indexOf(peerId);
            if (index > -1) {
                rooms[roomId].splice(index, 1);
            }
            socket.to(roomId).emit('user-disconnected', peerId);
        });
    };
    // listen for events
    socket.on('create-room', roomCreate);
    socket.on('join-room', joinRoom);
};

// export module
module.exports = handler;
