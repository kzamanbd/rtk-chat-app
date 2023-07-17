import { createSlice } from '@reduxjs/toolkit';
// initial state
const initialState = {
	searchText: ''
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		userSearchChanged(state, action) {
			state.searchText = action.payload;
		}
	}
});

export default filterSlice.reducer;
export const { userSearchChanged } = filterSlice.actions;
