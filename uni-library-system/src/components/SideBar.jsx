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
  LayoutDashboard,
  Trophy,
  ArrowRight
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
    <div className="flex h-screen w-72 flex-col bg-white border-r border-gray-100/50 sticky top-0 flex-shrink-0">
      <div className="flex h-24 items-center px-10">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm shadow-indigo-100/50">
            <BookOpen className="text-primary h-6 w-6" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block leading-none mb-1">UniLibrary</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">E-Library System</span>
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
              className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 group ${
                isActive
                  ? 'bg-primary text-white shadow-xl shadow-primary/25'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-primary'
              }`}
            >
              <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-primary group-hover:scale-110'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-6 border-t border-slate-50 space-y-6">
        {user?.role === 'student' && (
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group cursor-pointer">
            <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Trophy size={20} className="text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-lg">Level 4</span>
              </div>
              <h4 className="text-sm font-black mb-1">Reading Challenge</h4>
              <p className="text-[11px] text-indigo-100 font-bold mb-4">Data Structures in C++</p>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black">
                  <span>65% Complete</span>
                  <span>12/18 Ch.</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                </div>
              </div>

              <button className="mt-5 w-full bg-white text-primary py-2.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                Continue Reading
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
