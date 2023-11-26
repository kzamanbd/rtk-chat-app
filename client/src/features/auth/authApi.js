import { apiSlice } from '@/features/api/apiSlice';
import { updateCurrentUser } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem('loggedIn', true);
                    dispatch(updateCurrentUser(result.data?.user));
                } catch (error) {
                    console.error(error);
                }
            }
        }),

        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem('loggedIn', true);
                    dispatch(updateCurrentUser(result.data?.user));
                } catch (error) {
                    console.error(error);
                }
            }
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('loggedIn');
                    dispatch(updateCurrentUser(null));
                } catch (error) {
                    console.error(error);
                }
            }
        }),

        getCurrentUser: builder.query({
            query: () => '/refresh-token',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(updateCurrentUser(result.data?.user));
                } catch (error) {
                    console.error(error);
                }
            }
        })
    })
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery, useLogoutMutation } = authApi;
