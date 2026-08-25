import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  Download,
  Inbox
} from 'lucide-react';
import { MOCK_MATERIALS } from '../../services/mockData';
import BookDetailModal from '../../components/BookDetailModal';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(MOCK_MATERIALS.slice(0, 4));
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

  const handleDownload = (e, book) => {
    e.stopPropagation();
    let fileName = book.fileName || `${book.code || 'Material'}_${book.title.replace(/\s+/g, '_')}.docx`;
    let mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (fileName.endsWith('.pdf')) {
      mimeType = 'application/pdf';
    } else if (fileName.endsWith('.docx')) {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (fileName.endsWith('.pptx')) {
      mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }

    const content = book.fileContent || `[UNIBEN E-LIBRARY MATERIAL]\nTitle: ${book.title}\nCourse Code: ${book.code}\nAuthor: ${book.author}`;
    const blob = new Blob([content], { type: mimeType });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 pb-12 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Bookmarks</h1>
          <p className="text-xs font-bold text-slate-400 mt-0.5">Quick access to your saved learning materials.</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-slate-100 text-[#2B3649] flex items-center justify-center border border-slate-200/60 shadow-xs">
          <Bookmark size={20} fill="currentColor" />
        </div>
      </div>

      {bookmarks.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 sm:px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">MATERIAL INFO</th>
                  <th className="px-6 sm:px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">CATEGORY</th>
                  <th className="px-6 sm:px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">CODE</th>
                  <th className="px-6 sm:px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">STATS</th>
                  <th className="px-6 sm:px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookmarks.map((book) => (
                  <tr
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 sm:px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs flex-shrink-0">
                          {book.image ? (
                            <img src={book.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
                          ) : (
                            <div className="h-full w-full bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white text-center p-1">
                              {book.code || 'DOC'}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#2B3649] transition-colors leading-snug">{book.title}</p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">by {book.author || 'UNIBEN Faculty'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-wider inline-block">
                        {book.category || 'LECTURE NOTE'}
                      </span>
                    </td>
                    <td className="px-6 sm:px-8 py-4">
                      <span className="text-xs font-bold text-slate-700">{book.code || 'CSC301'}</span>
                    </td>
                    <td className="px-6 sm:px-8 py-4">
                      <div className="flex items-center gap-3 text-[11px] font-bold">
                        <span className="flex items-center gap-0.5 text-slate-400">
                          <ArrowUpRight size={12} className="text-slate-300" />
                          1.2k
                        </span>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleDownload(e, book)}
                          title="Download file"
                          className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          onClick={() => handleBookClick(book)}
                          title="Read Now"
                          className="p-2 text-slate-400 hover:text-[#2B3649] hover:bg-slate-100 rounded-lg transition-all"
                        >
                          <ExternalLink size={15} />
                        </button>
                        <button
                          onClick={(e) => handleRemoveBookmark(e, book.id)}
                          title="Remove Bookmark"
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 py-20 text-center max-w-2xl mx-auto shadow-xs">
          <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Inbox size={28} className="text-slate-300" />
          </div>
          <h2 className="text-lg font-black text-slate-900 mb-1">No saved materials yet</h2>
          <p className="text-slate-400 font-bold text-xs max-w-sm mx-auto leading-relaxed mb-6">
            Your bookmarks list is empty. Click the bookmark icon on any material to save it.
          </p>
          <button
            onClick={() => window.location.href = '/student/library'}
            className="px-6 py-2.5 bg-[#2B3649] text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all active:scale-95"
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
