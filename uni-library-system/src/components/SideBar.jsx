import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Bookmark,
  Settings,
  LogOut,
  Library,
  LayoutDashboard,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SideBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = user?.role === 'admin'
    ? [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Manage Books', icon: BookOpen, path: '/admin/manage' },
        { name: 'Upload', icon: Upload, path: '/admin/upload' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
      ]
    : [
        { name: 'Home', icon: Home, path: '/student' },
        { name: 'My Library', icon: Library, path: '/student/library' },
        { name: 'Saved', icon: Bookmark, path: '/student/saved' },
        { name: 'Settings', icon: Settings, path: '/student/settings' },
      ];

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-gray-300">
      <div className="flex h-20 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">UniLibrary</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
