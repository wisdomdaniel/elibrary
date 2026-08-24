import React, { useState, useMemo } from 'react';
import {
  Search,
  List,
  ChevronDown,
  LayoutGrid,
  BookOpen,
  Calendar,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { UNIBEN_FACULTIES } from '../../services/facultyData';
import BookCard from '../../components/BookCard';
import BookDetailModal from '../../components/BookDetailModal';

const Library = () => {
  const { user } = useAuth();
  const { searchQuery, results } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const studentFaculty = user?.faculty || 'Faculty of Computing';
  const categories = ['All', 'Lecture Note', 'Past Question', 'Textbook', 'Reference'];
  const departments = ['All', ...(UNIBEN_FACULTIES[studentFaculty] || [])];

  const filteredMaterials = useMemo(() => {
    // 1. Filter strictly by student's registered Faculty
    let result = results.filter(m => !m.faculty || m.faculty === studentFaculty);

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m =>
        (m.title && m.title.toLowerCase().includes(query)) ||
        (m.author && m.author.toLowerCase().includes(query)) ||
        (m.code && m.code.toLowerCase().includes(query))
      );
    }

    // 3. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(m => m.category === selectedCategory);
    }

    // 4. Department Filter (Only departments in this Faculty)
    if (selectedDept !== 'All') {
      result = result.filter(m => m.department === selectedDept);
    }

    // 5. Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedDept, sortBy, results, studentFaculty]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{studentFaculty} Library</h1>
          <p className="text-gray-500 font-bold mt-1">Explore academic materials curated for your faculty and departments.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-gray-100 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>

          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-100 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
              <option value="alphabetical">A - Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-primary transition-colors" size={16} />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar Filters - Desktop */}
        <div className="w-full lg:w-64 space-y-8 flex-shrink-0">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm space-y-6">
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen size={14} />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={14} />
                Departments
              </h3>
              <div className="space-y-2">
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedDept === dept
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Materials Grid/List */}
        <div className="flex-1">
          {filteredMaterials.length > 0 ? (
            <div className={viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              : "space-y-4"
            }>
              {filteredMaterials.map((book) => (
                viewMode === 'grid' ? (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => handleBookClick(book)}
                  />
                ) : (
                  <div
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className="bg-white p-4 rounded-2xl border border-gray-50 flex items-center gap-6 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="h-24 w-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={book.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-primary text-[10px] font-black uppercase">{book.category}</span>
                        <span className="text-[10px] font-bold text-gray-400">{book.code}</span>
                      </div>
                      <h4 className="text-base font-black text-gray-900 truncate group-hover:text-primary transition-colors">{book.title}</h4>
                      <p className="text-xs font-bold text-gray-500 mt-1">by {book.author}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 pr-4">
                        <div className="flex items-center gap-1 text-yellow-500 font-black text-sm">
                            <Star size={16} fill="currentColor" />
                            {book.rating}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">{book.time}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-gray-50 py-24 text-center">
              <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-gray-200" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No materials found</h3>
              <p className="text-gray-400 font-bold max-w-xs mx-auto">We couldn't find any materials matching your current filters. Try adjusting your search or categories.</p>
              <button
                onClick={() => {
                    setSelectedCategory('All');
                    setSelectedDept('All');
                }}
                className="mt-8 px-8 py-3 bg-primary text-white rounded-2xl font-black text-sm hover:shadow-lg shadow-primary/25 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Library;
