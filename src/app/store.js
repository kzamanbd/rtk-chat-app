import { apiSlice } from '@/features/api/apiSlice';
import authSliceReducer from '@/features/auth/authSlice';
import messagesSliceReducer from '@/features/messages/messagesSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSliceReducer,
		messages: messagesSliceReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: import.meta.env.NODE_ENV !== 'production'
});
