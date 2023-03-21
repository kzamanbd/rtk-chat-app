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
			})
		}),

		getMessages: builder.query({
			query: (conversationId) => `/chat/get-messages/${conversationId}`
		})
	})
});

export const { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation } = messagesApi;
