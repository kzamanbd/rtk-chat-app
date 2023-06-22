import MessageHead from './MessageHead';

export default function NewMessageBody({ chatHead }) {
	return (
		<>
			<MessageHead chatHead={chatHead} />
			<div className="chat-detail"></div>
		</>
	);
}
