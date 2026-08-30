import { useEffect, useRef, useState } from 'react';
import { MicOffIcon } from './CallIcons';

/**
 * Single participant tile. Falls back to an avatar bubble when the video
 * track is off/muted, mirrors the local preview, and shows a name chip.
 */
export default function VideoTile({
    stream,
    muted = false,
    mirrored = false,
    name = '',
    avatar,
    micOff = false,
    label,
    showLabel = true,
    className = '',
    objectFit = 'cover'
}) {
    const videoRef = useRef(null);
    const [hasVideo, setHasVideo] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (video && video.srcObject !== stream) {
            video.srcObject = stream || null;
        }
    }, [stream]);

    useEffect(() => {
        if (!stream) {
            setHasVideo(false);
            return;
        }

        const track = stream.getVideoTracks()[0];
        if (!track) {
            setHasVideo(false);
            return;
        }

        const sync = () => setHasVideo(track.enabled && !track.muted && track.readyState === 'live');
        sync();

        track.addEventListener('mute', sync);
        track.addEventListener('unmute', sync);
        track.addEventListener('ended', sync);
        // `enabled` fires no event, so poll it cheaply while the tile is mounted
        const timer = setInterval(sync, 800);

        return () => {
            track.removeEventListener('mute', sync);
            track.removeEventListener('unmute', sync);
            track.removeEventListener('ended', sync);
            clearInterval(timer);
        };
    }, [stream]);

    const initial = name?.charAt(0)?.toUpperCase() || '?';

    return (
        <div className={`relative h-full w-full overflow-hidden bg-[#1c1f24] ${className}`}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={muted}
                className={`h-full w-full transition-opacity duration-300 ${
                    objectFit === 'contain' ? 'object-contain' : 'object-cover'
                } ${mirrored ? '-scale-x-100' : ''} ${hasVideo ? 'opacity-100' : 'opacity-0'}`}
            />

            {!hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#242830] to-[#15171c]">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={name}
                            className="h-1/3 max-h-24 min-h-12 w-auto rounded-full object-cover ring-2 ring-white/10"
                        />
                    ) : (
                        <div className="flex aspect-square h-1/3 max-h-24 min-h-12 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold text-white/90 ring-2 ring-white/10">
                            {initial}
                        </div>
                    )}
                </div>
            )}

            {showLabel && (label || name) && (
                <div className="absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-md">
                    {micOff && <MicOffIcon className="h-3.5 w-3.5 shrink-0 text-red-400" />}
                    <span className="truncate text-xs font-medium text-white/90">{label || name}</span>
                </div>
            )}
        </div>
    );
}
