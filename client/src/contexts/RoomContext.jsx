import Peer from "peerjs";
import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidV4 } from "uuid";

export const RoomContext = createContext(null);

const ws = io(import.meta.env.VITE_APP_SOCKET_URL);

export const RoomProvider = ({ children }) => {
	const [me, setMe] = useState(null);

	const roomCreated = ({ roomId, userId }) => {
		console.log("room-created", roomId);
		window.open(`/room/${roomId}/${userId}`, "_blank", `toolbar=yes,scrollbars=yes,resizable=yes`);
	};

	const getUsers = ({ participants }) => {
		console.log({ participants });
	};

	useEffect(() => {
		const meId = uuidV4();
		const peer = new Peer(meId);

		setMe(peer);

		ws.on("room-created", roomCreated);
		ws.on("get-users", getUsers);
	}, []);

	const value = { me, ws };

	return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
