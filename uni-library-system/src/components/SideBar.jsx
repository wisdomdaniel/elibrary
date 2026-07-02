import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Library,
  Bookmark,
  History,
  GraduationCap,
  LayoutGrid,
  UploadCloud,
  Megaphone,
  User,
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
    { name: 'History', icon: History, path: '/student/history' },
    { name: 'My Courses', icon: GraduationCap, path: '/student/courses' },
    { name: 'Categories', icon: LayoutGrid, path: '/student/categories' },
    { name: 'Recent Uploads', icon: UploadCloud, path: '/student/recent' },
    { name: 'Announcements', icon: Megaphone, path: '/student/announcements' },
    { name: 'Profile', icon: User, path: '/student/profile' },
    { name: 'Settings', icon: Settings, path: '/student/settings' },
  ];

  const adminNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Manage Materials', icon: BookOpen, path: '/admin/manage' },
    { name: 'Upload', icon: UploadCloud, path: '/admin/upload' },
    { name: 'Announcements', icon: Megaphone, path: '/admin/announcements' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <div className="flex h-screen w-72 flex-col bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 sticky top-0 flex-shrink-0 transition-colors">
      <div className="flex h-24 items-center px-10">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm">
            <BookOpen className="text-primary h-6 w-6" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white block leading-none mb-1">UniLibrary</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">E-Library System</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-6 py-6 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-bold transition-all duration-300 group ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary'
              }`}
            >
              <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'text-white' : 'text-slate-300 dark:text-slate-600 group-hover:text-primary group-hover:scale-110'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-6 border-t border-slate-50 dark:border-slate-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-bold text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
