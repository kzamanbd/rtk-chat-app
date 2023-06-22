import { useGetUsersQuery } from '@/features/messages/messagesApi';
import dateFormat from '@/utils/dateFormat';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import UserAvatar from './UserAvatar';

export default function ContactsList() {
	const { data: contacts } = useGetUsersQuery();
	const navigate = useNavigate();
	const handleContactClick = (contact) => {
		if (contact.conversationId) {
			navigate(`/${contact.conversationId}`);
		} else {
			console.log('contact', contact);
		}
	};

	return (
		<SimpleBar className="chat-users pt-2 pr-4">
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
