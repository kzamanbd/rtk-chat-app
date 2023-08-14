import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchText: '',
	selectedNewUser: {},
	showSidebarList: false
};

export const messageSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		toggleSidebarList(state) {
			state.showSidebarList = !state.showSidebarList;
		},
		updateSearchText(state, action) {
			state.searchText = action.payload;
		},
		setSelectedNewUser(state, action) {
			state.selectedNewUser = action.payload;
		}
	}
});

export const { updateSearchText, toggleSidebarList, setSelectedNewUser } = messageSlice.actions;

export default messageSlice.reducer;
