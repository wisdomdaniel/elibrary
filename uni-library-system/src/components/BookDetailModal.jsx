import React from 'react';
import { X, Star, Clock, BookOpen, Share2, Bookmark, Download } from 'lucide-react';

const BookDetailModal = ({ book, isOpen, onClose }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-slate-900 transition-colors border border-slate-100 shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left: Image & Quick Stats */}
        <div className="w-full md:w-2/5 bg-slate-50 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50"></div>

          <div className="relative w-64 h-80 rounded-2xl shadow-2xl overflow-hidden mb-8 transform hover:scale-105 transition-transform duration-500">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</span>
              <div className="flex items-center gap-1 text-slate-900 font-black">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {book.rating}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Downloads</span>
              <span className="text-slate-900 font-black">1.2k</span>
            </div>
          </div>
        </div>

        {/* Right: Content & Actions */}
        <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-[10px] font-black text-primary mb-4 uppercase tracking-tighter">
              {book.category}
            </span>
            <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{book.title}</h2>
            <p className="text-lg font-bold text-slate-400 mb-8">by {book.author}</p>

            <div className="flex gap-8 mb-8">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <Clock size={18} className="text-slate-300" />
                {book.time}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <BookOpen size={18} className="text-slate-300" />
                {book.code}
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">About this material</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                {book.description || "This comprehensive learning material covers essential concepts and practical applications. It is designed to help students master the core principles of the subject through structured lessons and real-world examples."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex-1 bg-primary text-white py-4 px-8 rounded-2xl font-black shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-95">
              <BookOpen size={20} />
              Start Reading
            </button>
            <button className="h-14 w-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all active:scale-95">
              <Bookmark size={20} />
            </button>
            <button className="h-14 w-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all active:scale-95">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
