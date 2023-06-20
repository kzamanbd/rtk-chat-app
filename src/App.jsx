import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { updateCurrentUser } from '@/features/auth/authSlice';
import Dashboard from '@/pages/Dashboard';
import Inbox from '@/pages/Inbox';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Room from '@/pages/Room';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

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
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	} else {
		return (
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path="/inbox/:conversationId"
						element={
							<PrivateRoute>
								<Inbox />
							</PrivateRoute>
						}
					/>
					<Route
						path="/room/:roomId/:userId"
						element={
							<PrivateRoute>
								<Room />
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
