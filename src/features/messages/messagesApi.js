import { apiSlice } from 'features/api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query({
			query: (userId) => `/chat/get-conversations/${userId}`
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
			query: (conversationId) => `/chat/get-messages/${conversationId}`
		})
	})
});

export const { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation } = messagesApi;
