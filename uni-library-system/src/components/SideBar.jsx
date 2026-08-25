import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Library,
  Bookmark,
  UploadCloud,
  Settings,
  LogOut,
  BookOpen,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SideBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const studentNavItems = [
    { name: 'Dashboard', icon: Home, path: '/student' },
    { name: 'Library', icon: Library, path: '/student/library' },
    { name: 'Bookmarks', icon: Bookmark, path: '/student/bookmarks' },
    { name: 'Settings', icon: Settings, path: '/student/settings' },
  ];

  const adminNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Manage Materials', icon: BookOpen, path: '/admin/manage' },
    { name: 'Upload', icon: UploadCloud, path: '/admin/upload' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-slate-100 sticky top-0 flex-shrink-0 transition-colors">
      <div className="flex h-20 items-center px-8 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-xs">
            <BookOpen className="text-[#2B3649] h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 block leading-tight">UniLibrary</span>
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">E-Library System</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-6 py-8 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-200 group ${
                isActive
                  ? 'bg-[#2B3649] text-white shadow-md shadow-slate-900/10'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-6 border-t border-slate-50">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 text-slate-400 group-hover:text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
