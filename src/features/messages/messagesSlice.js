import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	messages: []
};

export const authSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		updateMessages: (state, action) => {
			state.messages = [...state.messages, action.payload];
		}
	}
});

export default authSlice.reducer;
export const { updateMessages } = authSlice.actions;
