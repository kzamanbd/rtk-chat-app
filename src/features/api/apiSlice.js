import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
	process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_API_URL
		: 'https://express-app-bext.up.railway.app/api';

export const apiSlice = createApi({
	reducerPath: 'chatApi',
	baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
	endpoints: (builder) => ({}),
	tagTypes: []
});
