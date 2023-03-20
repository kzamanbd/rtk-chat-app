import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
	const auth = useSelector((state) => state.auth);
	const loggedIn = localStorage.getItem('loggedIn');
	return loggedIn && auth.currentUser ? children : <Navigate to="/login" />;
}
