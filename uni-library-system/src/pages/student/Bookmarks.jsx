import React, { useState } from 'react';
import {
  Bookmark,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Inbox
} from 'lucide-react';
import { MOCK_MATERIALS } from '../../services/mockData';
import BookDetailModal from '../../components/BookDetailModal';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(MOCK_MATERIALS.slice(0, 3)); // Mock bookmarked items
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveBookmark = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Remove from bookmarks?')) {
      setBookmarks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">My Bookmarks</h1>
          <p className="text-gray-500 font-bold mt-1">Quick access to your saved learning materials.</p>
        </div>
        <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center border border-indigo-100 shadow-sm">
          <Bookmark size={28} fill="currentColor" />
        </div>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookmarks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 group cursor-pointer flex flex-col h-full"
            >
              {/* Cover Image & Category */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {book.category}
                    </span>
                    <span className="px-4 py-2 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-indigo-200">
                        {book.code}
                    </span>
                </div>

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                        onClick={(e) => handleRemoveBookmark(e, book.id)}
                        className="h-12 w-12 rounded-2xl bg-white text-red-500 flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                        title="Remove Bookmark"
                    >
                        <Trash2 size={20} />
                    </button>
                    <button className="h-12 w-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                    </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Bookmark key={i} size={12} fill={i < Math.floor(book.rating) ? "currentColor" : "none"} className={i < Math.floor(book.rating) ? "" : "text-gray-200"} />
                    ))}
                  </div>
                  <span className="text-[11px] font-black text-gray-400">{book.rating} Rating</span>
                </div>

                <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors mb-2 truncate">
                  {book.title}
                </h3>
                <p className="text-sm font-bold text-gray-400 mb-6 truncate">by {book.author}</p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <BookOpen size={14} className="text-gray-400" />
                        </div>
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-tighter">Lecture Note</span>
                    </div>
                    <button className="text-primary font-black text-xs flex items-center gap-2 group/btn">
                        Read Now
                        <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border border-gray-50 py-32 text-center max-w-4xl mx-auto shadow-sm">
          <div className="h-28 w-28 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Inbox size={48} className="text-primary opacity-40" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">No saved materials yet</h2>
          <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed">
            Your bookmarks list is empty. Click the bookmark icon on any material to save it for quick access later.
          </p>
          <button
            onClick={() => window.location.href = '/student/library'}
            className="mt-10 px-10 py-4 bg-primary text-white rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95"
          >
            Explore Library
          </button>
        </div>
      )}

      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Bookmarks;
