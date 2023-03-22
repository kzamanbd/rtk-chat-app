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
const socketUrl =
	process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_SOCKET_URL
		: 'https://express-app-bext.up.railway.app';

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query({
			query: (userId) => `/chat/get-conversations/${userId}`,
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				const socket = io(socketUrl, socketOptions);
				try {
					await cacheDataLoaded;
					socket.on(`conversation.${arg}`, (conversation) => {
						console.log('conversation', conversation);

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
			query: (id) => `/chat/find-conversation/${id}`
		}),

		createConversation: builder.mutation({
			query: (data) => ({
				url: '/chat/create-conversation',
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
					console.log(error);
				}
			}
		}),

		sendMessage: builder.mutation({
			query: (data) => ({
				url: '/chat/send-message',
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
								_id: arg.senderId
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
			query: (conversationId) => `/chat/get-messages/${conversationId}`,
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
				const { currentUser } = getState().auth;
				const socket = io(socketUrl, socketOptions);

				try {
					await cacheDataLoaded;
					socket.on(`newMessage.${arg}`, (message) => {
						console.log('newMessage', message);
						if (message.conversationId === arg && message.userInfo._id !== currentUser._id) {
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
