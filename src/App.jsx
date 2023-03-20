import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { useGetCurrentUserQuery } from 'features/auth/authApi';
import Inbox from 'pages/Inbox';
import Login from 'pages/Login';
import Register from 'pages/Register';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	const auth = useSelector((state) => state.auth);

	const { isLoading } = useGetCurrentUserQuery(undefined, {
		skip: !localStorage.getItem('loggedIn')
	});

	console.log('AuthContext state:', auth);

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
