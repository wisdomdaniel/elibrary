import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import BookCard from '../../components/BookCard';
import BookDetailModal from '../../components/BookDetailModal';
import {
  ChevronRight,
  BookCopy,
  Building2,
  GraduationCap,
  DownloadCloud,
  ArrowRight,
  Monitor,
  Settings2,
  Pi,
  Atom,
  Briefcase,
  LayoutGrid,
  ChevronLeft,
  Bookmark,
  Clock as ClockIcon
} from 'lucide-react';
import { MOCK_STATS, MOCK_DEPARTMENTS, MOCK_ANNOUNCEMENTS, MOCK_POPULAR } from '../../services/mockData';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { searchQuery, results } = useSearch();
  const scrollRef = useRef(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getIcon = (iconName) => {
    const size = 24;
    switch(iconName) {
      case 'book': return <BookCopy size={size} className="text-indigo-500" />;
      case 'building': return <Building2 size={size} className="text-emerald-500" />;
      case 'graduation': return <GraduationCap size={size} className="text-amber-500" />;
      case 'download': return <DownloadCloud size={size} className="text-sky-500" />;
      case 'monitor': return <Monitor size={size} className="text-rose-500" />;
      case 'settings': return <Settings2 size={size} className="text-slate-500" />;
      case 'pi': return <Pi size={size} className="text-violet-500" />;
      case 'atom': return <Atom size={size} className="text-cyan-500" />;
      case 'briefcase': return <Briefcase size={size} className="text-orange-500" />;
      case 'layout-grid': return <LayoutGrid size={size} className="text-fuchsia-500" />;
      default: return <BookCopy size={size} className="text-primary" />;
    }
  };

  if (searchQuery.trim()) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Search Results for "{searchQuery}"</h2>
          <p className="text-slate-400 font-bold">{results.length} materials found</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {results.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
        <BookDetailModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-10 pb-10">
        {/* Welcome Section */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-slate-900">Welcome back, {user?.name?.split(' ')[0]}</h1>
          </div>
          <p className="text-slate-400 font-bold text-sm">Access your learning materials anytime, anywhere.</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_STATS.map((stat, i) => {
            const bgColors = {
              book: 'bg-indigo-50 dark:bg-indigo-900/20',
              building: 'bg-emerald-50 dark:bg-emerald-900/20',
              graduation: 'bg-amber-50 dark:bg-amber-900/20',
              download: 'bg-sky-50 dark:bg-sky-900/20'
            };
            return (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300">
              <div className={`h-14 w-14 rounded-2xl ${bgColors[stat.icon] || 'bg-slate-50 dark:bg-slate-800'} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm`}>
                {getIcon(stat.icon)}
              </div>
              <div className="min-w-0">
                <p className="text-xl font-black text-slate-900 leading-tight truncate">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{stat.label}</p>
              </div>
            </div>
          );})}
        </section>

        {/* Recent Materials Carousel */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900">Recent Materials</h2>
            <div className="flex items-center gap-6">
              <button onClick={() => scroll('left')} className="text-primary font-black text-xs hover:underline">View all</button>
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                  <ChevronLeft className="h-5 w-5 text-slate-400" />
                </button>
                <button onClick={() => scroll('right')} className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth"
          >
            {results.map((book) => (
              <div key={book.id} className="snap-start">
                <BookCard
                  book={book}
                  onClick={() => handleBookClick(book)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Browse by Department */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Browse by Department</h2>
            <button className="text-primary font-black text-xs hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {MOCK_DEPARTMENTS.map((dept, i) => {
              const bgColors = {
                monitor: 'bg-rose-50 dark:bg-rose-900/20',
                settings: 'bg-slate-50 dark:bg-slate-800',
                pi: 'bg-violet-50 dark:bg-violet-900/20',
                atom: 'bg-cyan-50 dark:bg-cyan-900/20',
                briefcase: 'bg-orange-50 dark:bg-orange-900/20',
                'layout-grid': 'bg-fuchsia-50 dark:bg-fuchsia-900/20'
              };
              return (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-4 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300 group cursor-pointer">
                <div className={`h-16 w-16 rounded-2xl ${bgColors[dept.icon] || 'bg-slate-50 dark:bg-slate-800'} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                  {getIcon(dept.icon)}
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 mb-1 leading-tight">{dept.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {typeof dept.materials === 'number' ? `${dept.materials} Materials` : dept.materials}
                  </p>
                </div>
              </div>
            );})}
          </div>
        </section>
      </div>

      {/* Right Sidebar Info Panel */}
      <div className="w-80 space-y-8">
        {/* Announcements Card */}
        <section className="bg-white rounded-2xl p-8 border border-slate-50 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900">Announcements</h3>
            <button className="text-[11px] font-black text-primary">View all</button>
          </div>
          <div className="space-y-8">
            {MOCK_ANNOUNCEMENTS.map((ann) => (
              <div key={ann.id} className="flex gap-4 relative">
                <div className="h-2.5 w-2.5 rounded-full mt-1.5 flex-shrink-0 bg-primary/20 ring-4 ring-white relative z-10 shadow-[0_0_8px_rgba(51,65,85,0.2)]"></div>
                <div className="space-y-1">
                  <h4 className="text-[13px] font-black text-slate-900 leading-tight">{ann.title}</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">{ann.description}</p>
                  <p className="text-[10px] font-black text-slate-300 uppercase">{ann.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section className="bg-white rounded-2xl p-8 border border-slate-50">
          <h3 className="font-black text-slate-900 mb-8">Quick Access</h3>
          <div className="space-y-4">
            {[
              { name: 'My Courses', icon: GraduationCap },
              { name: 'Bookmarks', icon: Bookmark },
              { name: 'Download History', icon: DownloadCloud },
              { name: 'Reading History', icon: ClockIcon },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-50 text-primary flex items-center justify-center">
                    <item.icon size={18} />
                  </div>
                  <span className="text-xs font-black text-slate-600 group-hover:text-slate-900">{item.name}</span>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Materials */}
        <section className="bg-white rounded-2xl p-8 border border-slate-50">
          <h3 className="font-black text-slate-900 mb-8">Popular Materials</h3>
          <div className="space-y-6">
            {MOCK_POPULAR.map((pop, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-pointer">
                <span className="text-xl font-black text-slate-200 group-hover:text-primary transition-colors">{i + 1}</span>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-black text-slate-900 leading-tight truncate group-hover:text-primary transition-colors">{pop.title}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-bold text-slate-400">{pop.code}</span>
                    <span className="text-[10px] font-black text-slate-400">{pop.downloads} downloads</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StudentDashboard;
