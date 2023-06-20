import { useSelector } from 'react-redux';

export default function MessageBody() {
	const { selectedUser } = useSelector((state) => state.messages);
	const loginUser = {
		id: 0,
		name: 'Kamruzzaman',
		path: 'avatar-1.png',
		designation: 'Software Developer'
	};
	return (
		<div className="relative h-full overflow-auto sm:h-[calc(100vh_-_150px)]">
			<div className="chat-conversation-box">
				<div className="m-6 mt-0 block">
					<h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
						<span className="relative top-2 bg-white px-3 dark:bg-[#0e1726]">
							Today, {selectedUser.time}
						</span>
					</h4>
				</div>
				{selectedUser.messages.map((message) => (
					<div
						key={Math.random() * 60}
						className={`flex items-start gap-3 ${
							selectedUser.userId === message.fromUserId && 'justify-end'
						}`}>
						<div className={`flex-none ${selectedUser.userId === message.fromUserId && 'order-2'}`}>
							{selectedUser.userId === message.fromUserId && (
								<img
									src={`/images/users/${loginUser.path}`}
									className="h-10 w-10 rounded-full object-cover"
								/>
							)}
							{selectedUser.userId !== message.fromUserId && (
								<img
									src={`/images/users/${selectedUser.path}`}
									className="h-10 w-10 rounded-full object-cover"
								/>
							)}
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<div
									className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${
										message.fromUserId == selectedUser.userId
											? 'rounded-br-none  !bg-primary text-white'
											: 'rounded-bl-none'
									}`}>
									{message.text}
								</div>
								<div className={`${selectedUser.userId === message.fromUserId && 'hidden'}`}>
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
							<div
								className={`text-white-dark text-xs ${
									selectedUser.userId === message.fromUserId && 'text-right'
								}`}>
								{message.time ? message.time : '5h ago'}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
