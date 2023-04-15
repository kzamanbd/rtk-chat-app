import { useRoomContext } from '@/hooks/useRoomContext';

export default function ChatHead({ avatar, name, userId }) {
	const { ws } = useRoomContext();

	const handleVideoCall = () => {
		ws.emit('create-room', userId);
	};

	return (
		<div className="flex justify-between p-3 border-b border-gray-300">
			<div className="relative flex items-center ">
				<img className="object-cover w-10 h-10 rounded-full" src={avatar} alt={name} />
				<span className="block ml-2 font-bold text-gray-600">{name}</span>
			</div>
			<div className="flex items-center">
				<button className="flex items-center justify-center w-10 h-10 p-2 text-gray-500 rounded-full hover:bg-gray-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16">
						<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
						<path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
					</svg>
				</button>
				<button
					onClick={handleVideoCall}
					className="flex items-center justify-center w-10 h-10 p-2 text-gray-500 rounded-full hover:bg-gray-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16">
						<path
							fillRule="evenodd"
							d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
