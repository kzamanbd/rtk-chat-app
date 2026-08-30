import { v4 as uuidV4 } from 'uuid';

const rooms: any = {};

// every socket of a signed-in user sits in this room, so server events can be
// addressed to that user instead of broadcast to every connected client
export const userRoom = (userId: string) => `user:${userId}`;

export const socketConnection = (socket: any) => {
    // identify the socket so call events can be delivered to one user only
    const registerUser = (userId: string) => {
        if (userId) {
            socket.join(userRoom(userId));
        }
    };
    // create room
    const roomCreate = (userId: string) => {
        const roomId = uuidV4();
        socket.emit('room-created', { roomId, userId });
        rooms[roomId] = [];
    };

    // join room
    const joinRoom = ({ roomId, peerId }: any) => {
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
            const index = rooms[roomId]?.indexOf(peerId);
            if (index > -1) {
                rooms[roomId].splice(index, 1);
            }
            socket.to(roomId).emit('user-disconnected', peerId);
        });
    };
    // listen for events
    socket.on('register-user', registerUser);
    socket.on('create-room', roomCreate);
    socket.on('join-room', joinRoom);
    socket.on('typing', (data: any) => {
        socket.emit('typing', data);
    });
};
