import { Routes, Route, Navigate, Outlet, useLocation } from "react-router";
import HomeRoute from "@/routes/HomeRoute";

// Auth Check (Mock Authentication)
const isAuthenticated = false;
const ProtectedRoute = () =>
  isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/*" element={<div />} />
      {HomeRoute}
    </Routes>
  );
};

export default AppRoutes;
