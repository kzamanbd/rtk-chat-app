import { useGetMessagesQuery } from 'features/messages/messagesApi';
import Blank from './Blank';
import ChatHead from './ChatHead';
import Messages from './Messages';
import Options from './Options';

export default function ChatBody({ conversationId }) {
	const {
		data: { messages = [] } = {},
		isError,
		isLoading
	} = useGetMessagesQuery(conversationId, {
		refetchOnMountOrArgChange: true
	});

	let content = null;

	if (isLoading) {
		content = <div>Loading...</div>;
	}
	if (!isLoading && messages?.length === 0 && !isError) {
		content = <Blank />;
	}
	if (!isLoading && messages?.length > 0) {
		content = (
			<>
				<Messages messages={messages} />
				<Options />
			</>
		);
	}

	return (
		<div className="w-full lg:col-span-2 lg:block">
			<div className="w-full grid conversation-row-grid">
				<ChatHead
					avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
					name="Kamruzzaman"
				/>
				{content}
			</div>
		</div>
	);
}
