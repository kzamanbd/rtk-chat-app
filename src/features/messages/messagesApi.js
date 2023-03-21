import { apiSlice } from 'features/api/apiSlice';
import io from 'socket.io-client';

const socketOptions = {
	reconnectionDelay: 1000,
	reconnection: true,
	reconnectionAttemps: 10,
	transports: ['websocket'],
	agent: false,
	upgrade: false,
	rejectUnauthorized: false
};
const socketUrl = 'http://localhost:8000';

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query({
			query: (userId) => `/chat/get-conversations/${userId}`,
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
				const socket = io(socketUrl, socketOptions);
				try {
					await cacheDataLoaded;
					socket.on('conversation', (conversation) => {
						const { currentUser } = getState().auth || {};
						if ([conversation.fromUser._id, conversation.toUser._id].includes(currentUser._id)) {
							updateCachedData((draft) => {
								const drafted = draft.conversations.find((c) => c._id === conversation._id);
								if (drafted) {
									drafted.lastMessage = conversation.lastMessage;
									drafted.updatedAt = conversation.updatedAt;
								} else {
									draft.conversations.unshift(conversation);
								}
							});
						}
					});
				} catch (error) {
					console.error(error);
				}
				await cacheEntryRemoved;
				socket.close();
			}
		}),

		findConversation: builder.query({
			query: (id) => `/chat/find-conversation/${id}`
		}),

		createConversation: builder.mutation({
			query: (data) => ({
				url: '/chat/create-conversation',
				method: 'POST',
				body: data
			})
		}),

		sendMessage: builder.mutation({
			query: (data) => ({
				url: '/chat/send-message',
				method: 'POST',
				body: data
			})
		}),

		getMessages: builder.query({
			query: (conversationId) => `/chat/get-messages/${conversationId}`,
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				const socket = io(socketUrl, socketOptions);

				try {
					await cacheDataLoaded;
					socket.on(`newMessage.${arg}`, (message) => {
						console.log('newMessage', message);
						if (message.conversationId === arg) {
							updateCachedData((draft) => {
								draft.messages.push(message);
							});
						}
					});
				} catch (error) {
					console.error(error);
				}
				await cacheEntryRemoved;
				socket.close();
			}
		})
	})
});

export const {
	useGetConversationsQuery,
	useGetMessagesQuery,
	useSendMessageMutation,
	useFindConversationQuery,
	useCreateConversationMutation
} = messagesApi;
