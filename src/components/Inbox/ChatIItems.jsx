import getPartnerInfo from '@/utils/getPartnerInfo';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import ChatItem from './ChatItem';

export default function ChatItems({ conversations, user }) {
	const { conversationId } = useParams();
	return (
		<ul>
			<li>
				{conversations.map((conversation) => (
					<ChatItem
						key={conversation._id}
						avatar={`https://ui-avatars.com/api/?background=random&name=${
							getPartnerInfo(conversation, user?._id).name
						}}`}
						active={conversation._id === conversationId}
						name={getPartnerInfo(conversation, user?._id).name}
						lastMessage={conversation.lastMessage}
						lastTime={moment(conversation.updatedAt).fromNow()}
						conversationId={conversation._id}
					/>
				))}
			</li>
		</ul>
	);
}
