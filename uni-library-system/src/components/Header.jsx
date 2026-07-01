import { Search, Bell, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

const Header = () => {
  const { user } = useAuth();
  const { searchQuery, handleSearch } = useSearch();

  return (
    <header className="h-20 border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex h-full items-center justify-between px-10">
        <div className="relative w-[500px]">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for materials, courses, departments..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-xl bg-gray-50/50 py-3 pl-12 pr-4 text-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-primary/10 focus:bg-white focus:shadow-sm transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-8">
          <button className="relative p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:text-primary transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-4 w-4 rounded-full bg-primary border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
              3
            </span>
          </button>

          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center text-primary font-bold border border-blue-100">
              <User size={24} className="opacity-80" />
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[11px] font-semibold text-gray-400 capitalize tracking-wider">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
