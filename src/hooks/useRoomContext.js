import { RoomContext } from '@/contexts/RoomContext';
import { useContext } from 'react';

export const useRoomContext = () => {
	const context = useContext(RoomContext);
	return context;
};
