import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	messages: []
};

export const authSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {}
});

export default authSlice.reducer;
