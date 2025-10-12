import dateFormat from '@/utils/dateFormat';
import UserAvatar from './UserAvatar';

export default function Message({ currentUserId, message, userInfo, createdAt, isTyping }) {
    return (
        <div className={`flex items-start gap-3 ${currentUserId === userInfo._id && 'justify-end'}`}>
            <div className={`flex-none ${currentUserId === userInfo._id && 'order-2'}`}>
                <UserAvatar avatar={userInfo.avatar} name={userInfo.name} height="10" width="10" />
            </div>
            <div className="space-y-2">
                <div
                    className={`flex items-center gap-3 ${
                        currentUserId === userInfo._id ? 'justify-end' : 'justify-start'
                    } `}>
                    <div
                        className={`text-justify rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${
                            userInfo._id == currentUserId
                                ? 'rounded-br-none  !bg-primary text-white'
                                : 'rounded-bl-none'
                        }`}>
                        {message}
                    </div>
                    <div className={`${currentUserId === userInfo._id && 'hidden'}`}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 hover:text-primary">
                            <circle
                                opacity="0.5"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="1.5"></circle>
                            <path
                                d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"></path>
                            <path
                                d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
                                fill="currentColor"></path>
                            <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="currentColor"></ellipse>
                        </svg>
                    </div>
                </div>
                <div className={`text-white-dark text-xs ${currentUserId === userInfo._id && 'text-right'}`}>
                    {dateFormat(createdAt).fromNow()}
                </div>
                {isTyping && (
                    <div className="flex-none">
                        <div className="typing-indicator">
                            <img className="w-20" src="/images/typing-dots.gif" alt="gif" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
