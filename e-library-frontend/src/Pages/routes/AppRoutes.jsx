import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import StudentDashboard from "../student/StudentDashboard.jsx";
import AdminDashboard from "../admin/AdminDashboard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import ProtectedRoute from "../../components/ProtectedRoute.jsx";

function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    user ? (
                        user.role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/student" />
                    ) : (
                        <Login />
                    )
                }
            />
            <Route path="/register" element={<Register />} />

            {/* Student Protected Routes */}
            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Admin Protected Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Fallback for undefined routes */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;
