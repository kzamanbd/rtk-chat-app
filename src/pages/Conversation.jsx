import Blank from 'components/Inbox/ChatBody/Blank';
import Navigation from 'components/Inbox/Navigation';
import Sidebar from 'components/Inbox/Sidebar';

export default function Conversation() {
	return (
		<div>
			<Navigation />
			<div className="max-w-7xl mx-auto -mt-1">
				<div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
					<Sidebar />
					<div className="w-full lg:col-span-2 lg:block">
						<div className="w-full grid conversation-row-grid">
							<Blank />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
