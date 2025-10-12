import NoMessage from '@/components/NoMessage';
import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { updateCurrentUser } from '@/features/auth/authSlice';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Room from '@/pages/Room';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <PrivateRoute>
            <Outlet />
        </PrivateRoute>
    );
};

const GuestLayout = ({ children }) => {
    return <PublicRoute>{children}</PublicRoute>;
};

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
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    const router = createBrowserRouter([
        {
            path: '/login',
            element: (
                <GuestLayout>
                    <Login />
                </GuestLayout>
            )
        },
        {
            path: '/',
            element: <AuthLayout />,
            errorElement: <NoMessage />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: 't/:conversationId',
                    element: <Dashboard />
                },
                {
                    path: 'room/:roomId/:targetUserId',
                    element: <Room />
                }
            ]
        },
        {
            path: '*',
            element: <NoMessage />
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;
