// import { Routes, Route, Navigate, Outlet, useLocation } from "react-router";
import { Routes, Route, useLocation } from 'react-router';
import HomeRoute from '@/routes/HomeRoute.tsx';
import LoginRoute from '@/routes/LoginRoute.tsx';
import PublicLayout from '@/layouts/PublicLayout/PublicLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';

// // Auth Check (Mock Authentication)
// const isAuthenticated = false;
// const ProtectedRoute = () =>
//   isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

const AppRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route element={<PublicLayout />}>
                <Route path="/*" element={<div />} />
                {LoginRoute}
            </Route>
            <Route element={<ProtectedRoute />}>{HomeRoute}</Route>
        </Routes>
    );
};

export default AppRoutes;
