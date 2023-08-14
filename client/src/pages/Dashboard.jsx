import MessageBody from '@/components/MessageBody';
import MessageSidebar from '@/components/MessageSidebar';
import NewMessageBody from '@/components/NewMessageBody';
import NoMessage from '@/components/NoMessage';
import { useCreateConversationMutation, useSendMessageMutation } from '@/features/messages/messagesApi';

import { toggleSidebarList } from '@/features/messages/messagesSlice';
import useQuery from '@/hooks/useQuery';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function Dashboard() {
	const query = useQuery();
	const dispatch = useDispatch();
	const { conversationId } = useParams();
	const navigate = useNavigate();

	const inputRef = useRef(null);
	const [sendMessage, { isLoading }] = useSendMessageMutation();
	const [createConversation, { isLoading: isCreatingConversation }] = useCreateConversationMutation();
	const {
		messages: { showSidebarList, selectedNewUser },
		auth: { currentUser }
	} = useSelector((state) => state);

	const [textMessage, setTextMessage] = useState('');
	const [newChat, setNewChat] = useState(false);

	const sendMessageHandler = async (e) => {
		e.preventDefault();

		if (!textMessage.trim()) {
			return;
		}
		const data = {
			message: textMessage,
			senderId: currentUser._id,
			senderName: currentUser.name
		};

		if (!conversationId && newChat && selectedNewUser) {
			data.userId = selectedNewUser._id;
			const { conversation } = await createConversation(data).unwrap();
			navigate(`/${conversation._id}`);
		} else {
			data.senderName = currentUser.name;
			data.conversationId = conversationId;
			await sendMessage(data).unwrap();
			scrollToBottom();
		}
		setTextMessage('');
	};

	const scrollToBottom = () => {
		inputRef.current.focus();
		setTimeout(() => {
			const element = document.querySelector('.chat-conversation-box');
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'end'
			});
		});
	};

	useEffect(() => {
		if (query.get('newChat')) {
			setNewChat(true);
			inputRef.current.focus();
		}
	}, [query]);

	useEffect(() => {
		if (conversationId) scrollToBottom();
	}, [conversationId]);

	return (
		<div className="max-w-7xl mx-auto chat-wrapper overflow-hidden">
			<MessageSidebar conversationId={conversationId} />
			<div
				className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${
					showSidebarList && '!block xl:!hidden'
				}`}
				onClick={() => dispatch(toggleSidebarList())}></div>

			<div className="card flex-1 p-0">
				{(!conversationId || !selectedNewUser) && !newChat && <NoMessage />}

				<div className="relative h-full lg:border-r">
					{conversationId && <MessageBody conversationId={conversationId} />}
					{selectedNewUser?._id && newChat && <NewMessageBody chatHead={selectedNewUser} />}
					<div className="absolute bottom-0 left-0 w-full p-4 bg-white">
						<div className="w-full items-center space-x-3 sm:flex">
							<form onSubmit={sendMessageHandler} className="relative flex-1">
								<input
									ref={inputRef}
									id="input-message"
									className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 py-2 focus:outline-none"
									placeholder="Type a message"
									value={textMessage}
									onChange={(e) => setTextMessage(e.target.value)}
								/>
								<button
									type="button"
									className="absolute left-4 top-1/2 -translate-y-1/2 hover:text-primary">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5">
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
								</button>
								<button
									type="submit"
									disabled={isLoading || isCreatingConversation}
									className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5">
										<path
											d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z"
											stroke="currentColor"
											strokeWidth="1.5"></path>
										<path
											opacity="0.5"
											d="M6 18L21 3"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
									</svg>
								</button>
							</form>
							<div className="hidden items-center space-x-3 py-3 sm:block sm:py-0">
								<button
									type="button"
									className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5">
										<path
											d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V8Z"
											stroke="currentColor"
											strokeWidth="1.5"></path>
										<path
											opacity="0.5"
											d="M13.5 8L17 8"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											opacity="0.5"
											d="M13.5 11L17 11"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											opacity="0.5"
											d="M7 8L9 8"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											opacity="0.5"
											d="M7 11L9 11"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											opacity="0.5"
											d="M20 10V11C20 15.4183 16.4183 19 12 19M4 10V11C4 15.4183 7.58172 19 12 19M12 19V22"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											d="M22 2L2 22"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
									</svg>
								</button>
								<button
									type="button"
									className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5">
										<path
											opacity="0.5"
											d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"></path>
									</svg>
								</button>
								<button
									type="button"
									className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5">
										<circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
										<path
											opacity="0.5"
											d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z"
											stroke="currentColor"
											strokeWidth="1.5"></path>
										<path
											d="M19 10H18"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
									</svg>
								</button>
								<button
									type="button"
									className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 opacity-70">
										<circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"></circle>
										<circle
											opacity="0.5"
											cx="12"
											cy="12"
											r="2"
											stroke="currentColor"
											strokeWidth="1.5"></circle>
										<circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"></circle>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
