import { Navigate, Outlet } from 'react-router';

import { useAuthenticationContext } from '@/contexts/AuthenticationContext/AuthenticationContext.tsx';
function ProtectedRoute(){


    const {token} = useAuthenticationContext();
    console.log(token)
    // return (   
    //     <>
    //         {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    //     </>
    // )
    if (!token) {
        return <Navigate to="/login" replace />;
      }
    
      return (
          <Outlet/>
    )
        
}

export default ProtectedRoute
