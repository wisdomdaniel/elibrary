import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import UploadModal from '../../components/UploadModal';

const ManageMaterials = () => {
  const { searchQuery, results } = useSearch();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Lecture Note', 'Past Question', ...new Set(results.map(m => m.category).filter(c => c && c !== 'Lecture Note' && c !== 'Past Question'))];

  const filteredMaterials = useMemo(() => {
    let filtered = results;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        (book.title && book.title.toLowerCase().includes(query)) ||
        (book.author && book.author.toLowerCase().includes(query)) ||
        (book.code && book.code.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, results, selectedCategory]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      const uploaded = JSON.parse(localStorage.getItem('uni_materials') || '[]');
      const updated = uploaded.filter(m => m.id !== id);
      localStorage.setItem('uni_materials', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="space-y-6 pb-12 pt-2">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Materials</h1>
          <p className="text-xs font-bold text-slate-400 mt-0.5">Total {results.length} library assets available.</p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-[#2B3649] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add New Material
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-100 flex flex-wrap items-center gap-3 shadow-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
          <Filter size={14} className="text-slate-400" />
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">FILTER BY:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2B3649] text-white shadow-xs'
                  : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">MATERIAL INFO</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">CATEGORY</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">CODE</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">STATS</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMaterials.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs flex-shrink-0">
                        {book.image ? (
                          <img src={book.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
                        ) : (
                          <div className="h-full w-full bg-indigo-900 flex items-center justify-center text-[8px] font-bold text-white text-center p-1">
                            {book.code || 'DOC'}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#2B3649] transition-colors leading-snug">{book.title}</p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">by {book.author || 'Department'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-wider inline-block">
                      {book.category || 'LECTURE NOTE'}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold text-slate-700">{book.code || 'CSC301'}</span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3 text-[11px] font-bold">
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <ArrowUpRight size={12} className="text-slate-300" />
                        1.2k
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-extrabold">
                        ★ {book.rating || '4.8'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                        <ExternalLink size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMaterials.length === 0 && (
          <div className="py-16 text-center">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search size={24} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold text-xs">No materials found matching your criteria.</p>
          </div>
        )}
      </div>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
};

export default ManageMaterials;
