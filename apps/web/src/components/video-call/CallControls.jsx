import {
    EndCallIcon,
    MicIcon,
    MicOffIcon,
    ScreenShareIcon,
    SwapIcon,
    VideoIcon,
    VideoOffIcon
} from './CallIcons';

function ControlButton({ active, danger, label, onClick, children, className = '' }) {
    const tone = danger
        ? 'bg-[#f02849] text-white hover:bg-[#d81f3d]'
        : active
          ? 'bg-white text-[#1c1e21] hover:bg-white/90'
          : 'bg-white/10 text-white hover:bg-white/20';

    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            aria-label={label}
            aria-pressed={danger ? undefined : !!active}
            className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 sm:h-14 sm:w-14 ${tone} ${className}`}>
            {children}
        </button>
    );
}

export default function CallControls({
    micOn,
    camOn,
    sharing,
    onToggleMic,
    onToggleCam,
    onToggleShare,
    onSwap,
    onEnd,
    canShare = true,
    canSwap = false,
    visible = true
}) {
    return (
        <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center pb-6 transition-all duration-300 sm:pb-8 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/40 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl sm:gap-3 sm:p-3">
                <ControlButton active={!micOn} label={micOn ? 'Mute' : 'Unmute'} onClick={onToggleMic}>
                    {micOn ? <MicIcon /> : <MicOffIcon />}
                </ControlButton>

                <ControlButton active={!camOn} label={camOn ? 'Turn camera off' : 'Turn camera on'} onClick={onToggleCam}>
                    {camOn ? <VideoIcon /> : <VideoOffIcon />}
                </ControlButton>

                {canShare && (
                    <ControlButton
                        active={sharing}
                        label={sharing ? 'Stop sharing' : 'Share screen'}
                        onClick={onToggleShare}
                        className="hidden sm:flex">
                        <ScreenShareIcon />
                    </ControlButton>
                )}

                {canSwap && (
                    <ControlButton label="Swap views" onClick={onSwap} className="hidden sm:flex">
                        <SwapIcon className="h-5 w-5" />
                    </ControlButton>
                )}

                <ControlButton danger label="End call" onClick={onEnd} className="ml-1 w-16 sm:w-20">
                    <EndCallIcon className="h-7 w-7 rotate-[135deg]" />
                </ControlButton>
            </div>
        </div>
    );
}
