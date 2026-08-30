import Peer from 'peerjs';
import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { v4 as uuidV4 } from 'uuid';

export const RoomContext = createContext(null);

const ws = io(import.meta.env.VITE_APP_SOCKET_URL);

export const RoomProvider = ({ children }) => {
    // `me` is published only once the peer is registered with the broker,
    // otherwise we announce a peer id nobody can dial yet.
    const [me, setMe] = useState(null);
    const userId = useSelector((state) => state.auth.currentUser?._id);

    const roomCreated = ({ roomId, userId }) => {
        window.open(`/room/${roomId}/${userId}`, '_blank', `toolbar=yes,scrollbars=yes,resizable=yes`);
    };

    useEffect(() => {
        const peer = new Peer(uuidV4());

        peer.on('open', () => setMe(peer));
        peer.on('error', (err) => console.error('peer error', err.type, err.message));

        ws.on('room-created', roomCreated);

        return () => {
            ws.off('room-created', roomCreated);
            peer.destroy();
        };
    }, []);

    // Claim our user room so the server can address call events to us alone.
    useEffect(() => {
        if (!userId) return;

        const register = () => ws.emit('register-user', userId);
        register();
        ws.on('connect', register);

        return () => ws.off('connect', register);
    }, [userId]);

    const value = { me, ws };

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
