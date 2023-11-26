import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

export const { updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
