import { SocketContext } from '@/contexts/SocketContext';
import { useContext } from 'react';

export const useSocket = () => {
	const context = useContext(SocketContext);
	return context;
};
