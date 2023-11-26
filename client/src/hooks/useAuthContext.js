import { useSelector } from 'react-redux';

export const useAuthContext = () => {
    const auth = useSelector((state) => state.auth);

    return {
        currentUser: auth.currentUser
    };
};
