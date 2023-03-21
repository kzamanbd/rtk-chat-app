import { useSendMessageMutation } from 'features/messages/messagesApi';
import { useGetUsersQuery } from 'features/users/usersApi';
import { useState } from 'react';

export default function Modal({ open, control }) {
	const { data: { users = [] } = {}, isLoading } = useGetUsersQuery();
	const [sendMessage, { isLoading: isCreating }] = useSendMessageMutation();

	// local state
	const [toUser, setToUser] = useState('');
	const [message, setMessage] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			userId: toUser,
			message
		};

		sendMessage(data)
			.unwrap()
			.then((response) => {
				console.log(response);
				setToUser('');
				setMessage('');
				control();
			});
	};

	return (
		open && (
			<>
				<div onClick={control} className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"></div>
				<div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Send message</h2>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
						<input type="hidden" name="remember" value="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="to" className="sr-only">
									To
								</label>
								{!isLoading && users?.length > 0 && (
									<select
										onChange={(e) => setToUser(e.target.value)}
										value={toUser}
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm">
										<option value="" hidden>
											Select a user
										</option>
										{users?.map((user) => (
											<option key={user._id} value={user._id}>
												{user.name}
											</option>
										))}
									</select>
								)}
							</div>
							<div>
								<label htmlFor="message" className="sr-only">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									type="message"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
									placeholder="Message"
									onChange={(e) => setMessage(e.target.value)}
									value={message}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isCreating}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
								Send Message
							</button>
						</div>

						{/* <Error message="There was an error" /> */}
					</form>
				</div>
			</>
		)
	);
}
