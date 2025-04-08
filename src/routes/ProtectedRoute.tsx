import { Navigate, Outlet } from 'react-router';

import { useAuthenticationContext } from '@/contexts/AuthenticationContext/AuthenticationContext.tsx';
function ProtectedRoute() {
    const { token } = useAuthenticationContext();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
