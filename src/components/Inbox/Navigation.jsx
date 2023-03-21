import logoImage from 'assets/lws-logo-dark.svg';
import { useLogoutMutation } from 'features/auth/authApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navigation() {
	const [logout] = useLogoutMutation();
	const { currentUser } = useSelector((state) => state.auth);

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	};
	return (
		<nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between h-16 items-center">
					<Link to="/">
						<img className="h-10" src={logoImage} alt="Learn with Sumit" />
					</Link>
					<ul className="flex space-x-3">
						<li className="text-white">{currentUser.name}</li>
						<li className="text-white">
							<a href="/" onClick={handleLogout}>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
