import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import Library from './pages/student/Library';
import Bookmarks from './pages/student/Bookmarks';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageMaterials from './pages/admin/ManageMaterials';
import UploadMaterial from './pages/admin/UploadMaterial';
import Settings from './pages/common/Settings';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected App Routes */}
        <Route element={<MainLayout />}>
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/library"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Library />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/bookmarks"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Bookmarks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/settings"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageMaterials />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/upload"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UploadMaterial />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback for specific subroutes to dashboard for now */}
          <Route path="/student/*" element={<Navigate to="/student" replace />} />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Auth Redirects */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
