import { RoomContext } from '@/contexts/RoomContext';
import { useContext } from 'react';

export const useRoom = () => {
	const context = useContext(RoomContext);
	return context;
};
