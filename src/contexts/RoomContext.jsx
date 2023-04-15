import Peer from 'peerjs';
import { createContext, useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';
import { v4 as uuidV4 } from 'uuid';

export const RoomContext = createContext(null);
const ws = socketIoClient('http://localhost:8000/chat');

export const RoomProvider = ({ children }) => {
	const [me, setMe] = useState(null);

	const createRoom = (roomId) => {
		console.log('room-created', roomId);
		const basePath = window.location.origin.toString();
		window.open(`${basePath}/room/${roomId}`, '_blank', 'noopener,noreferrer');
	};

	const getUsers = ({ participants }) => {
		console.log({ participants });
	};

	useEffect(() => {
		const meId = uuidV4();
		const peer = new Peer(meId);

		setMe(peer);

		ws.on('room-created', createRoom);
		ws.on('get-users', getUsers);
		console.log('RoomContext');
	}, []);
	const value = { me, ws };

	return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
