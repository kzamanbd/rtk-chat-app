import Message from './Message';

export default function Messages({ messages = [], user }) {
	return (
		<div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
			<ul className="space-y-2">
				{messages.map((message) => {
					const { message: lastMessage, _id, userInfo } = message || {};

					const justify = userInfo._id === user._id ? 'end' : 'start';

					return <Message key={_id} justify={justify} message={lastMessage} />;
				})}
			</ul>
		</div>
	);
}
