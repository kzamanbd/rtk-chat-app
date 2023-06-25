import { apiSlice } from '@/features/api/apiSlice';
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
const socketUrl = import.meta.env.VITE_APP_SOCKET_URL;

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => '/chat/users'
		}),
		getConversations: builder.query({
			query: (userId) => `/chat/conversations/${userId}`,
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				const socket = io(socketUrl, socketOptions);
				try {
					await cacheDataLoaded;
					socket.on(`conversation.${arg}`, (conversation) => {
						updateCachedData((draft) => {
							const drafted = draft.conversations.find((c) => c._id === conversation._id);
							if (drafted) {
								drafted.lastMessage = conversation.lastMessage;
								drafted.updatedAt = conversation.updatedAt;
							} else {
								draft.conversations.unshift(conversation);
							}
						});
					});
				} catch (error) {
					console.error(error);
				}
				await cacheEntryRemoved;
				socket.close();
			}
		}),

		findConversation: builder.query({
			query: (id) => `/chat/conversation/${id}`
		}),

		createConversation: builder.mutation({
			query: (data) => ({
				url: '/chat/conversation',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				// pessimistic update to the UI
				try {
					const result = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData('getConversations', arg.senderId, (draft) => {
							draft.conversations.unshift(result.data.conversation);
						})
					);
				} catch (error) {
					console.error(error);
				}
			}
		}),

		sendMessage: builder.mutation({
			query: (data) => ({
				url: '/chat/message',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				// optimistic update to the UI
				const patchResult1 = dispatch(
					apiSlice.util.updateQueryData('getConversations', arg.senderId, (draft) => {
						const conversation = draft.conversations.find((c) => c._id === arg.conversationId.toString());

						if (conversation) {
							conversation.lastMessage = arg.message;
							conversation.updatedAt = new Date().toISOString();
						}
					})
				);

				// optimistic update to the UI messages
				const patchResult2 = dispatch(
					apiSlice.util.updateQueryData('getMessages', arg.conversationId, (draft) => {
						draft.messages.push({
							_id: Date.now(),
							userInfo: {
								_id: arg.senderId,
								name: arg.senderName
							},
							message: arg.message,
							createdAt: new Date().toISOString()
						});
					})
				);

				try {
					await queryFulfilled;
				} catch (error) {
					// undo the optimistic update
					patchResult1.undo();
					patchResult2.undo();
				}
			}
		}),

		getMessages: builder.query({
			query: (conversationId) => `/chat/messages/${conversationId}`,
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
				const { currentUser } = getState().auth;
				const socket = io(socketUrl, socketOptions);

				try {
					await cacheDataLoaded;
					socket.on(`newMessage.${arg}`, (message) => {
						if (message.conversationId === arg && message.userInfo._id !== currentUser?._id) {
							console.log('newMessage', message);
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
	useCreateConversationMutation,
	useGetUsersQuery
} = messagesApi;
