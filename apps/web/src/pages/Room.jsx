import CallControls from '@/components/video-call/CallControls';
import { ChevronDownIcon, UsersIcon } from '@/components/video-call/CallIcons';
import SelfView from '@/components/video-call/SelfView';
import VideoTile from '@/components/video-call/VideoTile';
import { useGetUsersQuery, useRequestVideoCallMutation } from '@/features/messages/messagesApi';
import { addPeer, clearPeers, removePeer } from '@/features/room/peerSlice';
import useQuery from '@/hooks/useQuery';
import { useRoom } from '@/hooks/useRoom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const IDLE_TIMEOUT = 4000;

const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return hrs > 0 ? `${hrs}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;
};

export default function Room() {
    const { currentUser } = useSelector((state) => state.auth);
    const { peers } = useSelector((state) => state.peers);
    const { roomId, targetUserId } = useParams();
    const { ws, me } = useRoom();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isIncoming = useQuery().get('incoming') === '1';

    const [stream, setStream] = useState(null);
    const [mediaError, setMediaError] = useState(null);
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [sharing, setSharing] = useState(false);
    const [swapped, setSwapped] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [duration, setDuration] = useState(0);
    const [toast, setToast] = useState(null);

    const callsRef = useRef([]);
    const pendingCallsRef = useRef(new Map());
    const streamRef = useRef(null);
    const cameraTrackRef = useRef(null);
    const idleTimerRef = useRef(null);

    const [requestVideoCall] = useRequestVideoCallMutation();
    const { data: usersData } = useGetUsersQuery();

    const partner = useMemo(
        () => usersData?.users?.find((user) => user._id === targetUserId),
        [usersData, targetUserId]
    );

    const remotePeers = useMemo(() => Object.entries(peers), [peers]);
    const connected = remotePeers.length > 0;

    /* ----------------------------- signalling ----------------------------- */

    // Only the caller rings the other side; the callee arrives with ?incoming=1.
    useEffect(() => {
        if (isIncoming) return;
        requestVideoCall({ room_id: roomId, target_user_id: targetUserId });
    }, [roomId, targetUserId, isIncoming]);

    // Grab the camera once per room.
    useEffect(() => {
        if (!navigator.mediaDevices?.getUserMedia) {
            setMediaError('device');
            return;
        }

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((media) => {
                streamRef.current = media;
                cameraTrackRef.current = media.getVideoTracks()[0];
                setStream(media);
            })
            .catch((error) => {
                console.error(error);
                setMediaError(error?.name === 'NotAllowedError' ? 'permission' : 'device');
            });
    }, [roomId]);

    // Announce ourselves only once the peer is dialable (see RoomContext).
    useEffect(() => {
        if (!me) return;
        ws.emit('join-room', { roomId, userId: targetUserId, peerId: me.id });
    }, [me, roomId, targetUserId]);

    useEffect(() => {
        if (!me || !stream) return;

        const attach = (call, peerId) => {
            callsRef.current.push(call);
            call.on('stream', (userVideoStream) => {
                pendingCallsRef.current.delete(peerId);
                dispatch(addPeer({ peerId, stream: userVideoStream }));
            });
        };

        const dial = (peerId, attempt = 0) => {
            const call = me.call(peerId, stream);
            if (call) {
                pendingCallsRef.current.set(peerId, attempt);
                attach(call, peerId);
            }
        };

        const onUserJoined = ({ peerId }) => dial(peerId);

        const onIncomingCall = (call) => {
            call.answer(stream);
            attach(call, call.peer);
        };

        // The broker can still report the freshly announced peer as unknown;
        // back off and dial again instead of ringing forever.
        const onPeerError = (err) => {
            if (err.type !== 'peer-unavailable') return;
            const peerId = err.message?.match(/peer\s(\S+)/)?.[1];
            const attempt = pendingCallsRef.current.get(peerId);
            if (peerId === undefined || attempt === undefined || attempt >= 4) return;
            setTimeout(() => dial(peerId, attempt + 1), 1000);
        };

        ws.on('user-joined', onUserJoined);
        me.on('call', onIncomingCall);
        me.on('error', onPeerError);

        return () => {
            ws.off('user-joined', onUserJoined);
            me.off('call', onIncomingCall);
            me.off('error', onPeerError);
        };
    }, [me, stream]);

    useEffect(() => {
        const onDisconnected = (peerId) => {
            dispatch(removePeer(peerId));
            setToast(`${partner?.name || 'Participant'} left the call`);
        };
        ws.on('user-disconnected', onDisconnected);
        return () => ws.off('user-disconnected', onDisconnected);
    }, [partner]);

    // Tear everything down when leaving the room.
    useEffect(() => {
        return () => {
            streamRef.current?.getTracks().forEach((track) => track.stop());
            callsRef.current.forEach((call) => call.close?.());
            callsRef.current = [];
            dispatch(clearPeers());
        };
    }, []);

    /* ------------------------------- timers ------------------------------- */

    useEffect(() => {
        if (!connected) return;
        const timer = setInterval(() => setDuration((value) => value + 1), 1000);
        return () => clearInterval(timer);
    }, [connected]);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const wakeControls = useCallback(() => {
        setControlsVisible(true);
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => setControlsVisible(false), IDLE_TIMEOUT);
    }, []);

    useEffect(() => {
        if (!connected) {
            setControlsVisible(true);
            clearTimeout(idleTimerRef.current);
            return;
        }
        wakeControls();
        return () => clearTimeout(idleTimerRef.current);
    }, [connected, wakeControls]);

    /* ------------------------------ controls ------------------------------ */

    const toggleMic = () => {
        const tracks = streamRef.current?.getAudioTracks() || [];
        const next = !micOn;
        tracks.forEach((track) => (track.enabled = next));
        setMicOn(next);
    };

    const toggleCam = () => {
        const tracks = streamRef.current?.getVideoTracks() || [];
        const next = !camOn;
        tracks.forEach((track) => (track.enabled = next));
        setCamOn(next);
    };

    const replaceOutgoingVideo = (track) => {
        callsRef.current.forEach((call) => {
            const sender = call.peerConnection?.getSenders?.().find((s) => s.track?.kind === 'video');
            sender?.replaceTrack(track);
        });
    };

    const stopSharing = useCallback(() => {
        const camTrack = cameraTrackRef.current;
        if (camTrack) {
            replaceOutgoingVideo(camTrack);
            const media = streamRef.current;
            media?.getVideoTracks().forEach((track) => {
                if (track !== camTrack) {
                    track.stop();
                    media.removeTrack(track);
                }
            });
            if (media && !media.getVideoTracks().includes(camTrack)) {
                media.addTrack(camTrack);
            }
            setStream(new MediaStream(media?.getTracks() || []));
        }
        setSharing(false);
    }, []);

    const toggleShare = async () => {
        if (sharing) {
            stopSharing();
            return;
        }
        try {
            const display = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const screenTrack = display.getVideoTracks()[0];
            replaceOutgoingVideo(screenTrack);
            screenTrack.addEventListener('ended', stopSharing);

            const media = streamRef.current;
            media?.getVideoTracks().forEach((track) => media.removeTrack(track));
            media?.addTrack(screenTrack);
            setStream(new MediaStream(media?.getTracks() || []));
            setSharing(true);
        } catch (error) {
            console.error(error);
        }
    };

    const endCall = () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        callsRef.current.forEach((call) => call.close?.());
        callsRef.current = [];
        dispatch(clearPeers());
        window.close();
        navigate('/');
    };

    // The callee turned us down: say so, then close the room window.
    useEffect(() => {
        const callerId = currentUser?._id;
        if (!callerId) return;

        const onDeclined = ({ room_id: declinedRoom, declined_by: declinedBy }) => {
            if (declinedRoom && declinedRoom !== roomId) return;
            setToast(`${declinedBy?.name || 'They'} declined the call`);
            setTimeout(endCall, 1500);
        };

        ws.on(`callDeclined.${callerId}`, onDeclined);
        return () => ws.off(`callDeclined.${callerId}`, onDeclined);
    }, [currentUser, roomId]);

    /* -------------------------------- stage ------------------------------- */

    const mainRemote = remotePeers[0];
    const showLocalAsMain = swapped && connected;
    const gridMode = remotePeers.length > 1;

    const statusText = mediaError
        ? mediaError === 'permission'
            ? 'Camera and microphone blocked'
            : 'No camera or microphone found'
        : connected
          ? formatDuration(duration)
          : 'Ringing…';

    return (
        <div
            onMouseMove={connected ? wakeControls : undefined}
            onTouchStart={connected ? wakeControls : undefined}
            className="fixed inset-0 z-50 select-none overflow-hidden bg-[#0b0c0f] font-sans text-white">
            {/* stage */}
            <div className="absolute inset-0">
                {gridMode ? (
                    <div className="grid h-full w-full auto-rows-fr grid-cols-1 gap-2 p-2 sm:grid-cols-2">
                        {remotePeers.map(([peerId, peer]) => (
                            <div key={peerId} className="overflow-hidden rounded-2xl">
                                <VideoTile
                                    stream={peer?.stream}
                                    name={partner?.name}
                                    avatar={partner?.avatar}
                                    label={partner?.name || 'Participant'}
                                />
                            </div>
                        ))}
                    </div>
                ) : connected ? (
                    <VideoTile
                        stream={showLocalAsMain ? stream : mainRemote?.[1]?.stream}
                        muted={showLocalAsMain}
                        mirrored={showLocalAsMain && !sharing}
                        name={showLocalAsMain ? currentUser?.name : partner?.name}
                        avatar={showLocalAsMain ? currentUser?.avatar : partner?.avatar}
                        showLabel={false}
                        objectFit={sharing && showLocalAsMain ? 'contain' : 'cover'}
                    />
                ) : (
                    <CallingStage partner={partner} error={mediaError} />
                )}
            </div>

            {/* top bar */}
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/70 to-transparent p-4 transition-all duration-300 sm:p-5 ${
                    controlsVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}>
                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={endCall}
                        title="Leave call"
                        className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
                        <ChevronDownIcon />
                    </button>

                    <div className="min-w-0 text-center">
                        <p className="truncate text-base font-semibold sm:text-lg">
                            {partner?.name || 'Video call'}
                        </p>
                        <p className="text-xs text-white/60 tabular-nums">{statusText}</p>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
                        <UsersIcon className="h-4 w-4 text-white/80" />
                        <span className="text-xs font-medium tabular-nums">{remotePeers.length + 1}</span>
                    </div>
                </div>
            </div>

            {/* self view */}
            {stream && (
                <SelfView
                    stream={showLocalAsMain ? mainRemote?.[1]?.stream : stream}
                    name={showLocalAsMain ? partner?.name : currentUser?.name}
                    avatar={showLocalAsMain ? partner?.avatar : currentUser?.avatar}
                    micOff={!showLocalAsMain && !micOn}
                    onSwap={() => connected && setSwapped((value) => !value)}
                    hidden={gridMode}
                />
            )}

            {/* toast */}
            <div
                className={`pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center transition-all duration-300 ${
                    toast ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}>
                <span className="rounded-full bg-black/60 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md">
                    {toast}
                </span>
            </div>

            <CallControls
                micOn={micOn}
                camOn={camOn}
                sharing={sharing}
                onToggleMic={toggleMic}
                onToggleCam={toggleCam}
                onToggleShare={toggleShare}
                onSwap={() => setSwapped((value) => !value)}
                onEnd={endCall}
                canShare={!!navigator.mediaDevices?.getDisplayMedia}
                canSwap={connected && !gridMode}
                visible={controlsVisible}
            />
        </div>
    );
}

