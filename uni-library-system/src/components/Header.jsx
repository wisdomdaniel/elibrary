import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-10 flex items-center justify-between border-b border-slate-50 dark:border-slate-800 transition-colors">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search for materials, courses, departments..."
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 dark:text-white outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button className="relative p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all group">
          <Bell size={22} />
          <span className="absolute top-2 right-2 h-4 w-4 bg-primary text-[10px] font-black text-white flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800 group-hover:scale-110 transition-transform">3</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-4 pl-4 border-l border-slate-100 dark:border-slate-800 group"
          >
            <div className="h-11 w-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
              <User size={22} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{user?.name}</p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{user?.role}</p>
            </div>
            <ChevronDown size={16} className={`text-slate-300 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-700 py-2 animate-in fade-in zoom-in-95 duration-200">
              <Link
                to={user?.role === 'admin' ? '/admin/settings' : '/student/settings'}
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-all"
              >
                <SettingsIcon size={18} />
                Settings
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
