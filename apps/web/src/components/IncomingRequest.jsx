import ringtone from '@/assets/ringtone.mp3';
import { EndCallIcon, VideoIcon } from '@/components/video-call/CallIcons';
import openCallWindow from '@/utils/openCallWindow';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';

export default function IncomingRequest({ isOpen, closeModal, request }) {
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isOpen) {
            audio.loop = true;
            audio.volume = 0.6;
            // Autoplay can be rejected until the user interacts with the page.
            audio.play().catch(() => {});
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isOpen]);

    const requestAccepted = () => {
        audioRef.current?.pause();
        // Open the room pointed at the caller — target_user_id is us — and flag
        // the window as the answering side so it does not ring back.
        openCallWindow(`/room/${request.room_id}/${request.caller?._id}?incoming=1`);
    };

    const caller = request?.caller;
    const initial = caller?.name?.charAt(0)?.toUpperCase() || '?';

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <audio ref={audioRef} src={ringtone} preload="auto" />

                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-sm overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_50%_20%,#2b3547_0%,#161922_60%,#0f1116_100%)] px-6 pb-8 pt-10 text-center shadow-2xl shadow-black/60 ring-1 ring-white/10">
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                                    Incoming video call
                                </p>

                                <div className="relative mx-auto mt-8 flex h-28 w-28 items-center justify-center">
                                    <span className="call-ring absolute h-28 w-28 rounded-full border border-white/25" />
                                    <span
                                        className="call-ring absolute h-28 w-28 rounded-full border border-white/25"
                                        style={{ animationDelay: '1s' }}
                                    />
                                    {caller?.avatar ? (
                                        <img
                                            src={caller.avatar}
                                            alt={caller.name}
                                            className="h-24 w-24 rounded-full object-cover ring-4 ring-white/10"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-3xl font-semibold text-white ring-4 ring-white/10">
                                            {initial}
                                        </div>
                                    )}
                                </div>

                                <Dialog.Title as="h3" className="mt-6 text-xl font-semibold text-white">
                                    {caller?.name || 'Unknown caller'}
                                </Dialog.Title>
                                <p className="mt-1 text-sm text-white/60">is calling you…</p>

                                <div className="mt-10 flex items-center justify-center gap-12">
                                    <div className="flex flex-col items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            aria-label="Decline call"
                                            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f02849] text-white shadow-lg shadow-red-900/40 transition hover:bg-[#d81f3d] active:scale-90">
                                            <EndCallIcon className="h-7 w-7 rotate-[135deg]" />
                                        </button>
                                        <span className="text-xs text-white/60">Decline</span>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={requestAccepted}
                                            aria-label="Accept call"
                                            className="call-accept flex h-16 w-16 items-center justify-center rounded-full bg-[#31a24c] text-white shadow-lg shadow-green-900/40 transition hover:bg-[#2b9144] active:scale-90">
                                            <VideoIcon className="h-7 w-7" />
                                        </button>
                                        <span className="text-xs text-white/60">Accept</span>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
