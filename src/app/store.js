import { apiSlice } from '@/features/api/apiSlice';
import authSliceReducer from '@/features/auth/authSlice';
import filterSliceReducer from '@/features/filter/filterSlice';
import messagesSliceReducer from '@/features/messages/messagesSlice';
import peerSlice from '@/features/room/peerSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSliceReducer,
		messages: messagesSliceReducer,
		filter: filterSliceReducer,
		peers: peerSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
	devTools: import.meta.env.NODE_ENV !== 'production'
});
