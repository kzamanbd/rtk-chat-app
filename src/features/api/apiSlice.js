import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'chatApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL, credentials: 'include' }),
	endpoints: (builder) => ({}),
	tagTypes: []
});
