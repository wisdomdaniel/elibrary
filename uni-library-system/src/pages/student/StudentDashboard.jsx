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
  Clock as ClockIcon,
  Trophy
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
    switch(iconName) {
      case 'book': return <BookCopy size={24} />;
      case 'building': return <Building2 size={24} />;
      case 'graduation': return <GraduationCap size={24} />;
      case 'download': return <DownloadCloud size={24} />;
      case 'monitor': return <Monitor size={24} />;
      case 'settings': return <Settings2 size={24} />;
      case 'pi': return <Pi size={24} />;
      case 'atom': return <Atom size={24} />;
      case 'briefcase': return <Briefcase size={24} />;
      case 'layout-grid': return <LayoutGrid size={24} />;
      default: return <BookCopy size={24} />;
    }
  };

  const getColorClass = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'orange': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  if (searchQuery.trim()) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900">Search Results for "{searchQuery}"</h2>
          <p className="text-gray-400 font-bold">{results.length} materials found</p>
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
            <h1 className="text-2xl font-black text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          </div>
          <p className="text-gray-400 font-bold text-sm">Access your learning materials anytime, anywhere.</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_STATS.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 flex items-center gap-4 group hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${getColorClass(stat.color)}`}>
                {getIcon(stat.icon)}
              </div>
              <div className="min-w-0">
                <p className="text-xl font-black text-gray-900 leading-tight truncate">{stat.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Materials Carousel */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-gray-900">Recent Materials</h2>
            <div className="flex items-center gap-6">
              <button onClick={() => scroll('left')} className="text-primary font-black text-xs hover:underline">View all</button>
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="h-10 w-10 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                  <ChevronLeft className="h-5 w-5 text-gray-400" />
                </button>
                <button onClick={() => scroll('right')} className="h-10 w-10 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
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
            <h2 className="text-xl font-black text-gray-900">Browse by Department</h2>
            <button className="text-primary font-black text-xs hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {MOCK_DEPARTMENTS.map((dept, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 flex flex-col items-center text-center gap-4 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 group cursor-pointer">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(dept.icon)}
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-gray-900 mb-1 leading-tight">{dept.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {typeof dept.materials === 'number' ? `${dept.materials} Materials` : dept.materials}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar Info Panel */}
      <div className="w-80 space-y-8">
        {/* Reading Challenge Card */}
        <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group cursor-pointer">
          <div className="absolute -right-4 -top-4 h-32 w-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-xl">Level 4</span>
            </div>
            <h4 className="text-lg font-black mb-1">Reading Challenge</h4>
            <p className="text-sm text-indigo-100 font-bold mb-6">Data Structures in C++</p>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-black">
                <span>65% Complete</span>
                <span>12/18 Ch.</span>
              </div>
              <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
              </div>
            </div>

            <button className="mt-8 w-full bg-white text-primary py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg active:scale-95">
              Continue Reading
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Announcements Card */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-gray-900">Announcements</h3>
            <button className="text-[11px] font-black text-primary">View all</button>
          </div>
          <div className="space-y-8">
            {MOCK_ANNOUNCEMENTS.map((ann) => (
              <div key={ann.id} className="flex gap-4 relative">
                <div className={`h-2.5 w-2.5 rounded-full mt-1.5 flex-shrink-0 ring-4 ring-white relative z-10 ${
                  ann.color === 'blue' ? 'bg-blue-500 shadow-[0_0_8px_#3B82F6]' :
                  ann.color === 'green' ? 'bg-green-500 shadow-[0_0_8px_#10B981]' :
                  'bg-orange-500 shadow-[0_0_8px_#F59E0B]'
                }`}></div>
                <div className="space-y-1">
                  <h4 className="text-[13px] font-black text-gray-900 leading-tight">{ann.title}</h4>
                  <p className="text-[11px] font-bold text-gray-400 leading-relaxed">{ann.description}</p>
                  <p className="text-[10px] font-black text-gray-300 uppercase">{ann.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-gray-50">
          <h3 className="font-black text-gray-900 mb-8">Quick Access</h3>
          <div className="space-y-4">
            {[
              { name: 'My Courses', icon: GraduationCap },
              { name: 'Bookmarks', icon: Bookmark },
              { name: 'Download History', icon: DownloadCloud },
              { name: 'Reading History', icon: ClockIcon },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                    <item.icon size={18} />
                  </div>
                  <span className="text-xs font-black text-gray-600 group-hover:text-gray-900">{item.name}</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Materials */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-gray-50">
          <h3 className="font-black text-gray-900 mb-8">Popular Materials</h3>
          <div className="space-y-6">
            {MOCK_POPULAR.map((pop, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-pointer">
                <span className="text-xl font-black text-gray-200 group-hover:text-primary transition-colors">{i + 1}</span>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-black text-gray-900 leading-tight truncate group-hover:text-primary transition-colors">{pop.title}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-bold text-gray-400">{pop.code}</span>
                    <span className="text-[10px] font-black text-gray-400">{pop.downloads} downloads</span>
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
