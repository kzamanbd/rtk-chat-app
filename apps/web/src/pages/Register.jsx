import ApplicationLogo from '@/components/shared/ApplicationLogo';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import OtherLoginOption from '@/components/shared/OtherLoginOption';
import { useRegisterMutation } from '@/features/auth/authApi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    // local state
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError('');

        if (password !== confirmPassword) {
            setRegisterError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setRegisterError('Password must be at least 6 characters');
            return;
        }

        try {
            await register({
                name: fullName,
                email: username,
                password,
                withLogin: true
            }).unwrap();
            navigate('/');
        } catch (error) {
            console.error(error);
            setRegisterError(error?.data?.message || 'Registration failed, please try again');
        }
    };

    return (
        <div className="bg-light-gray dark:bg-dark-secondary dark:text-gray-300">
            <div className="flex min-h-screen items-center justify-center p-6">
                <div className="login-bg">
                    <div className="rounded-md bg-white p-8 shadow-md">
                        <div className="my-4 flex items-center justify-center space-x-2">
                            <span className="h-12 w-12" alt="logo">
                                <ApplicationLogo />
                            </span>
                            <span className="dark--text text-3xl font-semibold">RTK Chat</span>
                        </div>
                        <p className="text-center text-xs text-gray-600">
                            Create your account and start the adventure
                        </p>

                        <OtherLoginOption />

                        <form className="mt-4" onSubmit={handleSubmit}>
                            {registerError && (
                                <div className="mb-3 rounded-md bg-red-50 p-2 text-center text-sm text-red-600">
                                    {registerError}
                                </div>
                            )}
                            <label className="block">
                                <span className="form-label">Full Name</span>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    placeholder="Full Name"
                                    value={fullName}
                                    required
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </label>

                            <label className="mt-3 block">
                                <span className="form-label">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email Address"
                                    value={username}
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>

                            <label className="mt-3 block">
                                <span className="form-label">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="********"
                                    autoComplete="new-password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>

                            <label className="mt-3 block">
                                <span className="form-label">Confirm Password</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="********"
                                    value={confirmPassword}
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </label>

                            <div className="mt-6">
                                <button type="submit" className="btn btn-primary flex w-full" disabled={isLoading}>
                                    <span className="mr-2">Sign up</span>
                                    <LoadingSpinner isLoading={isLoading} />
                                </button>
                            </div>
                        </form>
                        <p className="dark--text mt-4">
                            Already have an account?
                            <Link to="/login" className="text-primary ml-2">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
