import Message from '@/components/Message';
import { useGetMessagesQuery } from '@/features/messages/messagesApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageHead from './MessageHead';

export default function MessageBody({ conversationId }) {
	const { currentUser } = useSelector((state) => state.auth);
	const { data: { messages = [], chatHead = {} } = {}, isLoading } = useGetMessagesQuery(conversationId, {
		refetchOnMountOrArgChange: true,
		skip: !conversationId
	});

	console.log(isLoading);

	useEffect(() => {
		setTimeout(() => {
			const element = document.querySelector('.chat-conversation-box');
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'end'
			});
			// focus on the input field
			document.getElementById('input-message').focus();
		});
	}, [messages]);

	return (
		<>
			<MessageHead chatHead={chatHead} />
			<div className="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
			<div className="relative h-[calc(100vh_-_75px)] overflow-auto sm:h-[calc(100vh_-_150px)]">
				<div className="chat-conversation-box">
					<div className="m-6 mt-0 block">
						<h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
							<span className="relative top-2 bg-white px-3 dark:bg-[#0e1726]">Today, 5:30 PM</span>
						</h4>
					</div>
					{messages.map((message) => (
						<Message
							key={message._id}
							currentUserId={currentUser._id}
							message={message.message}
							userInfo={message.userInfo}
						/>
					))}
				</div>
			</div>
		</>
	);
}
