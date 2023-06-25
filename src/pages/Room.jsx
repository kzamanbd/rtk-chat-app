import VideoPlayer from '@/components/VideoPlayer';
import { addPeer, removePeer } from '@/features/room/peerSlice';
import { useRoom } from '@/hooks/useRoom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Room() {
	const { currentUser } = useSelector((state) => state.auth);
	const { roomId, targetUserId } = useParams();
	const { ws, me } = useRoom();
	const [stream, setStream] = useState(null);
	const [micMuted, setMicMuted] = useState(false);
	const { peers } = useSelector((state) => state.peers);
	const dispatch = useDispatch();

	useEffect(() => {
		if (me && targetUserId) {
			console.log('Room', roomId, targetUserId);
			ws.emit('join-room', {
				roomId,
				userId: targetUserId,
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
					dispatch(addPeer({ peerId, stream: userVideoStream }));
				});
			});

			me.on('call', (call) => {
				call.answer(stream);
				call.on('stream', (userVideoStream) => {
					dispatch(addPeer({ peerId: call.peer, stream: userVideoStream }));
				});
			});
		}
	}, [me, stream]);

	const disconnectUser = (peerId) => {
		dispatch(removePeer(peerId));
	};

	useEffect(() => {
		ws.on('user-disconnected', disconnectUser);
	}, []);

	console.log('peers', Object.entries(peers));

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="container my-4">
				<div className="grid grid-cols-4 gap-4">
					<div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<VideoPlayer micMuted stream={stream} />
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
					className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
					{micMuted ? 'Unmute' : 'Mute'}
				</button>
			</div>
		</div>
	);
}
