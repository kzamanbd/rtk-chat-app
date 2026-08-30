import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    peers: {}
};

export const peerSlice = createSlice({
    name: 'peers',
    initialState,
    reducers: {
        addPeer: (state, action) => {
            state.peers[action.payload.peerId] = {
                stream: action.payload.stream
            };
        },
        removePeer: (state, action) => {
            // payload is the peerId emitted by the `user-disconnected` event
            delete state.peers[action.payload];
        },
        clearPeers: (state) => {
            state.peers = {};
        }
    }
});

export const { addPeer, removePeer, clearPeers } = peerSlice.actions;
export default peerSlice.reducer;
