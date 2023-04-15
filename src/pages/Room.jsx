import VideoPlayer from '@/components/VideoPlayer';
import { addPeerAction, removePeerAction } from '@/features/room/roomActions';
import roomReducer from '@/features/room/roomReducer';
import { useRoomContext } from '@/hooks/useRoomContext';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Room() {
	const { currentUser } = useSelector((state) => state.auth);
	const { roomId } = useParams();
	const { ws, me } = useRoomContext();
	const [stream, setStream] = useState(null);
	const [micMuted, setMicMuted] = useState(false);

	const [peers, dispatch] = useReducer(roomReducer, {});

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
			});
		} catch (error) {
			console.log(error);
		}
	}, [roomId, currentUser]);

	useEffect(() => {
		if (me && stream) {
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
	}, [me, stream]);

	const disconnectUser = (peerId) => {
		dispatch(removePeerAction(peerId));
	};

	useEffect(() => {
		ws.on('user-disconnected', disconnectUser);
	}, []);

	console.log(Object.entries(peers));

	return (
		<div className="flex flex-col items-center justify-center">
			<div>
				<div className="grid grid-cols-4 gap-4">
					<div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<VideoPlayer micMuted={micMuted} stream={stream} />
					</div>

					{Object.entries(peers).map(([peerId, peer]) => (
						<div
							className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
							key={peerId}>
							<VideoPlayer micMuted={micMuted} stream={peer?.stream} />
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => setMicMuted(!micMuted)}
					className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
					{micMuted ? 'Unmute' : 'Mute'}
				</button>
			</div>
		</div>
	);
}
