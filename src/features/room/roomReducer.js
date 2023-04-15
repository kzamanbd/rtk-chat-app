import { ADD_PEER, REMOVE_PEER } from './roomActions';

export default function roomReducer(state, action) {
	switch (action.type) {
		case ADD_PEER:
			return {
				...state,
				[action.payload.peerId]: {
					stream: action.payload.stream
				}
			};
		case REMOVE_PEER:
			// eslint-disable-next-line no-case-declarations, no-unused-vars
			const { [action.payload.peerId]: deleted, ...peers } = state;
			return peers;
		default:
			return state;
	}
}
