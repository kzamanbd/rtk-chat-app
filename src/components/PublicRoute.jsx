import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
	const { currentUser } = useSelector((state) => state.auth);
	return currentUser ? <Navigate to="/" /> : children;
}
