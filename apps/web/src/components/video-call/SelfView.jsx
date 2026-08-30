import { useCallback, useEffect, useRef, useState } from 'react';
import VideoTile from './VideoTile';

const MARGIN = 16;
const DOCK_BOTTOM = 120; // keep clear of the control dock

/**
 * Messenger-style picture-in-picture self view: drag it anywhere, it snaps to
 * the nearest corner on release. Click (without dragging) swaps it with the
 * main stage.
 */
export default function SelfView({ stream, name, avatar, micOff, onSwap, hidden = false }) {
    const boxRef = useRef(null);
    const dragState = useRef(null);
    const [pos, setPos] = useState(null);
    const [dragging, setDragging] = useState(false);

    const snap = useCallback((left, top) => {
        const box = boxRef.current;
        if (!box) return { left, top };

        const { offsetWidth: w, offsetHeight: h } = box;
        const maxLeft = window.innerWidth - w - MARGIN;
        const maxTop = window.innerHeight - h - MARGIN;

        const topLimit = MARGIN + 72; // below the call header
        const bottomSlot = window.innerHeight - h - DOCK_BOTTOM;

        const snappedLeft = left + w / 2 < window.innerWidth / 2 ? MARGIN : maxLeft;
        const snappedTop = top + h / 2 < window.innerHeight / 2 ? topLimit : bottomSlot;

        return {
            left: Math.min(Math.max(snappedLeft, MARGIN), Math.max(maxLeft, MARGIN)),
            top: Math.min(Math.max(snappedTop, topLimit), Math.max(maxTop, topLimit))
        };
    }, []);

    // Initial placement: bottom-right, above the dock.
    useEffect(() => {
        const place = () => {
            const box = boxRef.current;
            if (!box) return;
            setPos({
                left: window.innerWidth - box.offsetWidth - MARGIN,
                top: window.innerHeight - box.offsetHeight - DOCK_BOTTOM
            });
        };
        place();
        window.addEventListener('resize', place);
        return () => window.removeEventListener('resize', place);
    }, []);

    const onPointerDown = (e) => {
        const box = boxRef.current;
        if (!box) return;
        box.setPointerCapture(e.pointerId);
        dragState.current = {
            startX: e.clientX,
            startY: e.clientY,
            originLeft: pos?.left ?? 0,
            originTop: pos?.top ?? 0,
            moved: false
        };
        setDragging(true);
    };

    const onPointerMove = (e) => {
        const drag = dragState.current;
        if (!drag) return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.moved = true;
        setPos({ left: drag.originLeft + dx, top: drag.originTop + dy });
    };

    const onPointerUp = (e) => {
        const drag = dragState.current;
        dragState.current = null;
        setDragging(false);
        if (!drag) return;
        boxRef.current?.releasePointerCapture?.(e.pointerId);

        if (!drag.moved) {
            onSwap?.();
            return;
        }
        setPos((current) => (current ? snap(current.left, current.top) : current));
    };

    return (
        <div
            ref={boxRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={pos ? { left: pos.left, top: pos.top } : { right: MARGIN, bottom: DOCK_BOTTOM }}
            className={`absolute z-20 w-28 touch-none select-none overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60 sm:w-40 ${
                dragging ? 'scale-105 cursor-grabbing' : 'cursor-grab transition-all duration-300 ease-out'
            } ${hidden ? 'pointer-events-none scale-90 opacity-0' : 'opacity-100'}`}>
            <div className="aspect-[3/4] w-full">
                <VideoTile
                    stream={stream}
                    muted
                    mirrored
                    name={name}
                    avatar={avatar}
                    micOff={micOff}
                    label="You"
                    className="rounded-2xl"
                />
            </div>
        </div>
    );
}
