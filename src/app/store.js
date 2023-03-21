import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'features/api/apiSlice';
import authSliceReducer from 'features/auth/authSlice';
import messagesSliceReducer from 'features/messages/messagesSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSliceReducer,
		messages: messagesSliceReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production'
});
