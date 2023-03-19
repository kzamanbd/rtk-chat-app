import { apiSlice } from 'features/api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body
			})
		}),
		login: builder.mutation({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body
			})
		})
	})
});

export const { useRegisterMutation, useLoginMutation } = authApi;
