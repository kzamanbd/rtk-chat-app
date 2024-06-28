import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const loggedIn = localStorage.getItem('loggedIn');
    // get the current route path and set localStorage to redirect to it after login
    const { pathname } = useLocation();
    if (!loggedIn) {
        localStorage.setItem('redirect', pathname);
    }
    return loggedIn ? children : <Navigate to="/login" />;
}
