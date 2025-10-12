import { useGetUsersQuery } from '@/features/messages/messagesApi';
import { setSelectedNewUser } from '@/features/messages/messagesSlice';
import dateFormat from '@/utils/dateFormat';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import UserAvatar from './UserAvatar';
import UserListSkeleton from './shared/UserListSkeleton';

export default function ContactsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: contacts, isLoading } = useGetUsersQuery();

    const handleContactClick = (contact) => {
        if (contact.conversationId) {
            navigate(`/${contact.conversationId}`);
        } else {
            dispatch(setSelectedNewUser(contact));
            navigate('/?newChat=true');
        }
    };

    if (isLoading) {
        return <UserListSkeleton />;
    }

    return (
        <SimpleBar className="chat-users pt-2">
            {contacts?.users?.map((contact) => (
                <button
                    type="button"
                    key={contact._id}
                    className="chat-user-item border-b"
                    onClick={() => handleContactClick(contact)}>
                    <div className="flex-1">
                        <div className="flex items-center">
                            <div className="relative flex-shrink-0">
                                <UserAvatar avatar={contact.avatar} name={contact?.name} />

                                {contact.active && (
                                    <div className="absolute bottom-0 right-0">
                                        <div className="h-4 w-4 rounded-full bg-success"></div>
                                    </div>
                                )}
                            </div>
                            <div className="mx-3 text-left">
                                <p className="mb-1 font-semibold w-32 truncate">{contact.name}</p>
                                <p className="text-white-dark text-xs">
                                    Last Active: {dateFormat(contact.createdAt).format('LLL')}
                                </p>
                            </div>
                        </div>
                    </div>
                </button>
            ))}
        </SimpleBar>
    );
}
