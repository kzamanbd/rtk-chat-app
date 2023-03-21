import { useSendMessageMutation } from 'features/messages/messagesApi';
import { useEffect, useRef, useState } from 'react';

export default function Options({ conversationId, currentUserId }) {
	const [sendMessage, { isLoading }] = useSendMessageMutation();
	const [message, setMessage] = useState('');

	// focus on the input field when the component is mounted
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, [inputRef, conversationId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = { conversationId, senderId: currentUserId, message };
		try {
			await sendMessage(data).unwrap();
			setMessage('');
			inputRef.current.focus();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center justify-between w-full p-3 border-t border-gray-300">
			<input
				ref={inputRef}
				type="text"
				placeholder="Message"
				className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
				name="message"
				required
				value={message}
				disabled={isLoading}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button type="submit" disabled={isLoading}>
				<svg
					className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
				</svg>
			</button>
		</form>
	);
}
