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
    <header className="h-24 bg-white dark:bg-slate-950 sticky top-0 z-30 px-10 flex items-center justify-between border-b border-slate-100 dark:border-slate-900 transition-colors">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search for materials, courses, departments..."
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-3 pl-14 pr-4 text-sm font-bold text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-md focus:shadow-primary/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-400 hover:text-primary transition-all border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 h-4 w-4 bg-primary text-[10px] font-black text-white flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">3</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-4 pl-6 border-l border-slate-100 dark:border-slate-800 group"
          >
            <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 border border-slate-100 dark:border-slate-800 group-hover:border-primary/30 group-hover:text-primary transition-all shadow-sm">
              <User size={22} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{user?.name}</p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Student Portal</p>
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
