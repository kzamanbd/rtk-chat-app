const base = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
};

export function MicIcon({ className = 'h-6 w-6' }) {
    return (
        <svg {...base} className={className}>
            <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.6" />
            <path
                d="M19 11v1a7 7 0 0 1-14 0v-1M12 19v3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function MicOffIcon({ className = 'h-6 w-6' }) {
    return (
        <svg {...base} className={className}>
            <path
                d="M15 9.5V6a3 3 0 0 0-5.9-.7M9 10v2a3 3 0 0 0 4.8 2.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M19 11v1a7 7 0 0 1-10.6 6M5 11v1a7 7 0 0 0 2 4.9M12 19v3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path d="M4 3l16 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

export function VideoIcon({ className = 'h-6 w-6' }) {
    return (
        <svg {...base} className={className}>
            <rect x="2.5" y="6" width="13" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path
                d="M15.5 10.5l3.6-1.8c1.1-.6 1.9-.2 1.9 1v4.6c0 1.2-.8 1.6-1.9 1L15.5 13.5v-3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function VideoOffIcon({ className = 'h-6 w-6' }) {
    return (
        <svg {...base} className={className}>
            <path
                d="M15.5 9.2V9a3 3 0 0 0-3-3H6.8M2.6 7.4A3 3 0 0 0 2.5 8v7a3 3 0 0 0 3 3h7a3 3 0 0 0 2.9-2.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M15.5 12.4l3.6 1.9c1.1.6 1.9.2 1.9-1V9.7c0-1.2-.8-1.6-1.9-1l-2.2 1.1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

export function ScreenShareIcon({ className = 'h-6 w-6' }) {
    return (
        <svg {...base} className={className}>
            <rect x="2.5" y="4" width="19" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path
                d="M12 13.5v-6m0 0L9.6 9.9M12 7.5l2.4 2.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function EndCallIcon({ className = 'h-6 w-6' }) {
    return (
        <svg {...base} className={className}>
            <path
                d="M2.6 13.3c-.6-1 .2-2.2 1.2-2.8C5.8 9.3 8.7 8.6 12 8.6s6.2.7 8.2 1.9c1 .6 1.8 1.8 1.2 2.8l-.9 1.5c-.5.9-1.6 1.1-2.5.6l-1.9-1a1.9 1.9 0 0 1-1-1.9l.1-1c-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4l.1 1c.1.8-.3 1.5-1 1.9l-1.9 1c-.9.5-2 .3-2.5-.6l-.9-1.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function PhoneIcon({ className = 'h-6 w-6' }) {
    return (
        <svg {...base} className={className}>
            <path
                d="M7.7 4.3 9.3 7c.3.6.2 1.3-.3 1.7l-1.3 1c-.3.3-.4.7-.3 1a11 11 0 0 0 4.9 4.9c.3.1.7 0 1-.3l1-1.3c.4-.5 1.1-.6 1.7-.3l2.7 1.6c.7.4.9 1.3.5 2l-.8 1.2c-.6.9-1.7 1.4-2.8 1.1C11.6 18.5 5.5 12.4 4.4 6.4c-.2-1.1.2-2.2 1.1-2.8l1.2-.8c.7-.4 1.6-.2 2 .5Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function ChevronDownIcon({ className = 'h-5 w-5' }) {
    return (
        <svg {...base} className={className}>
            <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SwapIcon({ className = 'h-4 w-4' }) {
    return (
        <svg {...base} className={className}>
            <path
                d="M4 8h13m0 0-3.2-3.2M17 8l-3.2 3.2M20 16H7m0 0 3.2 3.2M7 16l3.2-3.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function UsersIcon({ className = 'h-5 w-5' }) {
    return (
        <svg {...base} className={className}>
            <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path
                d="M16 5.4a3.2 3.2 0 0 1 0 6M17.5 14.2A5.5 5.5 0 0 1 20.5 19"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}
