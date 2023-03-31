import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8000');

export default function RealTimeRoom() {
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();

	const [currentUserSocketId, setCurrentUserSocketId] = useState('');
	const [name, setName] = useState('');
	const [call, setCall] = useState({});
	const [stream, setStream] = useState(null);
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);

	useEffect(() => {
		// check if the browser supports the mediaDevices API
		if (navigator.mediaDevices) {
			// get the user's webcam
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
				setStream(currentStream);
				myVideo.current.srcObject = currentStream;
			});
			socket.on('currentUser', (id) => {
				setCurrentUserSocketId(id);
			});

			socket.on('callUser', ({ from, name: callerName, signal }) => {
				setCall({ isReceivingCall: true, from, name: callerName, signal });
			});
		} else {
			alert('Your browser does not support the mediaDevices API');
		}
	}, []);

	const answerCall = () => {
		setCallAccepted(true);
		const peer = new Peer({ initiator: false, trickle: false, stream });
		peer.on('signal', (data) => {
			socket.emit('answerCall', { signal: data, to: call.from });
		});

		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });
		peer.on('signal', (data) => {
			socket.emit('callUser', { userToCall: id, signalData: data, from: currentUserSocketId, name: name });
		});

		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on('callAccepted', (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);
		connectionRef.current.destroy();
	};

	return (
		<div>
			{stream && <video playsInline muted ref={myVideo} autoPlay />}

			{callAccepted && !callEnded && <video playsInline ref={userVideo} autoPlay />}
		</div>
	);
}
