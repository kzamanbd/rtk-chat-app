import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
	const auth = useSelector((state) => state.auth);
	const loggedIn = localStorage.getItem('loggedIn');
	return loggedIn && auth.currentUser ? <Navigate to="/" /> : children;
}
