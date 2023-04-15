import { ADD_PEER, REMOVE_PEER } from './roomActions';

const initialState = {
	peers: {}
};

export default function roomReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PEER:
			return {
				...state,
				peers: {
					...state.peers,
					[action.payload.peerId]: action.payload.stream
				}
			};
		case REMOVE_PEER:
			const { [action.payload.peerId]: deleted, ...peers } = state.peers;
			return {
				...state,
				peers
			};
		default:
			return state;
	}
}
