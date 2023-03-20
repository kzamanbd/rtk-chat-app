import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { useGetCurrentUserQuery } from 'features/auth/authApi';
import { updateCurrentUser } from 'features/auth/authSlice';
import Inbox from 'pages/Inbox';
import Login from 'pages/Login';
import Register from 'pages/Register';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	const dispatch = useDispatch();
	const { isLoading, error } = useGetCurrentUserQuery(undefined, {
		skip: !localStorage.getItem('loggedIn')
	});

	useEffect(() => {
		if (error?.status === 401) {
			localStorage.removeItem('loggedIn');
			dispatch(updateCurrentUser(null));
		}
	}, [error, dispatch]);

	if (isLoading) {
		return <div className="flex justify-center items-center">Loading...</div>;
	} else {
		return (
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Inbox />
							</PrivateRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<PublicRoute>
								<Register />
							</PublicRoute>
						}
					/>
				</Routes>
			</Router>
		);
	}
}

export default App;
