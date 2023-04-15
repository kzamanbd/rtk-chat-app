import { addPeerAction } from '@/features/room/roomActions';
import roomReducer from '@/features/room/roomReducer';
import { useRoomContext } from '@/hooks/useRoomContext';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Room() {
	const { currentUser } = useSelector((state) => state.auth);
	const { roomId } = useParams();
	const { ws, me } = useRoomContext();
	const [stream, setStream] = useState(null);

	const [peers, dispatch] = useReducer(roomReducer, {});

	const videoRef = useRef(null);

	useEffect(() => {
		if (me && currentUser?._id) {
			console.log('Room', roomId);
			ws.emit('join-room', {
				roomId,
				userId: currentUser?._id,
				peerId: me._id
			});
		}
		try {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
				setStream(stream);
				videoRef.current.srcObject = stream;
			});
		} catch (error) {
			console.log(error);
		}
	}, [roomId, currentUser]);

	useEffect(() => {
		if (stream && me) {
			ws.on('user-joined', ({ peerId }) => {
				console.log('user-joined', peerId);
				const call = me.call(peerId, stream);
				call.on('stream', (userVideoStream) => {
					dispatch(addPeerAction(peerId, userVideoStream));
				});
			});

			me.on('call', (call) => {
				call.answer(stream);
				call.on('stream', (userVideoStream) => {
					dispatch(addPeerAction(call.peer, userVideoStream));
				});
			});
		}
	}, [stream, me]);

	console.log(Object.entries(peers?.peers || {}));

	const othersVideos = Object.entries(peers?.peers || {});

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="grid grid-cols-4 gap-4">
				<div>
					<video ref={videoRef} autoPlay playsInline muted />
				</div>

				{othersVideos.map(([peerId, peer]) => (
					<div key={peerId}>
						<video autoPlay playsInline src={peer.stream} />
					</div>
				))}
			</div>
		</div>
	);
}
