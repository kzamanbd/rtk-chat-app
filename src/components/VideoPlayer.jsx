import { useEffect, useRef } from 'react';

export default function VideoPlayer({ stream, micMuted }) {
	const videoRef = useRef(null);
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);
	return <video ref={videoRef} autoPlay muted={micMuted} />;
}
