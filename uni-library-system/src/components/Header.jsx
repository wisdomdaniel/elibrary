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
    <header className="h-20 bg-transparent sticky top-0 z-30 px-10 flex items-center justify-between transition-colors pt-4">
      <div className="flex-1 max-w-lg">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2B3649] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search for materials, courses, departments..."
            className="w-full bg-slate-100/70 border border-slate-100 focus:border-slate-200 focus:bg-white rounded-full py-2.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none transition-all placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full bg-slate-100/70 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-all">
          <Bell size={18} />
          <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#2B3649] text-[9px] font-black text-white flex items-center justify-center rounded-full border-2 border-white">3</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 group"
          >
            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-all border border-slate-200/60">
              <User size={18} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-tight">{user?.name || 'Admin User'}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{user?.role || 'ADMIN'}</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 py-2 animate-in fade-in zoom-in-95 duration-150 z-50">
              <Link
                to={user?.role === 'admin' ? '/admin/settings' : '/student/settings'}
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                <SettingsIcon size={16} />
                Settings
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={16} />
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
