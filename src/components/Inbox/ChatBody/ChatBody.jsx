import { useGetMessagesQuery } from 'features/messages/messagesApi';
import { useSelector } from 'react-redux';
import Blank from './Blank';
import ChatHead from './ChatHead';
import Messages from './Messages';
import Options from './Options';

export default function ChatBody({ conversationId }) {
	const { currentUser } = useSelector((state) => state.auth);
	const {
		data: { messages = [], chatHead = {} } = {},
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
				<Messages messages={messages} user={currentUser} />
				<Options conversationId={conversationId} currentUserId={currentUser._id} />
			</>
		);
	}

	return (
		<div className="w-full lg:col-span-2 lg:block">
			<div className="w-full grid conversation-row-grid">
				<ChatHead
					avatar={`https://ui-avatars.com/api/?background=random&name=${chatHead.name}}`}
					name={chatHead.name}
				/>
				{content}
			</div>
		</div>
	);
}
