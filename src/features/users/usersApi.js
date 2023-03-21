import { apiSlice } from 'features/api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => '/users'
		})
	})
});

export const { useGetUsersQuery } = usersApi;
