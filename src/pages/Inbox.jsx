import ChatBody from '@/components/Inbox/ChatBody/ChatBody';
import Navigation from '@/components/Inbox/Navigation';
import Sidebar from '@/components/Inbox/Sidebar';
import { useParams } from 'react-router-dom';

export default function Inbox() {
	const { conversationId } = useParams();
	return (
		<div>
			<Navigation />
			<div className="max-w-7xl mx-auto -mt-1">
				<div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
					<Sidebar />
					{conversationId && <ChatBody conversationId={conversationId} />}
				</div>
			</div>
		</div>
	);
}
