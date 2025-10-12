import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
    const loggedIn = localStorage.getItem('loggedIn');
    return loggedIn ? <Navigate to="/" /> : children;
}
