import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext(null);

const socketOptions = {
	reconnectionDelay: 1000,
	reconnection: true,
	reconnectionAttemps: 10,
	transports: ['websocket'],
	agent: false,
	upgrade: false,
	rejectUnauthorized: false
};

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socket = io(import.meta.env.VITE_APP_SOCKET_URL, socketOptions);
		setSocket(socket);
	}, []);

	const value = { socket };

	return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
