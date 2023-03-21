import moment from 'moment';
import getPartnerInfo from 'utils/getPartnerInfo';
import ChatItem from './ChatItem';

export default function ChatItems({ conversations, user }) {
	return (
		<ul>
			<li>
				{conversations.map((conversation) => (
					<ChatItem
						key={conversation._id}
						avatar={`https://ui-avatars.com/api/?background=random&name=${
							getPartnerInfo(conversation, user._id).name
						}}`}
						name={getPartnerInfo(conversation, user._id).name}
						lastMessage={conversation.lastMessage}
						lastTime={moment(conversation.updatedAt).fromNow()}
						conversationId={conversation._id}
					/>
				))}
			</li>
		</ul>
	);
}
