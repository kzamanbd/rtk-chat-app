import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'chatApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api', credentials: 'include' }),
	endpoints: (builder) => ({}),
	tagTypes: []
});