function CallingStage({ partner, error }) {
    const initial = partner?.name?.charAt(0)?.toUpperCase() || '?';

    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_35%,#26303f_0%,#12141a_55%,#0b0c0f_100%)]">
            <div className="relative flex items-center justify-center">
                {!error && (
                    <>
                        <span className="call-ring absolute h-32 w-32 rounded-full border border-white/20 sm:h-40 sm:w-40" />
                        <span
                            className="call-ring absolute h-32 w-32 rounded-full border border-white/20 sm:h-40 sm:w-40"
                            style={{ animationDelay: '1s' }}
                        />
                    </>
                )}
                {partner?.avatar ? (
                    <img
                        src={partner.avatar}
                        alt={partner.name}
                        className="h-28 w-28 rounded-full object-cover ring-4 ring-white/10 sm:h-32 sm:w-32"
                    />
                ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/10 text-4xl font-semibold ring-4 ring-white/10 sm:h-32 sm:w-32">
                        {initial}
                    </div>
                )}
            </div>

            <h2 className="mt-8 text-2xl font-semibold">{partner?.name || 'Connecting'}</h2>
            <p className="mt-2 text-sm text-white/60">
                {error === 'permission'
                    ? 'Allow camera and microphone access to join'
                    : error === 'device'
                      ? 'We could not find a camera or microphone'
                      : 'Ringing…'}
            </p>
        </div>
    );
}
