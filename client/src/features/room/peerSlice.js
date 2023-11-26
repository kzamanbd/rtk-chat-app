import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    peers: {}
};

export const peerSlice = createSlice({
    name: 'peers',
    initialState,
    reducers: {
        addPeer: (state, action) => {
            state.peers = {
                ...state.peers,
                [action.payload.peerId]: {
                    stream: action.payload.stream
                }
            };
        },
        removePeer: (state, action) => {
            // eslint-disable-next-line no-unused-vars
            const { [action.payload.peerId]: deleted, ...peers } = state;
            state = peers;
        }
    }
});

export const { addPeer, removePeer } = peerSlice.actions;
export default peerSlice.reducer;
