import moment from 'moment';
import ChatItem from './ChatItem';

export default function ChatItems({ conversations, currentUser }) {
	const getParticipant = (conversation, userId) => {
		if (conversation.toUser._id === userId) {
			return conversation.fromUser;
		} else {
			return conversation.toUser;
		}
	};

	return (
		<ul>
			<li>
				{conversations.map((conversation) => (
					<ChatItem
						key={conversation._id}
						avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
						name={getParticipant(conversation, currentUser._id).name}
						lastMessage={conversation.lastMessage}
						lastTime={moment(conversation.updatedAt).fromNow()}
						conversationId={conversation._id}
					/>
				))}
			</li>
		</ul>
	);
}
